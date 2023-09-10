import React, {Component} from 'react';
import './header.css'
import Button from "../Buttons/Button";
import {Link} from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="header">
                <Link to="/">
                    <Button value = "Выход" registration = "registration"/>
                </Link>

            </div>
        );
    }
}

export default Header;