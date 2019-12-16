import React from 'react'
import './style.css'
import persianDate from 'persian-date';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'admin',
        }
    }

    onClick(user) {
        this.setState({selected: user.name});
        if(this.props.onChange)
            this.props.onChange(user);
    }

    render() {
        const users = this.props.users.map(user => (
            <div onClick={() => this.onClick(user)} key={user.id} className={"user " + (this.state.selected === user.id ? "selected" : "")}>
                <div className={"user-name"}>{user.name === 'admin' ? 'ادمین' : user.name}</div>
                <div className={"status " + (user.isOnline ? "online" : "offline")}>{user.isOnline ? "آنلاین" : "آفلاین"}</div>
            </div>
        ));

        return(
            <div className={"users"}>
                {users}
            </div>
        );
    }
}

export default Users