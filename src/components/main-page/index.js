import React from 'react'
import './style.css'
import Slider from "../slider";
import Questions from "../questions";
import Header from "../header";
import Footer from "../footer";

class MainPage extends React.Component {
    render() {
        return(
            <div className="App">
                <Header/>
                <Slider/>
                <Questions/>
                <Footer/>
            </div>
        );
    }
}

export default MainPage