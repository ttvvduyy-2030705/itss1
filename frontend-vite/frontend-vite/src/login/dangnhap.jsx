import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            if (response.status === 200) {
                alert('Login successful');
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(`Invalid email or password: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
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
                <p><a onClick={() => navigate('/forgot-password')}>パスワードを忘れた方はこちら</a></p>
                <p>アカウントがない方は<a onClick={() => navigate('/register')}>登録</a></p>
            </div>
        </div>
    );
}

export default Login;
