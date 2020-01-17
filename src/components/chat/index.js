import React from 'react'
import './style.css'
import * as Scroll from 'react-scroll';
import Message from "./message";
import io from 'socket.io-client';
import Promise from 'bluebird';
import ChatHeader from "./chat-header";

let scroll = Scroll.animateScroll;

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.typingTimeout = null;
        this.state = {
            input: '',
            target: null,
            typing: false,
            messages: [],
            users: [],
            connected: false,
            jwt: 'unknown',
        };

        this.handleChange = this.handleChange.bind(this);
        document.addEventListener("keydown", this._handleKeyDown);
        scroll.scrollToBottom();
    }

    componentWillUnmount() {
        this.io.disconnect();
    }

    setTyping(timeout) {
        if (!this.state.typing) {
            this.setState({typing: true});
            if (this.typingTimeout) {
                clearTimeout(this.typingTimeout);
                this.typingTimeout = null;
            }

            this.typingTimeout = setTimeout(() => {
                this.setState({typing: false});
                scroll.scrollToBottom({duration: 100});
            }, timeout);

            scroll.scrollToBottom({duration: 100});
        }
    }

    async submitSocketConnection() {
        if (this.state.jwt !== 'unknown' && !this.state.connected) {
            this.io = io.connect('http://localhost:5000');

            this.io.on('connect', () => {
                this.setState({connected: true});
            });

            this.io.on('disconnect', async () => {
                this.setState({connected: false, target: this.state.jwt === 'admin' ? '' : 'admin'});
            });

            this.io.emit('hello', {jwt: this.state.jwt});

            this.io.on('message', (message) => {
                this.receiveMessage(message);
            });

            this.io.on('typing', ({timeout, from}) => {
                if (this.state.target && from === this.state.target.username) {
                    this.setTyping(timeout);
                }
            });

            this.io.on('statusChange', ({username, isOnline}) => {
                const newUsers = this.state.users;
                for (const user of newUsers) {
                    if (user.username === username) {
                        user.isOnline = isOnline;
                    }
                }
                this.setState({users: newUsers});
            });

            this.io.on('allMessages', (messages) => {
                this.setState({messages});
                scroll.scrollToBottom({duration: 100});
            });

            this.io.emit('getAllUsers');

            this.io.on('setUsers', ({users}) => {
                this.setState({users});
            });

            if (this.state.jwt && this.state.jwt.username !== 'admin') {
                this.onUserChange({username: 'admin', name: 'ادمین'});
            }
        } else {
            await Promise.delay(500);
            this.submitSocketConnection();
        }
    }

    async componentDidMount() {
        const jwt = await sessionStorage.getItem('jwt');
        this.setState({jwt: JSON.parse(jwt)});
        this.submitSocketConnection();
    }

    _handleKeyDown = (event) => {
        if(event.keyCode === 13) {
            this.sendMessage();
        }
    };

    async receiveMessage(message) {
        if (this.state.target && message.from === this.state.target.username) {
            const messages = [...this.state.messages, message];
            this.setState({messages});

            this.setState({typing: false});
            if (this.typingTimeout) {
                clearTimeout(this.typingTimeout);
                this.typingTimeout = null;
            }

            scroll.scrollToBottom({duration: 100});
        }
    }

    async sendMessage() {
        if (!this.state.input || !this.state.target) return;
        const messages = [...this.state.messages, {
            id: Date.now(),
            from: this.state.jwt.username,
            text: this.state.input,
            time: Date.now(),
        }];

        this.io.emit('message', {target: this.state.target.username, text: this.state.input});
        this.setState({messages, input: ''});
        scroll.scrollToBottom({duration: 100});
    }

    handleChange(event) {
        this.setState({input: event.target.value});
        if (this.state.target)
            this.io.emit('typing', {target: this.state.target.username});
    }

    onUserChange(user) {
        this.setState({target: user});
        this.io.emit('getAllMessages', {target: user.username})
    }

    render() {
        const messages = this.state.messages.map(message => (
            <Message key={message.id} text={message.text} sender={message.from === this.state.jwt.username ? 1 : 0} time={message.time}/>
        ));

        const isLogin = this.state.jwt !== null;
        const isConnected = this.state.connected;

        if (!isLogin) {
            window.location.href = '/login'
        }

        return(
            <div>
                <ChatHeader connected={isConnected} target={this.state.target} users={this.state.users} onUserChange={(user) => this.onUserChange(user)} />
                <div className={"chat-box"}>
                    <div className={"message-box"}>
                        {messages}
                        {this.state.typing && <div className={"typing"}>...is typing</div>}
                    </div>
                    <div className={"input"}>
                        <div onClick={() => {
                            this.sendMessage()
                        }} className={"send-button"}>ارسال
                        </div>
                        <input type={"text"} placeholder={'متن پیام را بنویسید...'} value={this.state.input}
                               onChange={this.handleChange}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat