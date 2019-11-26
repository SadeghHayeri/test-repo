import React from 'react'
import Question from "./question";

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div>
                <Question/>
                <h1>{this.props.name}</h1>
            </div>
        );
    }
}

export default Questions