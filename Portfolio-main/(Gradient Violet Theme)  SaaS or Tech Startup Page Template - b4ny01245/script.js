document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    // Theme Toggle State Machine (Dark / Light inversion)
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggle.textContent = '☀️';
            themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeToggle.textContent = '🌙';
            themeToggle.setAttribute('aria-label', 'Toggle light mode');
        }
    });

    // Mobile Hamburger Menu State Machine
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });

    // Close mobile nav when linking to elements
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Contact Form submission visual indicator
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending Matrix Data...';
            submitBtn.style.pointerEvents = 'none';
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                submitBtn.textContent = 'Message Sent Successfully!';
                submitBtn.style.background = 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.pointerEvents = 'auto';
                    submitBtn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    const updateHeaderVisibility = () => {
        if (!header || !homeArea) return;

        if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
            header.classList.remove('header-hidden');
            return;
        }

        const homeBottom = homeArea.offsetTop + homeArea.offsetHeight;
        const shouldHide = window.scrollY > homeBottom - 120;
        header.classList.toggle('header-hidden', shouldHide);
    };

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            updateHeaderVisibility();
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                updateHeaderVisibility();
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
            updateHeaderVisibility();
        });
    }

    window.addEventListener('scroll', updateHeaderVisibility);
    window.addEventListener('load', updateHeaderVisibility);
});
