import React from 'react'
import './style.css'
import Header from "../header";
import Slider from "../slider";
import Questions from "../questions";

class MainPage extends React.Component {
    render() {
        return(
            <div className="App">
                <Header/>
                <Slider/>
                <Questions/>
            </div>
        );
    }
}

export default MainPage