import React from 'react'; 

import styles from "../style/header.module.css"

const Header = (pageTitle) => {
    return <h1 className={styles.header}>{pageTitle.pageTitle}</h1>
}

export default Header;