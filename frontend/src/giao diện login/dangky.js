document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.className = 'container';

    const img = document.createElement('img');
    img.src = 'images/coffee.png';
    img.alt = 'コーヒーカップ';
    img.className = 'coffee-icon';

    const h1 = document.createElement('h1');
    h1.textContent = '登録';

    const form = document.createElement('form');
    form.action = '#';
    form.method = 'POST';

    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.placeholder = '名前';
    inputName.name = 'fullname';
    inputName.required = true;

    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.placeholder = 'メール';
    inputEmail.name = 'email';
    inputEmail.required = true;

    const inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.placeholder = 'パスワード';
    inputPassword.name = 'password';
    inputPassword.required = true;

    const inputConfirmPassword = document.createElement('input');
    inputConfirmPassword.type = 'password';
    inputConfirmPassword.placeholder = 'パスワード確認';
    inputConfirmPassword.name = 'confirm_password';
    inputConfirmPassword.required = true;

    const checkboxDiv = document.createElement('div');
    checkboxDiv.className = 'checkbox';

    const inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.id = 'terms';
    inputCheckbox.name = 'terms';
    inputCheckbox.required = true;

    const label = document.createElement('label');
    label.htmlFor = 'terms';
    label.innerHTML = '私は<a href="dieukhoansudung.js">利用規約</a>を読みました';

    checkboxDiv.appendChild(inputCheckbox);
    checkboxDiv.appendChild(label);

    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'btn';
    button.textContent = '登録';

    form.appendChild(inputName);
    form.appendChild(inputEmail);
    form.appendChild(inputPassword);
    form.appendChild(inputConfirmPassword);
    form.appendChild(checkboxDiv);
    form.appendChild(button);

    const paragraph = document.createElement('p');
    paragraph.innerHTML = 'アカウントがありますか？<a href="dangnhap.js">ログイン</a>';

    container.appendChild(img);
    container.appendChild(h1);
    container.appendChild(form);
    container.appendChild(paragraph);

    document.body.appendChild(container);
});
