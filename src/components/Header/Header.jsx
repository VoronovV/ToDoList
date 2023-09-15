import React from 'react';
import './header.css'
import Button from "../Buttons/Button";
import {Link} from "react-router-dom";

function Header(props) {
    let pathTo = `/${props.path}`

    return (
        <div className="header">
            <Link to={pathTo}>
                <Button value={props.value} registration="registration"/>
            </Link>
        </div>
    );
}

Header.defaultProps = {
    path: ""
}

export default Header;