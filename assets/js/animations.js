document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    const percentageText = document.getElementById('percentage');
    const progressBar = document.getElementById('progress-bar');
    const mainContent = document.querySelectorAll('header, main, footer');
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navMenu = document.getElementById('primary-nav');

    let currentPercentage = 0;
    let revealed = false;
    const MAX_PRELOAD_MS = 2500; // safety fallback

    const updatePercentage = () => {
        try {
            if (currentPercentage <= 100) {
                if (percentageText) percentageText.textContent = currentPercentage + '%';
                if (progressBar) progressBar.style.width = currentPercentage + '%';
                currentPercentage++;
            } else {
                finishPreloader();
            }
        } catch (err) {
            console.error('Preloader error', err);
            finishPreloader();
        }
    };

    const interval = setInterval(updatePercentage, 20);
    setTimeout(() => { if (!revealed) finishPreloader(); }, MAX_PRELOAD_MS);

    function finishPreloader() {
        if (revealed) return;
        revealed = true;
        clearInterval(interval);
        if (preloader) preloader.classList.add('loaded');
        setTimeout(() => {
            mainContent.forEach(el => el.classList.add('visible'));
            // Typing effect disabled by user request
            // if (document.querySelector('.hero-content')) {
            //     try { typeOutAll(); } catch (e) { console.warn('Typing failed', e); }
            // }
        }, 250);
    }

    // Typing effect
    function typeOutAll() {
        const elements = [
            document.querySelector('.hero-content h2'),
            document.querySelector('.hero-content h3'),
            document.querySelector('.hero-content p'),
            document.querySelector('#about h3'),
            document.querySelector('#about p'),
            document.querySelector('#certifications h2'),
            document.querySelector('#contact p')
        ];

        let elementIndex = 0;

        function typeWriter(el, onComplete) {
            if (!el) {
                if (onComplete) onComplete();
                return;
            }
            const text = el.dataset.text || el.textContent;
            el.dataset.text = text;
            el.textContent = '';
            el.classList.add('typing');

            let i = 0;
            function type() {
                if (i < text.length) {
                    el.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 30);
                } else {
                    el.classList.remove('typing');
                    el.classList.add('typed');
                    // Remove cursor after a short delay
                    setTimeout(() => {
                        el.classList.remove('typed');
                    }, 1500);
                    if (onComplete) onComplete();
                }
            }
            type();
        }

        function typeNext() {
            if (elementIndex < elements.length) {
                typeWriter(elements[elementIndex], () => {
                    elementIndex++;
                    typeNext();
                });
            }
        }

        typeNext();
    }

    // Mobile hamburger behavior: toggle aria-expanded, focus management, escape to close, click-outside to close
    try {
        if (hamburgerBtn && navMenu) {
            function closeNav() {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                hamburgerBtn.focus();
            }

            hamburgerBtn.addEventListener('click', function(e) {
                const expanded = this.classList.toggle('active');
                navMenu.classList.toggle('active');
                this.setAttribute('aria-expanded', expanded ? 'true' : 'false');
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                    const firstLink = navMenu.querySelector('a');
                    if (firstLink) firstLink.focus();
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Close on Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    closeNav();
                }
            });

            // Click outside to close
            document.addEventListener('click', function(e) {
                if (!navMenu || !hamburgerBtn) return;
                if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                    closeNav();
                }
            });
        }
    } catch (err) {
        console.warn('Hamburger initialization failed', err);
    }
});
