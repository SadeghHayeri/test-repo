const users = {};
const messages = {};

function getAllMessages(username) {
    return messages[username] || [];
}

function _addMessage(username, message) {
    if (!messages[username]) {
        messages[username] = [];
    }

    messages[username].push(message);
}

function addMessage(message) {
    if (message.from === 'admin') {
        _addMessage(message.to, message)
    } else {
        _addMessage(message.from, message)
    }
}

function getAllUsers() {
    return Object.keys(users)
        .filter(username => username !== 'admin')
        .map(username => ({
            isOnline: true,
            id: username,
            name: username})
        );
}

function handelSocket(io) {
    io.on('connection', (socket) => {
        console.log('new-connection');

        socket.on('hello', ({jwt}) => {
            console.log('hello', jwt.username);
            users[jwt.username] = socket;

            if (jwt.username === 'admin') {
                socket.emit('statusChange', {username: 'admin', status: 'ONLINE'})
            } else {
                if (users['admin'])
                    users['admin'].emit('statusChange', {username: jwt.username, status: 'ONLINE'})
            }
        });

        socket.on('message', ({jwt, target, text}) => {
            const message = {
                id: Date.now(),
                from: jwt.username,
                to: target,
                text,
                time: Date.now(),
            };

            if (jwt.username === 'admin' || (jwt.username !== 'admin' && target === 'admin')) {
                if(users[target]) {
                    users[target].emit('message', message);
                }
            }

            addMessage(message);
        });

        socket.on('typing', ({jwt, target}) => {
            if (jwt.username === 'admin' || (jwt.username !== 'admin' && target === 'admin')) {
                if(users[target]) {
                    users[target].emit('typing', {timeout: 3000});
                }
            }
        });

        socket.on('getAllMessages', ({jwt, target}) => {
            if (jwt.username === 'admin') {
                socket.emit('allMessages', getAllMessages(target));
            } else {
                if (target === 'admin') {
                    socket.emit('allMessages', getAllMessages(jwt.username));
                }
            }
        });

        socket.on('getAllUsers', ({jwt}) => {
            if (jwt.username === 'admin') {
                socket.emit('setUsers', {users: getAllUsers()});
            } else {
                socket.emit('setUsers', {
                    users: [{
                        isOnline: !!users['admin'],
                        id: 'admin',
                        name: 'admin',
                    }],
                });
            }
        });
    });

    io.sockets.on('disconnect', (socket) => {
        for (const username of Object.keys(users)) {
            if (users[username].id === socket.id) {
                console.log('bye', username);
                if (username === 'admin') {
                    socket.emit('statusChange', {username: 'admin', status: 'OFFLINE'})
                } else {
                    users['admin'].emit('statusChange', {username, status: 'OFFLINE'})
                }
                delete users[username];
            }
        }
    });

}

module.exports = handelSocket;