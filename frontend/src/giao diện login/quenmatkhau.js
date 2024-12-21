import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/styles.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email for password reset:', email);
    };

    return (
        <div className="container">
            <img src="images/coffee.png" alt="コーヒーカップ" className="coffee-icon" />
            <h1>パスワードを忘れた</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="登録したメールを入力してください"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <button type="submit" className="btn">送信</button>
            </form>
            <p><a href="dangnhap.js">ログインページに戻る</a></p>
        </div>
    );
}

export default ForgotPassword;
