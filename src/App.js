// Components
import Splash from './pages/Splash.js';
import Chat from './pages/Chat.js';
import Legal from './pages/Legal.js';
import Terms from './pages/legal/Terms.js';
import Privacy from './pages/legal/Privacy.js';
// import Loading from './Components/Loading';

import Store from './Components/Store'
// Modules;
import React from 'react';
import LazyLoad from 'react-lazyload';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
    return (
        <LazyLoad>
            <Router>
                <Store>
                    <div className="App">
                        <Switch>
                            <Route exact path="/"
                                component={Splash}/>
                            <Route path="/chat"
                                component={Chat}/>
                            <Route exact path="/legal"
                                component={Legal}/>
                            <Route path="/terms"
                                component={Terms}/>
                            <Route path="/privacy"
                                component={Privacy}/>
                        </Switch>
                    </div>
                </Store>
            </Router>
        </LazyLoad>
    )
}

export default App;
