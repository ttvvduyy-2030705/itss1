import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/styles.css';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        navigate('/dashboard'); 
    };

    return (
        <div className="container">
            <img src="images/coffee.png" alt="コーヒーカップ" className="coffee-icon" />
            <h1>ログイン</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="メールか電話番号"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="パスワード"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="btn">ログイン</button>
            </form>
            <p><a href="quenmatkhau.js">パスワードを忘れた方はこちら</a></p>
            <p>アカウントがない方は<a href="dangky.js">登録</a></p>
        </div>
    );
}

export default Login;
