/**
 * Gestion de la modale "À propos"
 */

export function initModal() {
    const modal = document.getElementById('modal-apropos');
    const btnApropos = document.querySelector('a[href="#apropos"]');
    const btnClose = document.querySelector('.modal-close');

    if (!modal) return;

    // Ouvrir la modale
    if (btnApropos) {
        btnApropos.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(modal);
        });
    }

    // Fermer la modale avec le bouton de fermeture
    if (btnClose) {
        btnClose.addEventListener('click', () => {
            closeModal(modal);
        });
    }

    // Fermer la modale en cliquant à l'extérieur
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });

    // Fermer la modale avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal(modal);
        }
    });
}

// Ouvrir la modale
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fermer la modale
function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}
