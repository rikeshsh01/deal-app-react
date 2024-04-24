import React from "react";

import Home from "../pages/Home.js";
import About from "../pages/About.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "../pages/Contact.js";
import MarketPlace from "../pages/MarketPlace.js";
import Login from "../pages/Login.js";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<MarketPlace />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;