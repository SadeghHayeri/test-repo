import React from 'react'
import './style.css'
import PersianView from "../../commons/persian-view";

class ProgressBar extends React.Component {
    render() {
        return(
            <div className="progress-bar">
                <PersianView className="percentage" text={this.props.percentage + '%'} />
                <div className="bar">
                    <div className="in-bar" style={{width: this.props.percentage + '%'}}/>
                </div>
            </div>
        );
    }
}

export default ProgressBar