import React from 'react'
import './style.css'

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div className="question-title">
                {this.props.title}
            </div>
        );
    }
}

export default Question