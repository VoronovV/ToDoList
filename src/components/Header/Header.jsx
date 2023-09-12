import React from 'react';
import './header.css'
import Button from "../Buttons/Button";
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <div className="header">
            <Link to="/">
                <Button value = "Выход" registration = "registration"/>
            </Link>

        </div>
    );
}

export default Header;