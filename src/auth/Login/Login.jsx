import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../style.css';
const API = "http://54.87.14.216/api"

function Login() {
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });
    useEffect(() => {
        if (localStorage.getItem("user-info")) {
            navigate("/");
        }
    })
    const [error, setError] = useState('');
    const loginHandleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserLogin({ ...userLogin, [name]: value });
    }
    async function submitLoginform(e) {
        e.preventDefault();
        let result = await fetch(`${API}/sign-in`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userLogin)
        });
        result = await result.json();
        console.log("result", result);
        localStorage.setItem("user-info", JSON.stringify(result));
        setUserLogin({ email: "", password: "" })
    }
    return (
        <div className='auth-page login-page'>
            <div className='ctm-container'>
                <h2 className='auth-page-heading'>Enmeldung</h2>
                <div className='auth-page-wrap big-card'>
                    <div className='login-page-img'>
                        <img src="/assets/images/large-logo.png" alt="Large Logo" />
                    </div>
                    <div className='auth-page-form'>
                        <form onSubmit={submitLoginform}>
                            <p className={`${error ? 'error-message' : ''}`}>{error}</p>
                            <div className='form-group'>
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' id='email' className='form-control' placeholder='Email' onChange={loginHandleInput} value={userLogin.email} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' id='password' className='form-control' placeholder='Password' onChange={loginHandleInput} value={userLogin.password} />
                            </div>
                            <div className='login-page-forget'>
                                <div className='ctm-checkbox'>
                                    <label className="ctm-checkbox-container">Remember me
                                        <input type="checkbox" />
                                        <span className="ctm-checkbox-checkmark"></span>
                                    </label>
                                </div>
                                <a href="/#">Forgot password?</a>
                            </div>
                            <button type="submit">Sign in</button>
                        </form>
                        <p className='auth-form-text'>Don’t have an account? <button onClick={() => navigate("/register")}>Sign up fo free!</button></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login