/* ============================================
   Jay Hua — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    if (navbar && !navbar.classList.contains('navbar-solid')) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => navMenu.classList.remove('open'));
        });
    }

    // --- Filter buttons ---
    document.querySelectorAll('.filter-bar').forEach(bar => {
        const buttons = bar.querySelectorAll('.filter-btn');
        const section = bar.parentElement;
        const grid = section.querySelector('.articles-grid, .reports-grid, .gallery-grid');

        if (!grid) return;

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                const items = grid.children;

                Array.from(items).forEach(item => {
                    if (filter === 'all') {
                        item.style.display = '';
                    } else {
                        const categories = item.dataset.category || '';
                        item.style.display = categories.includes(filter) ? '' : 'none';
                    }
                });
            });
        });
    });

    // --- Scroll-triggered fade-in ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.info-card, .article-card, .report-card, .preview-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeObserver.observe(el);
    });

    // --- Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxClose = document.getElementById('lightboxClose');

    if (lightbox && lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            lightboxContent.innerHTML = '';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                lightboxContent.innerHTML = '';
            }
        });

        // ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                lightboxContent.innerHTML = '';
            }
        });
    }

    // --- Language toggle on report cards ---
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const cardId = btn.dataset.card;
            const lang = btn.dataset.lang;

            // Update active button
            document.querySelectorAll(`.lang-btn[data-card="${cardId}"]`).forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update title
            const title = document.querySelector(`.report-title[data-card="${cardId}"]`);
            if (title && title.dataset[lang]) {
                title.textContent = title.dataset[lang];
            }

            // Update excerpt
            const excerpt = document.querySelector(`.report-excerpt[data-card="${cardId}"]`);
            if (excerpt && excerpt.dataset[lang]) {
                excerpt.textContent = excerpt.dataset[lang];
            }

            // Update link
            const link = document.querySelector(`.report-link[data-card="${cardId}"]`);
            if (link && link.dataset[lang]) {
                link.href = link.dataset[lang];
                link.textContent = lang === 'zh' ? '阅读报告 →' : 'Read Report →';
            }
        });
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
