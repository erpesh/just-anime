import React, {useContext} from 'react';
import AuthContext from "../../context/AuthContext";

const Register = ({setIsLoginActive, setIsModalActive}) => {
    const {loginUser} = useContext(AuthContext)

    const registerUser = async (e) => {
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": e.target.username.value,
                "password": e.target.password.value,
                "password2": e.target.password2.value,
                "email": e.target.email.value
            })
        })

        const data = await response.json()
        if (data.password && data.password === "Password fields didn't match.") {
            alert("Passwords do not match!")
        } else if (response.status === 201) {
            await loginUser(e)
        } else {
            alert("Something went wrong")
        }
    }

    return (
        <>
            <div className="login__container">
                <form onSubmit={registerUser} className="login__form">
                    <p className="popup__header" style={{fontSize: '2rem', fontWeight: '800'}}>Register</p>
                    <div className="field-container">
                        <input className="input__auth" type="text" name="username" placeholder="Username"/>
                    </div>
                    <div className="field-container">
                        <input className="input__auth" type="email" name="email" placeholder="Email"/>
                    </div>
                    <div className="field-container">
                        <input className="input__auth" type="password" name="password" placeholder="Password"/>
                    </div>
                    <div className="field-container">
                        <input className="input__auth" type="password" name="password2" placeholder="Confirm Password"/>
                    </div>
                    <div className="field-container">
                        <input onClick={() => setIsModalActive(false)} type="submit" className="log-submit" value="Register"/>
                    </div>
                    <p className="question">Have an account?<span className="question-span"
                                                                         onClick={() => setIsLoginActive(true)}> Login here.</span>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Register;