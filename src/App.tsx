import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TicTac from "./TicTac";
import TextAndButton from "./TextAndButton";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Market from "./Market";
import { Product } from './types';


const data : Product[] = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]


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
                        <Route path="/Market" element={<Market products={data}/>}/>
                    </Routes>
                </main>

                {/* Optional footer */}
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
