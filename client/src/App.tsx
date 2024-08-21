import React from "react";
import Home from "./routes/home/main";
import Navbar from "./components/nav/main";
import "./style.scss";

const App = () => {
    return (
        <div className="App">
            <Navbar />
            <Home />
        </div>
    );
};

export default App;
