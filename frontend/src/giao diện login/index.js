document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.className = 'container';

    const img = document.createElement('img');
    img.src = 'images/coffee.png';
    img.alt = 'コーヒーカップ';
    img.className = 'coffee-icon';

    const h1 = document.createElement('h1');
    h1.textContent = 'Café Compass';

    const loginButton = document.createElement('button');
    loginButton.textContent = 'ログイン';
    loginButton.onclick = () => {
        location.href = 'dangnhap.js';
    };

    const registerButton = document.createElement('button');
    registerButton.textContent = '登録';
    registerButton.onclick = () => {
        location.href = 'dangky.js';
    };

    const googleLoginButton = document.createElement('button');
    googleLoginButton.textContent = 'グーグルでログイン';
    googleLoginButton.onclick = () => {
        location.href = 'https://accounts.google.com/signin';
    };

    const facebookLoginButton = document.createElement('button');
    facebookLoginButton.textContent = 'フェイスブックでログイン';
    facebookLoginButton.onclick = () => {
        location.href = 'https://www.facebook.com/login';
    };

    container.appendChild(img);
    container.appendChild(h1);
    container.appendChild(loginButton);
    container.appendChild(registerButton);
    container.appendChild(googleLoginButton);
    container.appendChild(facebookLoginButton);

    document.body.appendChild(container);
});
