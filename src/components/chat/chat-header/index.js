import React from 'react'
import './style.css'

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';


class ChatHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          jwt: 'unknown',
          drawer: false,
        };
    }

    async componentDidMount() {
        const jwt = await sessionStorage.getItem('jwt');
        this.setState({jwt: JSON.parse(jwt)});
    }

    static getUser(users, target) {
        return users.find(user => user.username === target.username)
    }

    toggleDrawer() {
        this.setState({drawer: !this.state.drawer});
    }

    render() {
        const {target, users, connected} = this.props;
        const targetName = target ? target.name : 'یک کاربر انتخاب کنید';
        const title = connected ? targetName : 'در حال اتصال به سرور...';
        const isOnline = connected && target && ChatHeader.getUser(users, target) && ChatHeader.getUser(users, target).isOnline;

        const sideList = (
            <div
                className='drawer'
                role="presentation"
                onClick={() => this.toggleDrawer()}
                onKeyDown={() => this.toggleDrawer()}
            >
                <List>
                    {users.map((user) => (
                        <ListItem onClick={() => {this.props.onUserChange(user)}} button key={user.name}>
                            {user.isOnline && <ListItemIcon><RadioButtonCheckedIcon/></ListItemIcon>}
                            <ListItemText primary={user.name} secondary={`${user.username}@`} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );


        return(
            <div className='chat-header'>
                <Drawer anchor="left" open={this.state.drawer} onClose={() => this.toggleDrawer()}>
                    {sideList}
                </Drawer>
                {
                    this.state.jwt && this.state.jwt.username === 'admin'
                    ? <PeopleIcon onClick={() => this.setState({drawer: true})} className='group-icon' />
                    : <HomeIcon onClick={() => window.location.href = '/'} className='group-icon' />
                }
                <div className='header-title'>
                    {title}
                    {connected && target && <div className={'chat-header-status'} style={{backgroundColor: isOnline ? 'green' : 'red'}}>{isOnline ? 'آنلاین' : 'آفلاین'}</div>}
                </div>
            </div>
        );
    }
}

export default ChatHeader