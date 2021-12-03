import React, { useState, useContext } from "react";
import { useHistory } from 'react-router';
import { FieldContext } from "./Store/FieldContext";
import { LoginContext } from "./Store/Context";

const Field = () => {

    const { loggedIn, setLoggedIn } = useContext(LoginContext);
    const { field, setfield } = useContext(FieldContext);
    const history = useHistory();
    let sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

    if(field === null) {
        
        return (
            <div>
                Redirecting to Home page ...
                {
                    history.push('home')
                }
            </div>
        )
    }

    let date_ob = new Date();
    let day = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();

    return <div>
        <h1>
            {field.description}
        </h1>
        <p>
            {year + "." + month + "." + day}
        </p>
    </div>
}

export default Field;