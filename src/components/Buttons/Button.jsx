import React from 'react';
import './Buttons.css'
import { Link } from "react-router-dom";
function Button(props) {
    return (
        <div>
            <button className={`${props.registration} button`}>{props.value}</button>
        </div>
    );
}


export default Button;