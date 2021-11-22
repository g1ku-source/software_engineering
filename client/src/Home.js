import React, {useContext} from 'react'
import {LoginContext} from "./Store/Context";
import { useHistory } from 'react-router';

const Home = () => {

    const {loggedIn, setLoggedIn} = useContext(LoginContext);
    const history = useHistory();
    //console.log(loggedIn);
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
        </div>
        )
    }
    return (

        <div>
            <div>
                Welcome back, {loggedIn.username}!
            </div>

            <button onClick = {

                () => {

                    console.log('logout');
                }
            }>Logout
            </button>

        </div>
        
    )
}

export default Home
