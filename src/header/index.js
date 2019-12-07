import React from 'react'
import './style.css'
import logo from './images/autism.png'

class Header extends React.Component {
    render() {
        return(
            <header>
                <div className="inner-header">
                    <div className="logo-container">
                        <img className="logo" src={logo}/>
                        <div className='name'>غربالگری اولیه‌ی اتیسم</div>
                    </div>

                    <div className="login">ورود</div>
                </div>
            </header>
        );
    }
}

export default Header