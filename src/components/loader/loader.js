import React from 'react';
import loaderStyles from './loader.module.css';
import waiting from '../../images/waiting.png';
import background from '../../images/waitingBackground.png';

const Loader = () => {
    return (
        <div className={loaderStyles.container}>
            <img className={`${loaderStyles.image}`} src={waiting}/>
            <img className={`${loaderStyles.imageBackground}`} src={background}/>
        </div>
    )
}

export default Loader;