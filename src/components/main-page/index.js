import React from 'react'
import './style.css'
import Slider from "../slider";
import Questions from "../questions";

class MainPage extends React.Component {
    render() {
        return(
            <div className="App">
                <Slider/>
                <Questions/>
            </div>
        );
    }
}

export default MainPage