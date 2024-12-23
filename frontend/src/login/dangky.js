import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Register() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone
                })
            });

            if (response.status === 201) {
                alert('Registration successful');
                navigate('/login');
            } else {
                const errorData = await response.json();
                alert(`Error registering user: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error registering user');
        }
    };

    return (
        <div className="login-container">
        <div className="container">
            <img src="images/coffee.png" alt="コーヒーカップ" className="coffee-icon" />
            <h1>登録</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullname"
                    placeholder="名前"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="メール"
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
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="パスワード確認"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <div className="checkbox">
                    <input
                        type="checkbox"
                        name="terms"
                        id="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="terms">私は<a onClick={() => navigate('/terms')} >利用規約</a>を読みました</label>
                </div>
                <button type="submit" className="btn" onClick={() => navigate('/login')}>登録</button>
            </form>
            <p>アカウントがありますか？<a onClick={() => navigate('/login')}>ログイン</a></p>
        </div>
        </div>
    );
}

export default Register;
