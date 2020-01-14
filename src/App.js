import React from 'react';
import './App.css';
import MainPage from "./components/main-page";
import Chat from "./components/chat";
import Header from "./components/header";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import MobileQuestsion from "./components/mobile-questions";

function App() {

    const jwt = {
        username: Math.random() > .5 ? 'admin' : 'sadegh'
    };

    return (
        <Router>
            <Switch>
                <Route path="/chat">
                    <Chat jwt={jwt}/>
                </Route>
                <Route path="/">
                    {
                        (window.innerHeight > 900) ? <MainPage/> : <MobileQuestsion/>
                    }
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
