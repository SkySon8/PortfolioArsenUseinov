// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Fade-up animation observer
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// ============ PORTFOLIO DATA ============
// Данные для игровых каналов (замените ссылки на логотипы и URL каналов)
const gamingData = [
    { 
        title: "Restl", 
        description: "Игровой блогер", 
        logo: "images/restll.jpg",
        link: "https://youtube.com/@restlgamer" 
    },
    { 
        title: "SCORTY", 
        description: "Игровой блогер", 
        logo: "images/scortyy.jpg",
        link: "https://youtube.com/@scorty" 
    },
    { 
        title: "Tofleks", 
        description: "Игровой блогер", 
        logo: "images/toflekss.jpg",
        link: "https://youtube.com/@tofleks" 
    }
];

// Данные для рилсов (5 штук) - вертикальные видео 9:16
// ВСТАВЬТЕ ВАШИ ССЫЛКИ НА VK ВИДЕО
const reelsData = [
    { 
        title: "Venezia Palace", 
        description: "Атмосферный рилс о роскошном отеле в Анталии. Плавный монтаж, цветокоррекция, динамичная подача.", 
        videoUrl: "https://vk.com/clip_ext.php?oid=-237762511&id=456239017&autoplay=1"
    },
    { 
        title: "Виды медитации", 
        description: "Спокойный рилс о гармонии и осознанности. Плавный монтаж, природные тона, атмосфера умиротворения.", 
        videoUrl: "https://vk.com/video_ext.php?oid=-XXXXXXXXX&id=XXXXXXXXX&hash=xxxxxx"
    },
    { 
        title: "Подборка с WB", 
        description: "Динамичный рилс с обзором товаров с Wildberries. Быстрый монтаж, яркая цветокоррекция, акценты на деталях.", 
        videoUrl: "https://vk.com/video_ext.php?oid=-XXXXXXXXX&id=XXXXXXXXX&hash=xxxxxx"
    },
    { 
        title: "Получение визы", 
        description: "Полезный рилс с пошаговой инструкцией. Чёткий монтаж, текстовая поддержка, визуальные акценты на ключевых этапах.", 
        videoUrl: "https://vk.com/video_ext.php?oid=-XXXXXXXXX&id=XXXXXXXXX&hash=xxxxxx"
    },
    { 
        title: "Тур в Турцию", 
        description: "Атмосферный рилс о путешествии мечты. Плавный монтаж, тёплая цветокоррекция, кадры моря, солнца и отдыха.", 
        videoUrl: "https://vk.com/video_ext.php?oid=-XXXXXXXXX&id=XXXXXXXXX&hash=xxxxxx"
    }
];

// Данные для клипов (1 штука) - горизонтальные видео 16:9
const clipsData = [
    { 
        title: "Три дня дождя | Fan tribute", 
        description: "Фан-клип, созданный как признание в любви к творчеству группы. Эмоциональный монтаж, атмосфера концертов, цветокоррекция под настроение трека.", 
        videoUrl: "https://vk.com/video_ext.php?oid=-XXXXXXXXX&id=XXXXXXXXX&hash=xxxxxx"
    }
];

// Render portfolio
function renderPortfolio(category = 'all') {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    let html = '';

    if (category === 'all') {
        html += renderReels();
        html += renderClips();
    } else if (category === 'reels') {
        html = renderReels();
    } else if (category === 'clips') {
        html = renderClips();
    } else if (category === 'gaming') {
        html = renderGaming();
    }

    grid.innerHTML = html;

    document.querySelectorAll('.portfolio-card, .gaming-card').forEach((card, idx) => {
        card.style.animationDelay = `${idx * 0.1}s`;
    });
}

function renderReels() {
    let html = '';
    reelsData.forEach((item, index) => {
        html += `
            <div class="portfolio-card portrait-card" data-category="reels">
                <div class="portfolio-video portrait-video">
                    <iframe 
                        src="${item.videoUrl}"
                        frameborder="0"
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock"
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="portfolio-card-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
    });
    return html;
}

function renderClips() {
    let html = '';
    clipsData.forEach((item, index) => {
        html += `
            <div class="portfolio-card landscape-card" data-category="clips">
                <div class="portfolio-video landscape-video">
                    <iframe 
                        src="${item.videoUrl}"
                        frameborder="0"
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock"
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="portfolio-card-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
    });
    return html;
}

function renderGaming() {
    let html = '';
    gamingData.forEach((item, index) => {
        html += `
            <div class="gaming-card" data-category="gaming">
                <img src="${item.logo}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="${item.link}" class="gaming-link" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-youtube"></i> Перейти на канал
                </a>
            </div>
        `;
    });
    return html;
}

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        renderPortfolio(filter);
    });
});

// ============ TESTIMONIALS DATA ============
const testimonialsData = [
    { name: "Анна К.", project: "Блогер", text: "Арсен сделал монтаж для моего YouTube-канала. Результат превзошёл ожидания! Видео получилось динамичным и очень качественным. Рекомендую!" },
    { name: "Михаил С.", project: "Музыкант", text: "Заказывал клип у Арсена. Работа выполнена на высшем уровне, учтены все пожелания. Отдельное спасибо за цветокоррекцию!" },
    { name: "Елена В.", project: "Владелец бренда", text: "Сделали рилсы для Instagram. Очень нравится стиль монтажа, видео собирают много просмотров. Обязательно обращусь ещё!" },
    { name: "Дмитрий П.", project: "Фотограф", text: "Нужно было смонтировать ролик для портфолио. Арсен предложил крутые идеи, сделал качественно и в срок. 10/10!" },
    { name: "Ольга Н.", project: "Танцор", text: "Эдит для танцевального номера получился просто шикарным! Видео смотрится профессионально, монтаж идеально подогнан под музыку." },
    { name: "Сергей К.", project: "Предприниматель", text: "Заказывал корпоративный ролик. Арсен помог с концепцией и монтажом. Результат превзошёл ожидания, спасибо!" }
];

// Render testimonials in swiper
function renderTestimonialsSwiper() {
    const swiperContainer = document.getElementById('testimonialsSwiper');
    if (!swiperContainer) return;

    let html = '';
    testimonialsData.forEach((t, index) => {
        const initials = t.name.charAt(0);
        html += `
            <div class="swiper-slide">
                <div class="testimonial-card" itemscope itemtype="https://schema.org/Review">
                    <div class="stars">★★★★★</div>
                    <p class="testimonial-text" itemprop="reviewBody">"${t.text}"</p>
                    <div class="testimonial-author">
                        <div class="author-avatar">${initials}</div>
                        <div class="author-info">
                            <h4 itemprop="author">${t.name}</h4>
                            <p>${t.project}</p>
                        </div>
                    </div>
                    <meta itemprop="reviewRating" content="5">
                </div>
            </div>
        `;
    });
    swiperContainer.innerHTML = html;

    new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });
}

// ============ INITIALIZATION ============
renderPortfolio('all');
renderTestimonialsSwiper();

setTimeout(() => {
    document.querySelectorAll('.fade-up').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
}, 100);
