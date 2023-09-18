import React from 'react';
import styles from './header.module.css'
import Button from "../Buttons/Button";
import {Link} from "react-router-dom";

function Header(props) {
    let pathTo = `/${props.path}`

    return (
        <div className={styles.header}>
            <Link to={pathTo}>
                <Button value={props.value}/>
            </Link>
        </div>
    );
}

Header.defaultProps = {
    path: ""
}

export default Header;