import React from 'react'
import './style.css'
import * as Scroll from 'react-scroll';
import Message from "./message";
import Users from "./users";
import io from 'socket.io-client';
import Header from "../header";
import Promise from 'bluebird';

let scroll = Scroll.animateScroll;

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.typingTimeout = null;
        this.state = {
            input: '',
            target: '',
            isTyping: false,
            messages: [],
            users: [],
            connected: false,
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
        if (this.props.jwt !== 'unknown' && !this.state.connected) {
            this.io = io.connect('http://localhost:5000');

            this.io.on('connect', () => {
                this.setState({connected: true});
            });

            this.io.on('disconnect', async () => {
                this.setState({connected: false, target: this.props.jwt === 'admin' ? '' : 'admin'});
            });

            this.io.emit('hello', {jwt: this.props.jwt});

            this.io.on('message', (message) => {
                this.receiveMessage(message);
            });

            this.io.on('typing', ({timeout, from}) => {
                if (from === this.state.target) {
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

            if (this.props.jwt.username !== 'admin') {
                this.onUserChange({name: 'admin'});
            }
        } else {
            await Promise.delay(500);
            this.submitSocketConnection();
        }
    }

    async componentDidMount() {
        this.submitSocketConnection();
    }

    _handleKeyDown = (event) => {
        if(event.keyCode === 13) {
            this.sendMessage();
        }
    };

    async receiveMessage(message) {
        if (message.from === this.state.target) {
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
            from: this.props.jwt.username,
            text: this.state.input,
            time: Date.now(),
        }];

        this.io.emit('message', {target: this.state.target, text: this.state.input});
        this.setState({messages, input: ''});
        scroll.scrollToBottom({duration: 100});
    }

    handleChange(event) {
        this.setState({input: event.target.value});
        if (this.state.target)
            this.io.emit('typing', {target: this.state.target});
    }

    onUserChange(user) {
        this.setState({target: user.name});
        this.io.emit('getAllMessages', {target: user.name})
    }

    render() {
        const messages = this.state.messages.map(message => (
            <Message key={message.id} text={message.text} sender={message.from === this.props.jwt.username ? 1 : 0} time={message.time}/>
        ));

        const isLogin = this.props.jwt !== null;
        const isConnected = this.state.connected;

        return(
            <div>
                <Header/>
                {
                    (isLogin && isConnected) ?
                    (<div className={"chat-box"}>
                        <div className={"message-box"}>
                            {messages}
                            {this.state.typing && <div className={"typing"}>...is typing</div>}
                        </div>
                        <Users users={this.state.users} onChange={(user) => {
                            this.onUserChange(user)
                        }}/>
                        <div className={"input"}>
                            <div onClick={() => {
                                this.sendMessage()
                            }} className={"send-button"}>ارسال
                            </div>
                            <input type={"text"} placeholder={'متن پیام را بنویسید...'} value={this.state.input}
                                   onChange={this.handleChange}/>
                        </div>
                    </div>)
                    :
                    <div>{isLogin ? 'در حال اتصال به سرور' : 'لطفا وارد شوید'}</div>
                }
            </div>
        );
    }
}

export default Chat