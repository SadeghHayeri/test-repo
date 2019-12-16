import React from 'react'
import './style.css'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import nextImg from './images/next.png'
import backImg from './images/back.png'
import menu from './images/menu.png'

class MobileQuestsion extends React.Component {
    targetRef = React.createRef();
    targetElement = null;

    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            width: 0,
            height: 0
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.targetElement = document.querySelector('#main');
    }

    componentDidMount() {
        this.targetElement = this.targetRef.current;
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        // disableBodyScroll(this.targetElement);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        clearAllBodyScrollLocks();
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    onButton(item) {
        this.setState({selected: item});
    }

    render() {
        return(
            <div className={'mobile-questions'} ref={this.targetRef} id={'main'}>
                <div className='questions-header'>
                    <img src={menu} alt="" className='questions-menu-icon'/>
                </div>
                <div className='mob-main-questions'>
                    <div className="next-button"><img className='arrow-img' src={nextImg} alt=""/></div>
                    <div className="back-button"><img className='arrow-img' src={backImg} alt=""/></div>
                    <div className='main-questions-header'>
                        <div className='main-number'>۲۳</div>
                        <div className='main-all-number'>/ ۸۶</div>
                    </div>
                    <div className='main-line'/>
                    <div className='mob-main-question'>آیا شما در مورد این موضوع توافق دارین یا خیر لطفا یکی از گزینه‌ها را انتخاب بفرمایید تا بنده رسیدگی کنم؟</div>
                </div>
                <div className='mob-answers'>
                    <div onClick={() => this.onButton(+2)} className={'mob-button butt1 ' + (this.state.selected === +2 ? 'selected' : '')} >کاملا موافق</div>
                    <div onClick={() => this.onButton(+1)} className={'mob-button butt2 ' + (this.state.selected === +1 ? 'selected' : '')}>موافق</div>
                    <div onClick={() => this.onButton(-1)} className={'mob-button butt3 ' + (this.state.selected === -1 ? 'selected' : '')}>مخالف</div>
                    <div onClick={() => this.onButton(-2)} className={'mob-button butt4 ' + (this.state.selected === -2 ? 'selected' : '')}>کاملا مخالف</div>
                </div>
            </div>
        );
    }
}

export default MobileQuestsion