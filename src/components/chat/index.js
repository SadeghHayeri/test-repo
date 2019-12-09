import React from 'react'
import './style.css'
import * as Scroll from 'react-scroll';
import Message from "./message";
import Users from "./users";
import io from 'socket.io-client';

let scroll = Scroll.animateScroll;

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.typingTimeout = null;
        this.state = {
            input: '',
            target: 'admin',
            isTyping: false,
            messages: [],
            users: [],
        };

        this.handleChange = this.handleChange.bind(this);
        document.addEventListener("keydown", this._handleKeyDown);
        scroll.scrollToBottom();
    }

    componentWillUnmount() {
        this.io.disconnect();
    }

    setTyping(timeout) {
        this.setState({typing: true});
        if(this.typingTimeout) {
            clearTimeout(this.typingTimeout);
            this.typingTimeout = null;
        }

        this.typingTimeout = setTimeout(() => {
            this.setState({typing: false});
            scroll.scrollToBottom({duration: 100});
        }, timeout);

        scroll.scrollToBottom({duration: 100});
    }

    componentDidMount() {
        this.io = io.connect('http://localhost:5000');

        this.io.emit('hello', {jwt: this.props.jwt});
        this.io.on('message', (message) => {
            this.receiveMessage(message);
        });

        this.io.on('typing', ({timeout}) => {
            this.setTyping(timeout);
        });

        this.io.on('changeStatus', ({username, status}) => {
            console.log({username, status});
            const newUsers = this.state.users;
            for (const user of newUsers) {
                if (user.username === username) {
                    user.isOnline = status;
                }
            }
            this.setState({users: newUsers});
        });

        this.io.on('allMessages', (messages) => {
            console.log(messages);
            this.setState({messages});
            scroll.scrollToBottom({duration: 100});
        });

        this.io.emit('getAllUsers', {jwt: this.props.jwt});

        this.io.on('setUsers', ({users}) => {
            this.setState({users});
        });
    }

    changeStatus(username, status) {
        //TODO
    }

    _handleKeyDown = (event) => {
        if(event.keyCode === 13) {
            this.sendMessage();
        }
    };

    async receiveMessage(message) {
        const messages = [...this.state.messages, message];
        this.setState({messages});

        this.setState({typing: false});
        if(this.typingTimeout) {
            clearTimeout(this.typingTimeout);
            this.typingTimeout = null;
        }

        scroll.scrollToBottom({duration: 100});
    }

    async sendMessage() {
        if (!this.state.input) return;
        const messages = [...this.state.messages, {
            id: Date.now(),
            from: this.props.jwt.username,
            text: this.state.input,
            time: Date.now(),
        }];

        this.io.emit('message', {jwt: this.props.jwt, target: this.state.target, text: this.state.input});
        this.setState({messages, input: ''});
        scroll.scrollToBottom({duration: 100});
    }

    handleChange(event) {
        this.setState({input: event.target.value});
        this.io.emit('typing', {jwt: this.props.jwt, target: this.state.target});
    }

    onUserChange(user) {
        this.setState({target: user.name});
        this.io.emit('getAllMessages', {jwt: this.props.jwt, target: user.name})
    }

    render() {
        const messages = this.state.messages.map(message => (
            <Message key={message.id} text={message.text} sender={message.from === this.props.jwt.username ? 1 : 0} time={message.time}/>
        ));

        return(
            <div className={"chat-box"}>
                <div className={"message-box"}>
                    {messages}
                    {this.state.typing && <div className={"typing"}>...is typing</div>}
                </div>
                <Users users={this.state.users} onChange={(user) => {this.onUserChange(user)}}/>
                <div className={"input"}>
                    <div onClick={() => {this.sendMessage()}} className={"send-button"}>ارسال</div>
                    <input type={"text"} placeholder={'متن پیام را بنویسید...'} value={this.state.input} onChange={this.handleChange}/>
                </div>
            </div>
        );
    }
}

export default Chat