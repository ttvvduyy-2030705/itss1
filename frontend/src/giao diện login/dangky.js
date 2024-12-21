import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/styles.css';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        navigate('/login'); 
    };

    return (
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
                    <label htmlFor="terms">私は<a href="dieukhoansudung.js">利用規約</a>を読みました</label>
                </div>
                <button type="submit" className="btn">登録</button>
            </form>
            <p>アカウントがありますか？<a href="dangnhap.js">ログイン</a></p>
        </div>
    );
}

export default Register;
