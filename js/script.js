document.addEventListener('DOMContentLoaded', () => {
    // Получаем необходимые элементы HTML
    const contentDiv = document.querySelector('.content');
    const navLinks = document.querySelectorAll('.nav-link');
    const loadingOverlay = document.querySelector('.loading-overlay');


    // Функция показа Overlay
    const showLoadingOverlay = () => {
        loadingOverlay.style.opacity = '1';
    };
    // Функция спрятать Overlay
    const hideLoadingOverlay = () => {
        loadingOverlay.style.opacity = '0';
    };
    // ЧТо бы мы могли взаимодейтсвовать с элементами страницы после загрузки
    const loadScript = (url) => {
        if (url.includes('favourites')) {
            // здесь пишем всю логику кнопок, сладеров и других скриптов
        }
    };


    // Основная функция
    const loadPage = (url) => {
        showLoadingOverlay();
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newContent = doc.querySelector('.content').innerHTML;

                // Скрываем контент при загрузке страницы
                contentDiv.classList.add('fade-out');
                // Заменяем один html код на другой
                contentDiv.innerHTML = newContent;
                document.title = doc.title;

                // 
                setTimeout(() => {
                    contentDiv.classList.remove('fade-out');
                    history.pushState({}, '', url);
                    hideLoadingOverlay();
                }, 500);
            })
            .then(() => {
                loadScript(url);
            });
    };

    // Обработчик
    navLinks.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const url = e.currentTarget.getAttribute('href');
            loadPage(url);
        });
    });

    // Зашрузка страницы
    loadPage(window.location.pathname);
    // При смене URL запускаем loadPage
    window.addEventListener('popstate', () =>{
        loadPage(window.location.pathname);
    });
});