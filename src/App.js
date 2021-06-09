import logo from './logo.svg';
// import './App.css';
import React from 'react';
import Splash from './pages/Splash.js';
import Chat from './pages/Chat.js';
import Store from './Components/Store';
import LazyLoad from 'react-lazyload';
import Loading from './Components/Loading';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


function App() {
    return (
        <Router>
            <Store>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Splash} />
                        <Route path="/chat" component={Chat} />
                    </Switch>
                </div>
            </Store>
        </Router>
    )
}

export default App;
