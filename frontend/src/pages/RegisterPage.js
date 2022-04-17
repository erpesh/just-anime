// import React, {useContext} from 'react';
// import AuthContext from "../context/AuthContext";
//
// const RegisterPage = () => {
//     const {registerUser} = useContext(AuthContext)
//
//     return (
//         <div>
//             <form onSubmit={registerUser}>
//                 <input type="text" name="username" placeholder="Enter Username"/>
//                 <input type="password" name="password" placeholder="Enter Password"/>
//                 <input type="password" name="password2" placeholder="Confirm Password"/>
//                 <input type="email" name="email" placeholder="Enter Email"/>
//                 <input type="submit" />
//             </form>
//         </div>
//     );
// };
//
// export default RegisterPage;

import React, {useContext, useEffect, useState} from 'react';
import AuthContext from "../context/AuthContext";
import {Button, Form} from "react-bootstrap";

const RegisterPage = () => {
    // const {registerUser} = useContext(AuthContext)
    const {loginUser, authTokens} = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("")
    const [username, setUsername] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0 && username.length > 0;
    }

    const registerUser = async (e) => {
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "password2": password2,
                "email": email
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

    // const createList = async () => {
    //     const response = await fetch('http://127.0.0.1:8000/api/anime/', {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': "application/json",
    //             'Authorization': 'Bearer ' + String(authTokens.access)
    //         },
    //         body: JSON.stringify({
    //             "Watching": [],
    //             "Completed": [],
    //             "Plan to watch": []
    //         })
    //     })
    //     const data = await response.json()
    //     console.log(data)
    // }


    const handleSubmit = (e) => {
        registerUser(e)
        // if (authTokens) createList()
    }


    return (
        <div className="page Register">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password2">
                    <Form.Label>Password2</Form.Label>
                    <Form.Control
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </Form.Group>
                <Button size="lg" type="submit" disabled={!validateForm()}>
                    Register
                </Button>
            </Form>
        </div>
    );
};

export default RegisterPage;