import { React, useState, useContext } from 'react';
import axios from 'axios';
import validator from 'validator';
import { useHistory } from 'react-router';
import { LoginContext } from './Store/Context';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkEmail, setCheckEmail] = useState('');
    const [credentials, setCredentials] = useState('');
    const [user, setUser] = useState('');
    const { loggedIn, setLoggedIn } = useContext(LoginContext);
    const history = useHistory();

    return (
        <div className="container">
            <div className="login">
                Login
            </div>

            <div className="input-container">
                <div>Email</div>
                <input type="text" require="true" onChange = {(event) =>

                    setEmail(event.target.value)
                }/>
            </div>

            <div>
                {checkEmail}
            </div>

            <div className="input-container">
                <div>Password</div>
                <input type="password" require="true" onChange = {(event) =>
                    setPassword(event.target.value)
                }/>
            </div>

            <div>
                {credentials}
            </div>

            <div className="submit-button">
                <button onClick = {

                    async () => {

                        if(email === '' || password === '') {
                            
                            setCredentials('Please enter credentials');
                            return ;
                        }

                        setCredentials('');

                        if(! validator.isEmail(email)) {

                            setCheckEmail('Enter a valid email');
                            return ;
                        }

                        setCheckEmail('');

                        const headers = {

                            'Content-Type': 'application/json'
                        }

                        await axios.post('http://localhost:5000/api/user/login',
                        {
                            email: email,
                            password: password
                        },
                        {headers})
                        .then(res => {
                            
                            if(res.status === 200) {
                                
                                setLoggedIn({
                                    refreshToken: res.data.refreshToken,
                                    accessToken: res.data.accessToken,
                                    username: res.data.username,
                                    _id: res.data._id
                                });
                                console.log(res.data);

                                return history.push('/home');
                            }
                        })
                        .catch(err => {

                            console.log(err);
                        })
                    }
                }>
                Login
                </button>
            </div>
        </div>
    )
}

export default Login
