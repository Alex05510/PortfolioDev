/**
 * Gestion du menu burger et de la navigation
 */

export function initNavigation() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (!burgerMenu || !navMenu) return;

    // Toggle du menu burger
    burgerMenu.addEventListener('click', () => {
        toggleMenu(burgerMenu, navMenu);
    });

    // Fermer le menu lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu(burgerMenu, navMenu);
        });
    });

    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && 
            !burgerMenu.contains(e.target) && 
            navMenu.classList.contains('active')) {
            closeMenu(burgerMenu, navMenu);
        }
    });
}

// Basculer l'état du menu
function toggleMenu(burgerMenu, navMenu) {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    burgerMenu.setAttribute('aria-expanded', burgerMenu.classList.contains('active'));
}

// Fermer le menu
function closeMenu(burgerMenu, navMenu) {
    burgerMenu.classList.remove('active');
    navMenu.classList.remove('active');
    burgerMenu.setAttribute('aria-expanded', 'false');
}
