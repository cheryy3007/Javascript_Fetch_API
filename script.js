const kartochki = document.getElementById("kartochki");
const btn = document.getElementById("daynight");
const input = document.getElementById("input");
const search = document.getElementById("search");

let users = []; // Глобальная переменная для хранения данных

fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
        users = data; // Сохраняем пользователей в глобальную переменную
        renderUsers(users);
    });

function renderUsers(usersArray) {
    kartochki.innerHTML = ""; // Очищаем контейнер
    usersArray.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${user.name}</h3>
            <p>📧 ${user.email}</p>
            <p>📞 ${user.phone}</p>
            <p>🏠 ${user.address.city}, ${user.address.street}</p>
        `;
        kartochki.appendChild(card);
    });
}

function searchUsers() {
    const searchQuery = input.value.toLowerCase();
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery)
    );
    renderUsers(filteredUsers);
}

input.addEventListener("input", searchUsers);

btn.addEventListener("click", () => {
    if (document.body.classList.toggle("dark-mode")) {
        btn.textContent = " Light mode☀️";
    } else {
        btn.textContent = " Dark mode🌙";
    }
});
