import React from "react";

import Home from "../pages/Home.js";
import About from "../pages/About.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "../pages/Contact.js";
import MarketPlace from "../pages/MarketPlace.js";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<MarketPlace />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;