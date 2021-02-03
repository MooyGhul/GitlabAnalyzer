Header.js

import React from 'react';  

const Header = (pageTitle) => {
    return <h1 className={styles.header}>{pageTitle.pageTitle}</h1>
}

export default Header;