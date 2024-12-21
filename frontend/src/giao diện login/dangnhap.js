document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.className = 'container';

    const img = document.createElement('img');
    img.src = 'images/coffee.png';
    img.alt = 'コーヒーカップ';
    img.className = 'coffee-icon';

    const h1 = document.createElement('h1');
    h1.textContent = 'ログイン';

    const form = document.createElement('form');
    form.action = '#';
    form.method = 'POST';

    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.placeholder = 'メールか電話番号';
    inputEmail.name = 'email';
    inputEmail.required = true;

    const inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.placeholder = 'パスワード';
    inputPassword.name = 'password';
    inputPassword.required = true;

    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'btn';
    button.textContent = 'ログイン';

    form.appendChild(inputEmail);
    form.appendChild(inputPassword);
    form.appendChild(button);

    const forgotPassword = document.createElement('p');
    forgotPassword.innerHTML = '<a href="quenmatkhau.js">パスワードを忘れた方はこちら</a>';

    const register = document.createElement('p');
    register.innerHTML = 'アカウントがない方は<a href="dangky.js">登録</a>';

    container.appendChild(img);
    container.appendChild(h1);
    container.appendChild(form);
    container.appendChild(forgotPassword);
    container.appendChild(register);

    document.body.appendChild(container);
});
