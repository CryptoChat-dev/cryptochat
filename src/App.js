import logo from './logo.svg';
// import './App.css';
import React from 'react';
import Splash from './pages/Splash.js';
import Chat from './pages/Chat.js';
import Store from './Components/Store';

function App() {
    const [displayChat, setDisplayChat] = React.useState(false);

    if (displayChat === true) {
        return (<Store>
            <div className="App"> {
                < Chat />
            } </div>
        </Store>)
    } else {
        return (<Store>
            <div className="App"> {
                < Splash displayChat = {
                    displayChat
                }
                setDisplayChat = {
                    setDisplayChat
                } />
            } </div>
        </Store>)
    }

}

export default App;
