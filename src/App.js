import React from 'react';
import './App.css';
import MainPage from "./components/main-page";
import Chat from "./components/chat";
import Header from "./components/header";

function App() {

    const jwt = {
        username: Math.random() > .5 ? 'admin' : 'sadegh'
    };

    return (
        <div dir="rtl">
            <Header/>
            {/*<MainPage/>*/}
            <Chat jwt={jwt}/>
        </div>
    );
}

export default App;
