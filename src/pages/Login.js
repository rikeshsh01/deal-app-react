import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credential, setCredential] = useState({email:'',password:""})
    let navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault();
        console.log("Clicked on submit :http://127.0.0.1:7000/api/auth/login")
        // API Call
        const response = await fetch("http://127.0.0.1:8080/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ email:credential.email,password:credential.password })// body data type must match "Content-Type" header
        });
        console.log(response)
        const json = await response.json();
        console.log(json)

        if (json.success) {
            localStorage.setItem("token",json.authToken)
            navigate("/");
            props.alertMessage("Logged in Successfully","success")
        }
        else{
            props.alertMessage("Invalid Cred","danger")
        }
    }

    const onChanged =(e) =>{
        setCredential({...credential,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <form onSubmit={handleClick}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credential.email} onChange={onChanged} aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credential.password} onChange={onChanged} placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login