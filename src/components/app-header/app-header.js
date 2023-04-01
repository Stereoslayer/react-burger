import React from 'react';

import appHeaderStyles from './app-header.module.css';

function AppHeader() {
    return (
        <header className={appHeaderStyles.header}>
            <h1>i'm header </h1>
        </header>
    )
}

export default AppHeader;