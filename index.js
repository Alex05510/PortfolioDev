const container = document.getElementById('canvas-container');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Création d'une géométrie composée de plusieurs cubes
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

        scene.add(group);

        // Lumières
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xff6b6b, 1, 100);
        pointLight1.position.set(5, 5, 5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x4ecdc4, 1, 100);
        pointLight2.position.set(-5, -5, 5);
        scene.add(pointLight2);

        camera.position.z = 5;

        // Variables pour l'interaction souris
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Changement de couleur au scroll
        window.addEventListener('scroll', () => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            
            // Interpoler entre différentes couleurs
            const hue = scrollPercent * 360; // De 0 à 360 degrés
            const color = new THREE.Color(`hsl(${hue}, 70%, 60%)`);
            
            // Appliquer la couleur au matériau des cubes
            material.color = color;
            
            // Changer aussi la couleur des sphères
            sphereMaterial.color = color;
            sphereMaterial.emissive = color;
        });

        // Animation
        function animate() {
            requestAnimationFrame(animate);

            // Rotation automatique
            group.rotation.x += 0.005;
            group.rotation.y += 0.005;

            // Suivre la souris avec un effet de lissage
            targetX = mouseX * 0.3;
            targetY = mouseY * 0.3;
            
            group.rotation.y += (targetX - group.rotation.y) * 0.05;
            group.rotation.x += (targetY - group.rotation.x) * 0.05;

            // Animer les sphères
            const time = Date.now() * 0.001;
            group.children.forEach((child, i) => {
                if (child.geometry.type === 'SphereGeometry') {
                    const angle = (i / 8) * Math.PI * 2 + time;
                    child.position.x = Math.cos(angle) * 2;
                    child.position.y = Math.sin(angle) * 2;
                    child.position.z = Math.sin(time + i) * 1;
                }
            });

            renderer.render(scene, camera);
        }

        animate();

        // Responsive
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });