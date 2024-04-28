import React from "react";
import Home from "../pages/Home.js";
import About from "../pages/About.js"
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "../pages/Contact.js";
import MarketPlace from "../pages/MarketPlace.js";
import Login from "../pages/Login.js";
import SignUp from "../pages/SignUp.js";
import VerifyEmail from "../pages/VerifyEmail.js";
import ForgetPassword from "../pages/ForgetPassword.js";
import ResetPassword from "../pages/ResetPassword.js";


const App = () => {
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element: <Home />,
        },
        {
            path:"/marketplace",
            element: <MarketPlace />,
        },
        {
            path:"/about",
            element: <About />,
        },
        {
            path:"/contact",
            element: <Contact />,
        },
        {
            path:"/login",
            element: <Login />,
        },
        {
            path:"/signup",
            element: <SignUp />,
        },
        {
            path:"/forgetpassword",
            element: <ForgetPassword />,
        },
        {
            path:"/resetpassword/:userId",
            element: <ResetPassword />,
        },
        {
            path:"/verifyemail/:userId",
            element: <VerifyEmail />,
        },
    ])
    return (
        <RouterProvider router={appRouter}></RouterProvider>
    );
};
export default App;

// <BrowserRouter>
        //     <Routes>
        //         <Route path="/" element={<Home />} />
        //         <Route path="/marketplace" element={<MarketPlace />} />
        //         <Route path="/about" element={<About />} />
        //         <Route path="/contact" element={<Contact />} />
        //         <Route path="/login" element={<Login />} />
        //         <Route path="/signup" element={<SignUp />} />
        //         <Route path="/forgetpassword" element={<ForgetPassword/>} />
        //         <Route path="/resetpassword/:userId" element={<ResetPassword/>} />
        //         <Route path="/verifyemail/:userId" element={<VerifyEmail />} />
        //     </Routes>
        // </BrowserRouter>