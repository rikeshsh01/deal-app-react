import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
        const requestData = {
            email: credential.email,
            password: credential.password
        };

        try {
            // API Call
            let response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData),
            });
            const json = await response.json();
            console.log(json.data.authToken)
            let userId = json.data.userId

            // Handle response data
            if (json.data.authToken && json.data.authToken !== "") {
                localStorage.setItem("authToken", json.data.authToken);
                navigate("/");
            } else {
                navigate(`/verifyemail/${userId}`);
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <>
            <Modals
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title="Login"
                customClassName="modal-for-auth"
            >
                <form className='login__form' onSubmit={handleLoginSubmit}>
                    <div className='login__input__section'>
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
                    </div>
                    <div className='login__button__section'>
                        <button className='login__button' type="submit">Login</button>
                        <p >Forget password? <Link to="/forgetpassword">Reset now</Link></p>
                        <button className='create__account__button'><Link to="/signup">Create new account</Link></button>
                    </div>

                </form>
            </Modals>
        </>
    );
};

export default Login;
