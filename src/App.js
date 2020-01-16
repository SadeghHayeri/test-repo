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
import SignUp from "./components/signup";
import SignIn from "./components/signin";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jwt: 'unknown',
        }
    }

    async componentDidMount() {
        const jwt = await sessionStorage.getItem('jwt');
        this.setState({jwt: JSON.parse(jwt)});
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/chat">
                        <Chat jwt={this.state.jwt}/>
                    </Route>
                    <Route path="/signup">
                        <SignUp jwt={this.state.jwt}/>
                    </Route>
                    <Route path="/login">
                        <SignIn jwt={this.state.jwt}/>
                    </Route>
                    <Route path="/">
                        {
                            (window.innerWidth > 770) ? <MainPage/> : <MobileQuestsion/>
                        }
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
