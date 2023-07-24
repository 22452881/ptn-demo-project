import React, { Component, useState } from 'react';
import Login from './Login';
import Register from './Register';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { Configuration } from './Configuration';
import { Route, Routes } from 'react-router-dom';

function PanteonLogo() {
    return (
        <div className='ptn-logo-container'>
            <img className='ptn-logo' src={process.env.PUBLIC_URL + '/assets/logo.png'}></img>
        </div>
    )
}

function MainEntryPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [buttonStatus, setButtonStatus] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsLogin((prevIsLogin) => !prevIsLogin);
    };

    const handleButtonClicked = () => {
        setButtonStatus((prevButtonStatus) => !prevButtonStatus);
        if (buttonStatus) {
            navigate('/config');
        }
    };

    const handleLogin = () => {
        /*Login başarılıysa buraya düşecek ve config'e yönlendirecek, yukardaki kısım yani */
        setIsLoggedIn(true);
    }

    return (
        <>
            <PanteonLogo />
            <Button onClick={handleButtonClicked}>Config'e Git</Button>
            <div>
                {/* Your Main page content */}
                {isLogin ? <Login onToggle={handleToggle} /> : <Register onToggle={handleToggle} />}
            </div>
        </>
    );
}

export default MainEntryPage;
