const Message = require('./models/Message');
const User = require('./models/User');

const users = {};

async function getAllMessages(username) {
    const messages = await Message.find(
        {
            $or: [
                {from: username},
                {from: 'admin', to: username},
            ]
        })
        .sort('time')
        .exec();

    return messages;
}

getAllMessages('admin');

async function addMessage(message) {
    const newMessage = new Message(message);
    await newMessage.save();
}

async function getAllUsers() {
    const allUsers = await User.find({}).exec();
    return allUsers
        .filter(user => user.username !== 'admin')
        .map(user => ({
            isOnline: users[user.username] && users[user.username].connected,
            username: user.username,
            name: user.username,
        }));
}

function handelSocket(io) {
    io.on('connection', (socket) => {
        socket.on('hello', ({jwt}) => {
            socket.username = jwt.username;
            users[jwt.username] = socket;

            if (jwt.username === 'admin') {
                io.emit('statusChange', {username: 'admin', isOnline: true})
            } else {
                if (users['admin'])
                    users['admin'].emit('statusChange', {username: jwt.username, isOnline: true})
            }
        });

        socket.on('message', ({target, text}) => {
            const message = {
                from: socket.username,
                to: target,
                text,
            };

            if (socket.username === 'admin' || (socket.username !== 'admin' && target === 'admin')) {
                if(users[target]) {
                    users[target].emit('message', message);
                }
            }

            addMessage(message);
        });

        socket.on('typing', ({target}) => {
            if (socket.username === 'admin' || (socket.username !== 'admin' && target === 'admin')) {
                if(users[target]) {
                    users[target].emit('typing', {timeout: 3000, from: socket.username});
                }
            }
        });

        socket.on('getAllMessages', async ({target}) => {
            if (socket.username === 'admin') {
                socket.emit('allMessages', await getAllMessages(target));
            } else {
                if (target === 'admin') {
                    socket.emit('allMessages', await getAllMessages(socket.username));
                }
            }
        });

        socket.on('getAllUsers', async () => {
            if (socket.username === 'admin') {
                socket.emit('setUsers', {users: await getAllUsers()});
            } else {
                socket.emit('setUsers', {
                    users: [{
                        isOnline: !!users['admin'],
                        username: 'admin',
                        name: 'ادمین',
                    }],
                });
            }
        });

        socket.on('disconnect', (s) => {
            console.log('disconnect', socket.username);

            delete users[socket.username];
            if (socket.username === 'admin') {
                io.emit('statusChange', {username: 'admin', isOnline: false})
            } else {
                if (users['admin'])
                    users['admin'].emit('statusChange', {username: socket.username, isOnline: false})
            }
        });
    });
}

module.exports = handelSocket;