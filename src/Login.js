import React from 'react'

import './Login.css';

export default function Login(props) {
    return (
        <div className="login-page">
            <div className="form">
                <form onSubmit={props.submit} className="login-form">
                    <input autoComplete = "First Name" data-testid="firstName" type="text" placeholder="First Name" onChange={props.input} />
                    <input autoComplete = "Last Name" data-testid="lastName" type="text" placeholder="Last Name"/>
                    <input autoComplete = "Email" data-testid="email" type="text" placeholder="Email"/>
                    <input autoComplete = "Password" data-testid="password" type="password" placeholder="password"/>
                    <button data-testid="submit">login</button>
                </form>
            </div>
        </div>
    )
}