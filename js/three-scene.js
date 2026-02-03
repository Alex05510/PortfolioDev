/**
 * Gestion de la scène 3D avec Three.js
 */

// Configuration de la scène 3D
export function initThreeScene() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Création du groupe principal
    const group = createGeometryGroup();
    scene.add(group);

    // Ajout des lumières
    addLights(scene);

    camera.position.z = 5;

    // Variables pour l'interaction
    const mouseState = {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0
    };

    // Variables pour l'animation de couleur
    const colorState = {
        currentHue: 0,
        targetHue: 60,
        lastChange: Date.now()
    };

    // Événements
    setupMouseEvents(mouseState);
    setupResizeHandler(camera, renderer);

    // Démarrer l'animation
    animate(renderer, scene, camera, group, mouseState, colorState);
}

// Création du groupe de géométries
function createGeometryGroup() {
    const group = new THREE.Group();
    
    // Matériau avec effet wireframe
    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });

    // Créer plusieurs cubes de tailles différentes
    const sizes = [1, 1.5, 2];
    sizes.forEach((size, i) => {
        const geometry = new THREE.BoxGeometry(size, size, size);
        const cube = new THREE.Mesh(geometry, material);
        cube.rotation.x = i * 0.3;
        cube.rotation.y = i * 0.3;
        group.add(cube);
    });

    // Ajouter des sphères aux coins
    addSpheres(group);

    return group;
}

// Ajout des sphères
function addSpheres(group) {
    const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0xff6b6b,
        emissive: 0xff6b6b,
        emissiveIntensity: 0.5
    });

    for (let i = 0; i < 8; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        const angle = (i / 8) * Math.PI * 2;
        sphere.position.set(
            Math.cos(angle) * 2,
            Math.sin(angle) * 2,
            Math.sin(i) * 1
        );
        group.add(sphere);
    }
}

// Ajout des lumières
function addLights(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff6b6b, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4ecdc4, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
}

// Gestion des événements souris
function setupMouseEvents(mouseState) {
    document.addEventListener('mousemove', (e) => {
        mouseState.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseState.y = (e.clientY / window.innerHeight) * 2 - 1;
    });
}

// Gestion du redimensionnement
function setupResizeHandler(camera, renderer) {
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Interpolation de couleur
function updateColor(group, colorState) {
    const now = Date.now();
    const timeSinceChange = now - colorState.lastChange;
    const transitionDuration = 2000;
    
    if (timeSinceChange >= transitionDuration) {
        colorState.lastChange = now;
        colorState.currentHue = colorState.targetHue;
        colorState.targetHue = (colorState.targetHue + 60) % 360;
    }
    
    const progress = Math.min(timeSinceChange / transitionDuration, 1);
    const easedProgress = progress * progress * (3 - 2 * progress);
    let interpolatedHue = colorState.currentHue + (colorState.targetHue - colorState.currentHue) * easedProgress;
    
    // Gérer le passage de 360 à 0
    if (Math.abs(colorState.targetHue - colorState.currentHue) > 180) {
        if (colorState.targetHue > colorState.currentHue) {
            interpolatedHue = colorState.currentHue + ((colorState.targetHue - 360) - colorState.currentHue) * easedProgress;
        } else {
            interpolatedHue = colorState.currentHue + ((colorState.targetHue + 360) - colorState.currentHue) * easedProgress;
        }
    }
    
    const color = new THREE.Color(`hsl(${interpolatedHue % 360}, 70%, 60%)`);
    
    // Appliquer la couleur aux matériaux
    group.children.forEach(child => {
        if (child.material.wireframe) {
            child.material.color = color;
        } else {
            child.material.color = color;
            child.material.emissive = color;
        }
    });
}

// Animation des sphères
function animateSpheres(group, time) {
    group.children.forEach((child, i) => {
        if (child.geometry.type === 'SphereGeometry') {
            const angle = (i / 8) * Math.PI * 2 + time;
            child.position.x = Math.cos(angle) * 2;
            child.position.y = Math.sin(angle) * 2;
            child.position.z = Math.sin(time + i) * 1;
        }
    });
}

// Boucle d'animation principale
function animate(renderer, scene, camera, group, mouseState, colorState) {
    requestAnimationFrame(() => animate(renderer, scene, camera, group, mouseState, colorState));

    // Mise à jour des couleurs
    updateColor(group, colorState);

    // Rotation automatique
    group.rotation.x += 0.005;
    group.rotation.y += 0.005;

    // Suivre la souris avec lissage
    mouseState.targetX = mouseState.x * 0.5;
    mouseState.targetY = mouseState.y * 0.5;
    
    group.rotation.y += (mouseState.targetX - group.rotation.y) * 0.05;
    group.rotation.x += (mouseState.targetY - group.rotation.x) * 0.05;

    // Animer les sphères
    const time = Date.now() * 0.001;
    animateSpheres(group, time);

    renderer.render(scene, camera);
}
