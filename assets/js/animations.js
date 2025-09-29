document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const percentageText = document.getElementById('percentage');
    const progressBar = document.getElementById('progress-bar'); // New line
    const mainContent = document.querySelectorAll('header, main');

    let currentPercentage = 0;

    const updatePercentage = () => {
        if (currentPercentage <= 100) {
            percentageText.textContent = currentPercentage + '%';
            progressBar.style.width = currentPercentage + '%'; // New line
            currentPercentage++;
        } else {
            clearInterval(interval);
            preloader.classList.add('loaded'); // Fade out preloader

            // Wait for fade out transition to finish
            setTimeout(() => {
                mainContent.forEach(el => {
                    el.classList.add('visible');
                });
            }, 500); // This should match the transition duration in CSS
        }
    };

    const interval = setInterval(updatePercentage, 20); // Adjust speed of loading here
});