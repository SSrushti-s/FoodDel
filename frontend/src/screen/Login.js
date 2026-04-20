import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate() //Instead of the user clicking a link, you can programmatically "force" the app to change pages (e.g., jumping to the Home page after a successful login).

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()

        if (json.success) {
            // SAVE TOKEN TO BROWSER STORAGE
            localStorage.setItem("userEmail", credentials.email);//data stored here survives a page refresh.
            localStorage.setItem("authToken", json.authToken);//authtoken from backend
            navigate("/"); // Take user to Home page
        } else {
            alert("Invalid Credentials")
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="m-3 btn btn-success">Login</button>
                <Link to="/createuser" className="m-3 btn btn-danger">New User? Signup</Link>
            </form>
        </div>
    )
}