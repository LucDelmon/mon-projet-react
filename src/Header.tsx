import {Link} from "react-router-dom";
import React from "react";

function Header() {
    return <header className="App-header">
        <h1>Welcome to my app</h1>
        <nav>
            <Link to="/">Home</Link> | <Link to="/page">Text and button</Link> | <Link to="/TicTac">Tic Tac Toe</Link>
        </nav>
    </header>;
}

export default Header;
