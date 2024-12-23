import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function TermsOfService() {
    const navigate = useNavigate();

    return (
        <div className="login-container">
        <div className="container">
            <h1>利用規約</h1>
            <p>ようこそCafé Compassへ！<br />利用する前に、この規約を読んでください。</p>
            <h3>1. ユーザーのルール</h3>
            <p>ユーザーが守るべきルールを書いています。</p>
            <h3>2. プライバシー</h3>
            <p>あなたの情報を大切にします。</p>
            <h3>3. 支払いについて</h3>
            <p>支払いルールについて説明します。</p>
            <p>この規約は変わることがあります。</p>
            <a onClick={() => navigate('/register')}>登録ページに戻る</a>
        </div>
        </div>
    );
}

export default TermsOfService;
