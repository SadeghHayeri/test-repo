import React from 'react'
import persianJs from 'persianjs'

class PersianView extends React.Component {
    render() {
        return(
            <span className={this.props.className}>{persianJs(this.props.text).englishNumber().toString()}</span>
        );
    }
}

export default PersianView