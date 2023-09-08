import React, {Component} from 'react';
import './header.css'
import Button from "../Buttons/Button";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="header">
                <Button value = "Вход"/>
                <Button value = "Регистрация" registration = "registration"/>
            </div>
        );
    }
}

export default Header;