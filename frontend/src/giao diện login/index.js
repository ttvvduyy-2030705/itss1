import React from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/styles.css';

function HomePage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const handleGoogleLogin = () => {
        window.location.href = 'https://accounts.google.com/signin';
    };

    const handleFacebookLogin = () => {
        window.location.href = 'https://www.facebook.com/login';
    };

    return (
        <div className="container">
            <img src="images/coffee.png" alt="コーヒーカップ" className="coffee-icon" />
            <h1>Café Compass</h1>
            <button onClick={handleLogin}>ログイン</button>
            <button onClick={handleRegister}>登録</button>
            <button onClick={handleGoogleLogin}>グーグルでログイン</button>
            <button onClick={handleFacebookLogin}>フェイスブックでログイン</button>
        </div>
    );
}

export default HomePage;
