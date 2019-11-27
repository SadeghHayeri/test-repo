import React from 'react'
import './style.css'
import tick from './images/tick.png'

class Answer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }

    select(item) {
        if (this.state.selected === item) {
            this.setState({selected: null});
            this.props.onChange(null)
        } else {
            this.setState({selected: item})
            this.props.onChange(item)
        }
    }

    render() {
        return(
            <div className="container">
                <div className="answers">
                    <div className="answers-text good-text">موافق</div>
                    <div onClick={() => this.select(3)} className={"circle good r4" + (this.state.selected === 3 ? " selected" : "")}>{ this.state.selected === 3 && <img className="t4" src={tick}/> }</div>
                    <div onClick={() => this.select(2)} className={"circle good r3" + (this.state.selected === 2 ? " selected" : "")}>{ this.state.selected === 2 && <img className="t3" src={tick}/> }</div>
                    <div onClick={() => this.select(1)} className={"circle good r2" + (this.state.selected === 1 ? " selected" : "")}>{ this.state.selected === 1 && <img className="t2" src={tick}/> }</div>
                    <div onClick={() => this.select(0)} className={"circle normal r1" + (this.state.selected === 0 ? " selected" : "")}>{ this.state.selected === 0 && <img className="t1" src={tick}/> }</div>
                    <div onClick={() => this.select(-1)} className={"circle bad r2" + (this.state.selected === -1 ? " selected" : "")}>{ this.state.selected === -1 && <img className="t2" src={tick}/> }</div>
                    <div onClick={() => this.select(-2)} className={"circle bad r3" + (this.state.selected === -2 ? " selected" : "")}>{ this.state.selected === -2 && <img className="t3" src={tick}/> }</div>
                    <div onClick={() => this.select(-3)} className={"circle bad r4" + (this.state.selected === -3 ? " selected" : "")}>{ this.state.selected === -3 && <img className="t4" src={tick}/> }</div>
                    <div className="answers-text bad-text">مخالف</div>
                </div>
                <div className="line"/>
            </div>
        );
    }
}

export default Answer