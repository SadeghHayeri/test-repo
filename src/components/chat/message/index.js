import React from 'react'
import './style.css'
import persianDate from 'persian-date';

class Message extends React.Component {
    render() {
        return(
            <div className={"message " + (this.props.sender === 1 ? "one" : "two")}>
                <div className={"message-body " + (this.props.sender === 1 ? "one-body" : "two-body")}>
                    {this.props.text}
                </div>
                <div className={"message-date"}>{new persianDate(this.props.time).format("h:mm a")}</div>
            </div>
        );
    }
}

export default Message