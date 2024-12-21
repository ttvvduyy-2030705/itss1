document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.className = 'container';

    const h1 = document.createElement('h1');
    h1.textContent = '利用規約';

    const intro = document.createElement('p');
    intro.innerHTML = 'ようこそCafé Compassへ！<br>利用する前に、この規約を読んでください。';

    const section1 = document.createElement('h3');
    section1.textContent = '1. ユーザーのルール';
    const content1 = document.createElement('p');
    content1.textContent = 'ユーザーが守るべきルールを書いています。';

    const section2 = document.createElement('h3');
    section2.textContent = '2. プライバシー';
    const content2 = document.createElement('p');
    content2.textContent = 'あなたの情報を大切にします。';

    const section3 = document.createElement('h3');
    section3.textContent = '3. 支払いについて';
    const content3 = document.createElement('p');
    content3.textContent = '支払いルールについて説明します。';

    const note = document.createElement('p');
    note.textContent = 'この規約は変わることがあります。';

    const link = document.createElement('a');
    link.href = 'dangky.js';
    link.textContent = '登録ページに戻る';

    container.appendChild(h1);
    container.appendChild(intro);
    container.appendChild(section1);
    container.appendChild(content1);
    container.appendChild(section2);
    container.appendChild(content2);
    container.appendChild(section3);
    container.appendChild(content3);
    container.appendChild(note);
    container.appendChild(link);

    document.body.appendChild(container);
});
