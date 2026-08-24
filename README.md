# Draps & Douceurs — Site

Ce dépôt contient le site statique et un petit serveur Node.js optionnel qui expose un endpoint `/api/instagram` pour récupérer les médias via l'API Instagram Graph.

Structure:
- index.html — page principale
- css/styles.css — styles
- assets/logo.svg — logo (placeholder)
- server/instagram-fetch.js — serveur Express (optionnel)
- package.json — dépendances pour le serveur

Installation et lancement (optionnel, pour intégrer Instagram dynamiquement):

1. Installer les dépendances:

```bash
npm install
```

2. Configurer les variables d'environnement (si vous avez un token):

- INSTAGRAM_ACCESS_TOKEN — token Instagram (Basic Display / Graph API)
- INSTAGRAM_USER_ID — id utilisateur Instagram (numeric)

3. Lancer le serveur:

```bash
npm start
```

Puis ouvrez http://localhost:3000

Notes:
- Si vous ne souhaitez pas utiliser le serveur, le site fonctionne en version statique. Placez les images et mettez à jour `index.html` manuellement.
- Pour obtenir un token Instagram, suivez la documentation officielle: https://developers.facebook.com/docs/instagram-api
