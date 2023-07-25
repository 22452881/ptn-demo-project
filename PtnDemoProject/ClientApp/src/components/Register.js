
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import apicaller from '../utils/api'


const Register = ({ onToggle, handleRegister }) => {
    const styles = {
        button: {
            color: 'grey',
            borderColor: 'grey',
        },
        input: {
            color: 'grey',
        },
    };
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const register = async () => {
        const response = await apicaller.AUTH.register(email, username, password);
        if (response) {
            if (response.status == 200) {
                handleRegister();
            } else if (response.status == 409) {
                window.alert('There is a user with the username or email you entered!')
            } else {
                window.alert('Error Occured!')
            }
        }
    };

    return (
        <div className="login-form">
            <div className="input-container">
                <TextField
                    label="E-mail"
                    type="search"
                    variant="filled"
                    fullWidth
                    onChange={handleEmailChange}
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
                    label="User name"
                    type="search"
                    variant="filled"
                    fullWidth
                    onChange={handleUsernameChange}
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
                    fullWidth
                    onChange={handlePasswordChange}
                    sx={{ input: { color: 'grey' } }}
                    InputLabelProps={{
                        style: { color: 'grey' },
                    }}
                    InputProps={{
                        style: { color: 'grey' },
                    }}
                />
            </div>

            <Button className='login-btn' style={styles.button} onClick={register} variant="outlined" >REGISTER</Button>
            <p className='toggle-text'>Do you have an account? <span onClick={onToggle}>Login</span></p>
        </div>
    );
};

export default Register;