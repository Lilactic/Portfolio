const menu = document.querySelector('#mobile-menu');
const menu__links = document.querySelector('.navbar__menu');
const menu__wave = document.querySelector('.menu__wave');
const navbar = document.querySelector('.navbar');
const menuCont = document.querySelector('.menu__container');
const wave = document.querySelector('.wave');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menu__links.classList.toggle('active');
    navbar.classList.toggle('active');
    menuCont.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('typing-text');
    const text = ["student.", "programmer.", "food enthusiast.", "cat lover."];
    const typingSpeed = 100; // Time in milliseconds between each character
    const deletingSpeed = 50; // Time in milliseconds between each character deletion
    const pauseBetweenTexts = 2000; // Pause before typing starts and after deleting ends
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = text[textIndex];
        textElement.textContent = currentText.slice(0, charIndex);

        if (!isDeleting && charIndex < currentText.length) {
            // Typing phase
            charIndex++;
            setTimeout(type, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            // Deleting phase
            charIndex--;
            setTimeout(type, deletingSpeed);
        } else if (!isDeleting && charIndex === currentText.length) {
            // Start deleting after typing the full text
            isDeleting = true;
            setTimeout(type, pauseBetweenTexts);
        } else if (isDeleting && charIndex === 0) {
            // Move to the next text after deleting
            isDeleting = false;
            textIndex = (textIndex + 1) % text.length; // Loop back to start if at the end
            setTimeout(type, pauseBetweenTexts);
        }
    }

    setTimeout(type, 2000); // Initial delay before starting typing
});

function updateNavbarColor() {
  if (!navbar || !wave) return;

  const waveRect = wave.getBoundingClientRect();

  // "completely reached the top" = the wave's top is at/above the top of viewport
  const reachedTop = waveRect.bottom <= 0;

  navbar.classList.toggle('navbar--white', reachedTop);
}

updateNavbarColor();
window.addEventListener('scroll', updateNavbarColor, { passive: true });
window.addEventListener('resize', updateNavbarColor);