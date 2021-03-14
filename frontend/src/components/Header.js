import React from 'react'; 
import styles from "../style/header.module.css"

const Header = (props) => {
    return(
            <h1 className={styles.header}>{props.pageTitle}</h1>
    )
}

export default Header;