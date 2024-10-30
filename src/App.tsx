import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TicTac from "./TicTac";
import TextAndButton from "./TextAndButton";

function Sandbox() : React.ReactElement {
    return (
        <div >
            <p>Sandbox for various react test</p>
        </div>
    );
}


function Home() {
    return (
        <div className="Home">
            <Sandbox />
        </div>
    );
}

function App(): React.ReactElement {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Welcome to my app</h1>
                    <nav>
                        <Link to="/">Home</Link> | <Link to="/page">Text and button</Link> | <Link to="/TicTac">Tic Tac Toe</Link>
                    </nav>
                </header>

                {/* Main content area */}
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/page" element={<TextAndButton/>}/>
                        <Route path="/TicTac" element={<TicTac/>}/>
                    </Routes>
                </main>

                {/* Optional footer */}
                <footer>
                    <p>© 2024 My App. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
