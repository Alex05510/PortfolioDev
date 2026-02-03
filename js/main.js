/**
 * Point d'entrée principal de l'application
 * Initialise tous les modules
 */

import { initThreeScene } from './three-scene.js';
import { initModal } from './modal.js';
import { initNavigation } from './navigation.js';

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    initThreeScene();
    initModal();
    initNavigation();
});
