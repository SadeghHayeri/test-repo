import React from 'react'
import './style.css'
import persianDate from 'persian-date';

class Message extends React.Component {
    render() {
        const time = typeof this.props.time === 'string' ? new Date(this.props.time).getTime() : this.props.time;
        return(
            <div className={"message " + (this.props.sender === 1 ? "one" : "two")}>
                <div className={"message-body " + (this.props.sender === 1 ? "one-body" : "two-body")}>
                    {this.props.text}
                </div>
                <div className={"message-date"}>{new persianDate(time).format("h:mm a")}</div>
            </div>
        );
    }
}

export default Message