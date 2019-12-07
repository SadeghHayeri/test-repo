import React from 'react'
import './style.css'
import * as Scroll from 'react-scroll';
import Message from "./message";

let scroll = Scroll.animateScroll;

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            messages: [
                {
                    id: 1,
                    sender: 0,
                    text: 'سلام',
                    time: Date.now(),
                }, {
                    id: 2,
                    sender: 1,
                    text: 'سلام',
                    time: Date.now(),
                }, {
                    id: 3,
                    sender: 1,
                    text: 'چه کمکی از دستم بر میاد؟',
                    time: Date.now(),
                }, {
                    id: 4,
                    sender: 0,
                    text: 'هیچی',
                    time: Date.now(),
                }, {
                    id: 5,
                    sender: 1,
                    text: 'باشه پس',
                    time: Date.now(),
                }, {
                    id: 6,
                    sender: 0,
                    text: 'خخخخخخ',
                    time: Date.now(),
                }, {
                    id: 7,
                    sender: 0,
                    text: 'سلام',
                    time: Date.now(),
                }, {
                    id: 8,
                    sender: 1,
                    text: 'سلام',
                    time: Date.now(),
                }, {
                    id: 9,
                    sender: 1,
                    text: 'چه کمکی از دستم بر میاد؟',
                    time: Date.now(),
                }, {
                    id: 10,
                    sender: 0,
                    text: 'هیچی',
                    time: Date.now(),
                }, {
                    id: 11,
                    sender: 1,
                    text: 'باشه پس',
                    time: Date.now(),
                }, {
                    id: 12,
                    sender: 0,
                    text: 'خخخخخخ',
                    time: Date.now(),
                },
            ]
        };

        this.handleChange = this.handleChange.bind(this);
        document.addEventListener("keydown", this._handleKeyDown);
        scroll.scrollToBottom();
    }

    _handleKeyDown = (event) => {
        if(event.keyCode === 13) {
            this.sendMessage();
        }
    };

    async sendMessage() {
        if (!this.state.input) return;
        const messages = [...this.state.messages, {
            id: Date.now(),
            sender: 1,
            text: this.state.input,
            time: Date.now(),
        }];

        this.setState({messages, input: ''});
        scroll.scrollToBottom({duration: 100});
    }

    handleChange(event) {
        this.setState({input: event.target.value});
    }

    render() {
        const messages = this.state.messages.map(message => (
            <Message key={message.id} text={message.text} sender={message.sender} time={message.time}/>
        ));

        return(
            <div className={"chat-box"}>
                <div className={"message-box"}>
                    {messages}
                </div>
                <div className={"input"}>
                    <div onClick={() => {this.sendMessage()}} className={"send-button"}>ارسال</div>
                    <input type={"text"} placeholder={'متن پیام را بنویسید...'} value={this.state.input} onChange={this.handleChange}/>
                </div>
            </div>
        );
    }
}

export default Chat