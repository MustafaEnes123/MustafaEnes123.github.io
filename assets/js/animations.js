document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    const percentageText = document.getElementById('percentage');
    const progressBar = document.getElementById('progress-bar');
    const mainContent = document.querySelectorAll('header, main, footer');

    let currentPercentage = 0;

    const updatePercentage = () => {
        if (currentPercentage <= 100) {
            percentageText.textContent = currentPercentage + '%';
            progressBar.style.width = currentPercentage + '%';
            currentPercentage++;
        } else {
            clearInterval(interval);
            preloader.classList.add('loaded');

            setTimeout(() => {
                mainContent.forEach(el => {
                    el.classList.add('visible');
                });
                // Start typing effect after content is visible
                if (document.querySelector('.hero-content')) { // Only run on homepage
                    typeOutAll();
                }
            }, 500);
        }
    };

    const interval = setInterval(updatePercentage, 20);

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
});
