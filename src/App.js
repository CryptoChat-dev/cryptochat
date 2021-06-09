import logo from './logo.svg';
// import './App.css';
import React from 'react';
import Splash from './pages/Splash.js';
import Chat from './pages/Chat.js';
import Store from './Components/Store';
import LazyLoad from 'react-lazyload';
import Loading from './Components/Loading';
function App() {
    const [displayChat, setDisplayChat] = React.useState(false);

    if (displayChat === true) {
        return (<LazyLoad placeholder={Loading}>
            <Store>
                <div className="App"> {
                    < Chat displayChat = {
                        displayChat
                    }
                    setDisplayChat = {
                        setDisplayChat
                    } />
                } </div>
            </Store>
        </LazyLoad>)
    } else {
        return (<LazyLoad placeholder={Loading}>

            <Store>
                <div className="App"> {
                    < Splash displayChat = {
                        displayChat
                    }
                    setDisplayChat = {
                        setDisplayChat
                    } />
                } </div>
            </Store>
        </LazyLoad>)
    }

}

export default App;
