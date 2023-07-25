import React, { Component, useState } from 'react';
import Login from './Login';
import Register from './Register';
import { useNavigate } from 'react-router-dom';

function MainEntryPage() {
    const navigate = useNavigate();

    if (localStorage.token) {
        window.location = '/config'
    }

    const [isLogin, setIsLogin] = useState(true);
    const [buttonStatus, setButtonStatus] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleToggle = () => {
        setIsLogin((prevIsLogin) => !prevIsLogin);

    };

    const handleLogin = () => {
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
