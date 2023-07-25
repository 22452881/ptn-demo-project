import React, { Component, useState } from 'react';
import Login from './Login';
import Register from './Register';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

function MainEntryPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [buttonStatus, setButtonStatus] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsLogin((prevIsLogin) => !prevIsLogin);

    };

    const handleLogin = () => {
        /*Login başarılıysa buraya düşecek ve config'e yönlendirecek, yukardaki kısım yani */
        setIsLoggedIn(true);
        navigate('/config');
    }

    const handleRegister = () => {
        setIsLogin(true);
    };

    return (
        <div>
            {isLogin ? <Login onToggle={handleToggle} handleLogin={handleLogin} /> : <Register onToggle={handleToggle} handleRegister={handleRegister} />}

        </div>
    );
}

export default MainEntryPage;
