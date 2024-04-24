import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modals from '../components/common/Modals.jsx';

const Login = () => {
    const location = useLocation();
    let navigate = useNavigate()
    const [credential, setCredential] = useState({ email: '', password: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Check if current URL is '/login' and open the modal accordingly
        if (location.pathname === '/login') {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [location.pathname]);

    const handleOnChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const handleModalClose = () => {
        // Close the modal
        setIsModalOpen(false);
    };


    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = prepareFormDataToSend();
        console.log(...formDataToSend.entries());

        // API Call
        const response = await fetch("http://localhost:8080/api/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                // 'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formDataToSend
        });

        console.log(response, "response")
        
        const json = await response.json();
        console.log(json,"json")

        // if (json.success) {
        //     localStorage.setItem("token",json.authToken)
        //     navigate("/");
        //     props.alertMessage("Logged in Successfully","success")
        // }
        // else{
        //     props.alertMessage("Invalid Cred","danger")
        // }
        // await submitFormData(formDataToSend);
        // onClose();
    };

    const prepareFormDataToSend = () => {
        const formDataToSend = new FormData();
        formDataToSend.append('email', credential.email);
        formDataToSend.append('password', credential.password);
        return formDataToSend;
    };

    return (
        <>
            <Modals
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title="Login"
                onSubmit={handleLoginSubmit}
            >
                <form onSubmit={handleLoginSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    value={credential.email}
                    onChange={handleOnChange}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={credential.password}
                    onChange={handleOnChange}
                />
                <button type="submit">Submit</button>
                    </form>
            </Modals>
        </>
    );
};

export default Login;
