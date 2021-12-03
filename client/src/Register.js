import { React, useState } from 'react'
import './Register.css';
import axios from 'axios';
import validator from 'validator';
import { useHistory } from 'react-router';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [emailValidator, setEmailValidator] = useState('');
    const [credentialValidator, setCredentials] = useState('');
    const [checkUser, setUser] = useState('');

    const history = useHistory();

    return (
        <div className="container">
            <div className="register">
                Register
            </div>

            <div className="input-container">
                <div>Username</div>
                <input type="text" require="true" onChange = {(event) =>

                    setUsername(event.target.value)
                }/>
            </div>

            <div className="input-container">
                <div>Email</div>
                <input type="text" require="true" onChange = {(event) =>

                    setEmail(event.target.value)
                }/>
                <div className="validator">
                    {emailValidator}
                </div>
            </div>

            <div className="input-container">
                <div>Password</div>
                <input type="password" require="true" onChange = {(event) =>

                    setPassword(event.target.value)
                }/>
            </div>
            
            <div className="validator">
                {credentialValidator}    
            </div>

            <div className="submit-button">
                <button onClick = {

                    async () => {

                        if(email === '' || password === '' || username === '') {

                            setCredentials('Please enter credentials');
                            return ;
                        }

                        setCredentials('');

                        if(! validator.isEmail(email)) {

                            setEmailValidator("Enter a valid email!");
                            return ;
                        }

                        setEmailValidator('');

                        const headers = {

                            'Content-Type': 'application/json'
                        }

                        await axios.post('http://localhost:5000/api/user/register', 
                        {
                            username: username,
                            password: password,
                            email: email
                        },
                        {headers})
                        .then(res => {
                            
                            console.log(res.status);
                            if(res.status === 200) {

                                setUser('User created!');
                                console.log('Success');

                                history.push('/login');
                            }
                        })
                        .catch(err => {

                            setUser('Email / Username already used.')
                            console.log(err);
                        })
                    }
                }>Register</button>
            </div>

            <div className="validator">
                {checkUser}
            </div>
        </div>
    )
}

export default Register;
