import React, { useState } from 'react'
import './style/login.css'

function LoginForm( {userData, submitLogin} ) {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const [dataIsCorrect, setDataIsCorrect] = useState(false);

    const submitHandler = e => {
        e.preventDefault();

        if (loginData.email == "") {
            setError("*Email can't be empty");
        }
        else if (loginData.email != userData.email) {
            setError("*Email not registered");
        }
        else if (loginData.password == "") {
            setError("*Password can't be empty");
        }
        else if (loginData.password != userData.password) {
            setError("*Wrong password");
        }
        else{
            submitLogin(true);
        }
    }; 

    return (
        <div className="container2">
            <div className="form-container2">
                <form onSubmit={submitHandler}>
                    <div className='form-inner'>
                        <h2>Login</h2>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" onChange={e => setLoginData({ ...loginData, email: e.target.value })} value={loginData.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" onChange={e => setLoginData({ ...loginData, password: e.target.value })} value={loginData.password} />
                        </div>
                        {(error != "") ? <p>{error}</p> : ""}
                        <input type="submit" value="Create Account" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm
