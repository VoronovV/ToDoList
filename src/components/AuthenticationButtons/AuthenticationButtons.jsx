import React from 'react';
import { Link } from "react-router-dom";
function AuthenticationButtons(props) {
    return (
        <div>

                <button>{props.value}</button>


        </div>
    );
}


export default AuthenticationButtons;