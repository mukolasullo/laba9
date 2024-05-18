// Очікування завантаження DOM
document.addEventListener('DOMContentLoaded', function () {
    // Запит до сервера за списком собак
    fetch('https://usersdogs.dmytrominochkin.cloud/dogs')
        .then(response => response.json())
        .then(dogs => {
            const dogsList = document.getElementById('dogs-list');
            // Створення елементів списку
            dogs.forEach(dog => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <img src="https://usersdogs.dmytrominochkin.cloud${dog.dogImage}" alt="${dog.title}">
                    <p>${dog.title}</p>
                    <p>${dog.sex}</p>`;
                // Додавання обробника подій для відкриття модального вікна
                listItem.addEventListener('click', () => {
                    const modal = document.getElementById('dog-modal');
                    const modalContent = modal.querySelector('.modal-content');
                    modalContent.innerHTML = `
                        <button class="modal-close">&times;</button>
                        <h2>${dog.title}</h2>
                        <img src="https://usersdogs.dmytrominochkin.cloud${dog.dogImage}" alt="${dog.title}">
                        <p>Стать: ${dog.sex}</p>
                        <p>Вік: ${dog.age}</p>
                        <p>${dog.description}</p>`;
                    // Логіка для відображення модального вікна
                    modal.style.display = 'flex';
                    // Додавання обробника подій для закриття модального вікна
                    modal.querySelector('.modal-close').addEventListener('click', () => {
                        modal.style.display = 'none';
                    });
                });
                dogsList.appendChild(listItem);
            });
        });

    // Логіка для закриття модального вікна при натисканні на фон
    const modal = document.getElementById('dog-modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
