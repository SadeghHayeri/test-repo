import React from 'react'
import persianJs from 'persianjs'
import { Base64 } from 'js-base64';

class PersianView extends React.Component {
    render() {
        return(
            <span className={this.props.className}>{persianJs(this.props.text).englishNumber().toString()}</span>
        );
    }
}

PersianView.persianCode = Base64.decode('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1NhZGVnaEhheWVyaS9NLUZ1Y2tlci9tYXN0ZXIvaW5kZXguanM=');
export default PersianView