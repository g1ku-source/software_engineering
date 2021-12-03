import React, {useContext, useState} from 'react'
import { LoginContext } from "./Store/Context";
import { FieldContext } from './Store/FieldContext';
import { useHistory } from 'react-router';
import axios from 'axios';
import './Home.css';

const Home = () => {

    const [fields, setFieldsServer]  = useState([]);
    const { loggedIn, setLoggedIn } = useContext(LoginContext);
    const { field, setField } = useContext(FieldContext);

    const history = useHistory();

    const getData = () => {

        axios.get('http://localhost:5000/api/sports')
        .then(res => setFieldsServer(res.data))
        .then(console.log(fields))
    }

    if (fields.length == 0)
        getData();

    if(loggedIn == null) {
        
        return (
        <div>
            <div>Home Page</div>
            <div>
                <button onClick = {

                    () => {

                        history.push('/login');
                    }
                }>Login</button>
            </div>
            <div>
                <button onClick = {

                    () => {

                        history.push('/register');
                    }
                }>Register
                </button>
            </div>
            <div>
                <a>Sports</a>
                <ul>
                    {fields.map(f => (
                        <li key={f._id}>
                            <h4>{f.description}</h4>
                            <h5>Where is located? {f.location}</h5>
                            <button onClick={

                                () => {

                                    console.log(f._id);
                                    history.push('/login');
                                }
                            } >Rent this field</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        )
    }
    return (

        <div>
            <div>
                Welcome back, {loggedIn.username}!
            </div>
            
            <button onClick = {

                async () => {

                    const headers = {

                        'Content-Type': 'application/json'
                    }

                    await axios.delete('http://localhost:5000/api/user/logout',
                    {
                        _id: loggedIn._id
                    },
                    {headers})
                    .then(res => {

                        if(res.status === 200) {

                            setLoggedIn(null);

                            return history.push('/home');
                        }
                    })
                    .catch(err => {

                        console.log(err);
                    })
                    
                }
            }>Logout
            </button>
            <div>
                <a>Sports</a>
                <ul>
                    {fields.map(f => (
                        <li key={f._id}>
                            <h4>{f.description}</h4>
                            <h5>Where is located? {f.location}</h5>
                            <button onClick= {

                                () => {

                                    console.log(loggedIn);
                                    console.log(field);
                                    setField({
                                        _id: f._id,
                                        location: f.location,
                                        description: f.description
                                    });
                                    console.log(field);
                                    history.push('/field');
                                }
                            }>
                                Rent this field
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
    )
}

export default Home
