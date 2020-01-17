import React from 'react'
import './style.css'
import logo from './images/autism.png'
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import {server} from "../../config";


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          jwt: 'unknown',
        };
    }

    async componentDidMount() {
        const jwt = await sessionStorage.getItem('jwt');
        this.setState({jwt: JSON.parse(jwt)});
    }

    async onLogout() {
        await sessionStorage.removeItem('jwt');
        this.setState({jwt: null});
    }

    render() {
        const isLogin = this.state.jwt && this.state.jwt !== 'unknown';
        return(
            <header>
                <div className="inner-header">
                    <Link href='/'>
                        <div className="logo-container">
                            <img className="logo" src={logo}/>
                            <div className='name'>غربالگری اولیه‌ی اتیسم</div>
                        </div>
                    </Link>


                    {
                        !isLogin ?
                            (
                                <div className="login"
                                    onClick={() => {window.location.href = '/login'}}
                                >
                                    ورود
                                </div>
                            )
                            :
                            (
                                <div className="login"
                                     onClick={() => {window.location.href = '/chat'}}
                                >
                                    گفت و گوی آنلاین
                                </div>
                            )
                    }
                </div>
            </header>
        );
    }
}

export default Header