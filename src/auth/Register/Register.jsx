import React from 'react';
import '../style.css';

function Register() {
    return (
        <div className='auth-page register-page'>
            <div className='ctm-container'>
                <div className='register-header'>
                    <img src="/assets/images/large-logo.png" alt="Large Logo" />
                    <h2 className='auth-page-heading'>Enmeldung</h2>
                </div>
                <form>
                    <div className='auth-page-wrap big-card'>
                        <div className='auth-page-form'>
                            <div className='form-group'>
                                <label htmlFor="email">Email Address</label>
                                <input type="email" name='email' id='email' className='form-control' placeholder='Enter your email' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' id='password' className='form-control' placeholder='Password' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="repeatPassword">Repeat Password</label>
                                <input type="password" name='repeatPassword' id='repeatPassword' className='form-control' placeholder='Password' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="companyName">Company Name</label>
                                <input type="text" name='companyName' id='companyName' className='form-control' placeholder='Company name' />
                            </div>
                            <div className='login-page-forget'>
                                <div className='ctm-checkbox'>
                                    <label className="ctm-checkbox-container">I agree to the <a href="/#">terms of services</a> of this website.
                                        <input type="checkbox" />
                                        <span className="ctm-checkbox-checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='auth-page-form'>
                            <div className='form-col'>
                                <div className='form-group'>
                                    <label htmlFor="firstName">Name</label>
                                    <input type="text" name='firstName' id='firstName' className='form-control' placeholder='First Name' />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" name='lastName' id='lastName' className='form-control' placeholder='Last Name' />
                                </div>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="tel" name='phoneNumber' id='phoneNumber' className='form-control' placeholder='Phone Number' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="street">Street</label>
                                <input type="text" name='street' id='street' className='form-control' placeholder='Street' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="houseNumber">House Number</label>
                                <input type="text" name='houseNumber' id='houseNumber' className='form-control' placeholder='House Number' />
                            </div>
                            <button type="submit">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register