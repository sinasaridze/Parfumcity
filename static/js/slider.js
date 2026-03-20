// slider.js - универсальный компонент слайдера

class ImageSlider {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.slides = this.container.querySelectorAll('.slider-slide');
        this.prevBtn = this.container.querySelector('.slider-btn.prev');
        this.nextBtn = this.container.querySelector('.slider-btn.next');
        this.dotsContainer = this.container.querySelector('.slider-dots');
        this.slidesWrapper = this.container.querySelector('.slider-slides');
        
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoplay = options.autoplay || false;
        this.interval = options.interval || 5000;
        this.timer = null;
        
        this.init();
    }
    
    init() {
        if (this.totalSlides === 0) return;
        
        // Создаем индикаторы
        this.createDots();
        
        // Добавляем обработчики событий
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Запускаем автоплей если нужно
        if (this.autoplay) {
            this.startAutoplay();
            this.container.addEventListener('mouseenter', () => this.stopAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());
        }
        
        // Показываем первый слайд
        this.goToSlide(0);
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            dot.dataset.index = i;
            
            dot.addEventListener('click', () => {
                this.goToSlide(i);
            });
            
            this.dotsContainer.appendChild(dot);
        }
        
        this.dots = this.dotsContainer.querySelectorAll('.slider-dot');
    }
    
    goToSlide(index) {
        if (index < 0) {
            index = this.totalSlides - 1;
        } else if (index >= this.totalSlides) {
            index = 0;
        }
        
        this.currentIndex = index;
        
        // Прокручиваем слайды
        if (this.slidesWrapper) {
            this.slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
        }
        
        // Обновляем индикаторы
        if (this.dots) {
            this.dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
    
    next() {
        this.goToSlide(this.currentIndex + 1);
    }
    
    prev() {
        this.goToSlide(this.currentIndex - 1);
    }
    
    startAutoplay() {
        if (this.autoplay && !this.timer) {
            this.timer = setInterval(() => {
                this.next();
            }, this.interval);
        }
    }
    
    stopAutoplay() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}

// Функция для инициализации всех слайдеров на странице
function initSliders() {
    // Инициализация слайдера в Hero секции
    const heroSlider = new ImageSlider('hero-slider', {
        autoplay: true,
        interval: 5000
    });
    
    // Инициализация слайдера в About секции
    const aboutSlider = new ImageSlider('about-slider', {
        autoplay: false
    });
    
    // Инициализация слайдера в Atmosphere секции
    const atmosphereSlider = new ImageSlider('atmosphere-slider', {
        autoplay: true,
        interval: 4000
    });
}

// Экспортируем для использования в main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ImageSlider, initSliders };
}