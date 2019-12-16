import React from 'react'
import './style.css'
import Slider from "../slider";
import Questions from "../questions";
import Header from "../header";

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