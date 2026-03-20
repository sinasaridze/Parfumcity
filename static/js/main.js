document.addEventListener('DOMContentLoaded', function() {
    console.log('ParfumCity парфюмерный бутик загружен');
    
    // Плавная прокрутка для навигации
    document.querySelectorAll('.nav-item a, .btn-telegram[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Проверяем, это якорная ссылка или внешняя ссылка
            if (!targetId.startsWith('#') || targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Плавная прокрутка
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Обновляем активный пункт меню
                updateActiveNavItem(targetId);
            }
        });
    });
    
    // Функция обновления активного пункта меню
    function updateActiveNavItem(targetId) {
        document.querySelectorAll('.nav-item a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
    
    // Автоматическое обновление активного пункта при скролле
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        // Используем debounce для оптимизации
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 120;
            
            let currentSection = '';
            sections.forEach(section => {
                if (section.offsetTop <= scrollPos) {
                    currentSection = '#' + section.id;
                }
            });
            
            if (currentSection) {
                updateActiveNavItem(currentSection);
            }
        }, 100);
    });
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми секциями
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Инициализируем слайдеры
    if (typeof initSliders === 'function') {
        initSliders();
    }
    
    // Инициализируем активный пункт меню при загрузке
    updateActiveNavItem('#hero');
});

// Подсветка активного языка (дополнительная проверка)
document.addEventListener('DOMContentLoaded', function() {
    // Получаем текущий URL
    const currentPath = window.location.pathname;
    const langLinks = document.querySelectorAll('.lang-link');
    
    // Удаляем класс active у всех ссылок
    langLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Добавляем класс active нужной ссылке
    if (currentPath === '/' || currentPath === '/ru/') {
        document.querySelector('.lang-link[href*="landing_page"]')?.classList.add('active');
    } else if (currentPath.startsWith('/en/')) {
        document.querySelector('.lang-link[href*="landing_page_en"]')?.classList.add('active');
    } else if (currentPath.startsWith('/az/')) {
        document.querySelector('.lang-link[href*="landing_page_az"]')?.classList.add('active');
    }
});

// Подключаем скрипт слайдера
const sliderScript = document.createElement('script');
sliderScript.src = "{% static 'js/slider.js' %}";
sliderScript.onload = function() {
    if (typeof initSliders === 'function') {
        initSliders();
    }
};
document.head.appendChild(sliderScript);