document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.className = 'container';

    const img = document.createElement('img');
    img.src = 'images/coffee.png';
    img.alt = 'コーヒーカップ';
    img.className = 'coffee-icon';

    const h1 = document.createElement('h1');
    h1.textContent = 'パスワードを忘れた';

    const form = document.createElement('form');
    form.action = '#';
    form.method = 'POST';

    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.placeholder = '登録したメールを入力してください';
    inputEmail.name = 'email';
    inputEmail.required = true;

    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'btn';
    button.textContent = '送信';

    form.appendChild(inputEmail);
    form.appendChild(button);

    const paragraph = document.createElement('p');
    paragraph.innerHTML = '<a href="dangnhap.js">ログインページに戻る</a>';

    container.appendChild(img);
    container.appendChild(h1);
    container.appendChild(form);
    container.appendChild(paragraph);

    document.body.appendChild(container);
});
