import React from "react";

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

export default Home;
