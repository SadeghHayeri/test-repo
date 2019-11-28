import React from 'react';
import './App.css';
import Questions from './questions'
import Header from "./header";
import Slider from "./slider";

function App() {
  return (
      <div dir="rtl">
        <div className="App">
            <Header/>
            <Slider/>
            <Questions/>
        </div>
      </div>
  );
}

export default App;
