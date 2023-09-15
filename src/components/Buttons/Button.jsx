import React from 'react';
import './Buttons.css'

function Button(props) {
    return (
        <button className={`${props.registration} button`} onClick={props.onClick}>{props.value}</button>
    );
}

export default Button;