# Draps & Douceurs — Site

Ce dépôt contient le site statique et un petit serveur Node.js optionnel qui expose un endpoint `/api/instagram` pour récupérer les médias via l'API Instagram Graph.

Ajout manuel des images Instagram

Vous m'avez fourni 4 images pour intégrer au site. Pour que la galerie s'affiche correctement, copiez ces images dans le répertoire `assets/instagram/` avec les noms suivants :

- 1.jpg  -> parure de lit blanche (photo 1)
- 2.jpg  -> détail broderie initiales / couronne (photo 2)
- 3.jpg  -> peignoir rose brodé "Hajar" (photo 3)
- 4.jpg  -> peignoir beige avec col brodé (photo 4)

Exemple de commande (depuis la racine du repo) :

```bash
mkdir -p assets/instagram
cp /chemin/vers/mes_images/1.jpg assets/instagram/1.jpg
cp /chemin/vers/mes_images/2.jpg assets/instagram/2.jpg
cp /chemin/vers/mes_images/3.jpg assets/instagram/3.jpg
cp /chemin/vers/mes_images/4.jpg assets/instagram/4.jpg
```

Après avoir placé les images, ouvrez `index.html` dans le navigateur (ou exécutez le serveur) — la galerie s'affichera automatiquement.

Si vous préférez, je peux aussi ajouter les images pour vous si vous me fournissez les fichiers ou les données base64.

---

Le reste des instructions d'installation et de lancement se trouvent plus haut dans le README (server, token Instagram, etc.).
