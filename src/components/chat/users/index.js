import React from 'react'
import './style.css'
import persianDate from 'persian-date';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 1,
            users: [{
                id: 1,
                name: 'sadegh',
            }, {
                id: 2,
                name: 'سحر'
            }],
        }
    }

    onClick(id) {
        this.setState({selected: id});
        if(this.props.onChange)
            this.props.onChange(id);
    }

    render() {
        const users = this.state.users.map(user => (
            <div onClick={() => this.onClick(user.id)} key={user.id} className={"user " + (this.state.selected === user.id ? "selected" : "")}>
                <div className={"user-name"}>{user.name}</div>
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