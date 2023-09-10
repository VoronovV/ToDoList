import React, {Component} from 'react';
import Button from "../../components/Buttons/Button";
import "./Authentication.css"
import {Link} from "react-router-dom";

class Authentication extends Component {
    render() {
        return (
            <div className='authentication'>

                    <h1>ToDoList</h1>
                    <div>
                        <Link to='/login'> <Button value = "Вход"/></Link>
                        <Link to='/registration'> <Button value = "Регистрация" registration = "registration"/></Link>
                    </div>


            </div>
        );
    }
}

export default Authentication;

