import React, { useState } from 'react'
import './style/register.css'

function RegisterPage({ Logins }) {

    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const submitHandler = e => {
        e.preventDefault();

        if (details.name == "") {
            setError("*Name can't be empty");
        }
        else if (details.email == "") {
            setError("*Email can't be empty");
        }
        else if (details.password == "") {
            setError("*Password can't be empty");
        }
        else if (details.password.length < 9) {
            setError("*Password must be more than 8 characters");
        }
        else {
            Logins(details);
        }
    }

    return (
        <div className="container1">
            <div className="form-container1">
                <form onSubmit={submitHandler}>
                    <div className='form-inner'>
                        <h2>Register</h2>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" onChange={e => setDetails({ ...details, name: e.target.value })} value={details.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                        </div>
                        {(error != "") ? <p>{error}</p> : ""}
                        <input type="submit" value="Create Account" />
                    </div>
                </form> 
            </div>
        </div>
    );
};

export default RegisterPage