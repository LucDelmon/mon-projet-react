import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TicTac from "./TicTac";
import TextAndButton from "./TextAndButton";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";


function App(): React.ReactElement {
    return (
        <Router>
            <div className="App">
                <Header/>

                {/* Main content area */}
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/page" element={<TextAndButton/>}/>
                        <Route path="/TicTac" element={<TicTac row_count={3}/>}/>
                    </Routes>
                </main>

                {/* Optional footer */}
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
