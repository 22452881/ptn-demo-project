
import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const styles = {
    button: {
        color: 'grey',
        borderColor: 'grey',
    },
    input: {
        color: 'grey',
    },
};
const Register = ({ onToggle }) => {
    return (
        <div className="login-form">
            <div className="input-container">
                <TextField
                    label="E-mail"
                    type="search"
                    variant="filled"
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
                    label="User name"
                    type="search"
                    variant="filled"
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

            {/* Register'a tıkladıktan sonra login'e yönlendirmesi lazım */}
            <Button className='login-btn' style={styles.button} variant="outlined" >REGISTER</Button>
            <p>Zaten Hesabın Var mı? <span onClick={onToggle}>Giriş Yap</span></p>
        </div>
    );
};

export default Register;