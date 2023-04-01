import React from 'react';
import AppHeader from '../app-header/app-header'
import appStyles from './app.module.css';

function App() {
    return (
        <main className={appStyles.app}>
            <h1>Hello world!</h1>
            <AppHeader/>
        </main>
    )
}

export default App;