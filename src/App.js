import React from 'react';
import './App.css';
import MainPage from "./components/main-page";
import Chat from "./components/chat";
import Header from "./components/header";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import MobileQuestsion from "./components/mobile-questions";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import rtl from 'jss-rtl';
import { createMuiTheme, StylesProvider, ThemeProvider, jssPreset } from '@material-ui/core/styles';
import { create } from "jss";
import MobileMainPage from "./components/mobile-main-page";
import Blog from './components/blog';
import MobileBlog from './components/mobile-blog';


const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const theme = createMuiTheme({
    direction: "rtl"
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jwt: 'unknown',
        }
    }

    render() {
        return (
            <StylesProvider jss={jss}>
                <ThemeProvider theme={theme}>
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
                            <Route path="/test">
                                <MobileQuestsion />
                            </Route>
                            <Route path="/blog">
                                {
                                    (window.innerWidth > 770) ? <Blog/> : <MobileBlog/>
                                }
                            </Route>
                            <Route path="/">
                                {
                                    (window.innerWidth > 770) ? <MainPage/> : <MobileMainPage/>
                                }
                            </Route>
                        </Switch>
                    </Router>
                    <ToastContainer />
                </ThemeProvider>
            </StylesProvider>
        );
    }
}

export default App;
