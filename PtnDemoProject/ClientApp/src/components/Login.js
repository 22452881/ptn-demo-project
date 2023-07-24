import React from 'react';
import { TextField, Button } from '@mui/material';
import apicaller from '../utils/api'

const styles = {
    button: {
        color: 'grey',
        borderColor: 'grey',
    },
    input: {
        color: 'grey',
    },
};

let username = '';
let password = '';

const login = async () => {
    debugger;
    const response = await apicaller.login(username, password);
    console.log(response);
};

function setUsername(event) {
    username = event.target.value;
}

function setPassword(event) {
    password = event.target.value;
}

const Login = ({ onToggle }) => {
    return (
        <div className="login-form">
            <div className="input-container">
                <TextField
                    label="Username"
                    type="search"
                    variant="filled"
                    onChange={setUsername}
                    fullWidth
                    sx={{ input: { color: 'grey' } }}
                    InputLabelProps={{
                        style: { color: 'grey' }, // Etiket (label) rengi
                    }}
                    InputProps={{
                        style: { color: 'grey' }, // Metin (input) rengi
                    }}
                />
            </div>

            <div className="input-container">
                <TextField
                    label="Password"
                    type="password"
                    variant="filled"
                    onChange={setPassword}
                    fullWidth
                    sx={{ input: { color: 'grey' } }}
                    InputLabelProps={{
                        style: { color: 'grey' }, // Etiket (label) rengi
                    }}
                    InputProps={{
                        style: { color: 'grey' }, // Metin (input) rengi
                    }}
                />
            </div>
            <Button className='login-btn' style={styles.button} variant="outlined" onClick={login}>Giriş Yap</Button>
            <p>Hesabın Yok Mu? <span onClick={onToggle}>Hemen Kaydol</span></p>
        </div>
    );
};

export default Login;