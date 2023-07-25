import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import apicaller from '../utils/api'

const Login = ({ onToggle, handleLogin }) => {
    const styles = {
        button: {
            color: 'grey',
            borderColor: 'grey',
        },
        input: {
            color: 'grey',
        },
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const login = async () => {
        const response = await apicaller.AUTH.login(username, password);
        if (response && response.data) {
            localStorage.token = response.data.jwtToken;
            handleLogin();
        }
    };

    return (
        <div className="login-form">
            <div className="input-container">
                <TextField
                    label="Username"
                    type="search"
                    variant="filled"
                    onChange={handleUsernameChange}
                    fullWidth
                    sx={{ input: { color: 'grey' } }}
                    InputLabelProps={{
                        style: { color: 'grey' },
                    }}
                    InputProps={{
                        style: { color: 'grey' },
                    }}
                />
            </div>

            <div className="input-container">
                <TextField
                    label="Password"
                    type="password"
                    variant="filled"
                    onChange={handlePasswordChange}
                    fullWidth
                    sx={{ input: { color: 'grey' } }}
                    InputLabelProps={{
                        style: { color: 'grey' },
                    }}
                    InputProps={{
                        style: { color: 'grey' },
                    }}
                />
            </div>
            <Button className='login-btn' style={styles.button} variant="outlined" onClick={login}>LOGIN</Button>
            <p className='toggle-text'>Don't you have an account? <a onClick={onToggle}>Register Now</a></p>
        </div>
    );
};

export default Login;