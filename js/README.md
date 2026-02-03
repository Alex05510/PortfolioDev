# Structure JavaScript du Portfolio

## 📁 Organisation des fichiers

```
js/
├── index.js          → Version non-modulaire (IIFE) - actuellement utilisée
├── main.js           → Version modulaire ES6 (import/export)
├── three-scene.js    → Gestion de la scène 3D Three.js
├── modal.js          → Gestion de la modale "À propos"
└── navigation.js     → Gestion du menu burger et navigation
```

## 🚀 Deux versions disponibles

### Version 1 : Non-modulaire (actuellement active)
**Fichier :** `js/index.js`
- Utilise des IIFE (Immediately Invoked Function Expressions)
- Fonctionne sans serveur HTTP
- Compatible avec tous les navigateurs
- Chargement : `<script src="js/index.js"></script>`

### Version 2 : Modulaire ES6 (recommandée pour la production)
**Fichier principal :** `js/main.js`
- Architecture modulaire avec import/export
- Code mieux organisé et maintenable
- Nécessite un serveur HTTP pour fonctionner
- Chargement : `<script type="module" src="js/main.js"></script>`

## 📦 Modules disponibles

### `three-scene.js`
Gestion complète de la scène 3D :
- Configuration de Three.js (scène, caméra, renderer)
- Création des géométries (cubes et sphères)
- Animation et couleurs dynamiques
- Interaction avec la souris
- Responsive design

**Fonctions exportées :**
- `initThreeScene()` - Initialise toute la scène 3D

### `modal.js`
Gestion de la modale "À propos" :
- Ouverture/fermeture de la modale
- Gestion du clic extérieur
- Touche Échap pour fermer
- Contrôle du scroll du body

**Fonctions exportées :**
- `initModal()` - Initialise les événements de la modale

### `navigation.js`
Gestion de la navigation et du menu burger :
- Toggle du menu burger
- Fermeture au clic sur un lien
- Fermeture au clic extérieur
- Gestion de l'accessibilité (aria-expanded)

**Fonctions exportées :**
- `initNavigation()` - Initialise la navigation

## 🔄 Comment passer à la version modulaire

1. **Modifier index.html :**
```html
<!-- Remplacer -->
<script src="js/index.js"></script>

<!-- Par -->
<script type="module" src="js/main.js"></script>
```

2. **Lancer un serveur HTTP :**
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Avec PHP
php -S localhost:8000
```

3. **Accéder au site :**
```
http://localhost:8000
```

## ⚙️ Avantages de chaque version

### Version non-modulaire (index.js)
✅ Fonctionne directement en ouvrant index.html  
✅ Pas besoin de serveur  
✅ Compatible IE11  
❌ Code moins maintenable  
❌ Pas de séparation des responsabilités  

### Version modulaire (main.js)
✅ Code mieux organisé  
✅ Réutilisabilité des modules  
✅ Meilleure maintenabilité  
✅ Facilite les tests  
❌ Nécessite un serveur HTTP  
❌ Ne fonctionne pas avec file://  

## 📝 Notes

- Les deux versions ont exactement les mêmes fonctionnalités
- La version modulaire est recommandée pour le développement et la production
- La version non-modulaire est utile pour les tests rapides sans serveur
