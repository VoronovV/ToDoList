import React from 'react';
import Button from "../../components/Buttons/Button";
import styles from "./Authentication.module.css"
import {Link} from "react-router-dom";

function Authentication() {
    return (
        <div className={styles.authentication}>
            <h1>ToDoList</h1>
            <div>
                <Link to='/login'><Button value="Вход"/></Link>
                <Link to='/registration'><Button value="Регистрация"/></Link>
            </div>
        </div>
    );

}

export default Authentication;

