import React from 'react';
import style from './Buttons.module.css'

function Button(props) {
    return (
        <button className={style.button} onClick={props.onClick}>{props.value}</button>
    );
}

export default Button;