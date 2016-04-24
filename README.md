# AdGalleryJs #
AdGallery est une fonction Javascript qui permet de créer rapidement une galerie de photos pour un site plein écran. Elle est totalement responsive design.

## Demo
[AdGalleryJs Demonstration] (http://www.alain-dessi.com) *Bientôt disponible*

## Installation
Copiez les fichiers **css** et **javascript** dans les répertoires de votre site.

Ajoutez le fichier css dans la section **head**
```html
<link rel="stylesheet" href="VOTRE_CHEMIN/adgallery.min.css">
```

Ajouter le code HTML suivant dans le **body** de votre page
```html
<div id="adgallery">
  <ul>
    <li><img src="imgs/img1.jpg"></li>
    <li><img src="imgs/img2.jpg"></li>
    ...
  </ul>
  <!-- Boutons de navigations -->
  <div class="adgallery-nav adgallery-left"></div>
  <div class="adgallery-nav adgallery-right"></div>
</div>
```

Ajouter le fichier javascript juste avant la balise de fermeture du **body**
```html
<script src="VOTRE_CHEMIN/adgallery.min.js"></script>
```

Pour initialiser la galerie
```js
<script>
    AdGallery( '#adgallery', {
        padding: 120,
        imgSpacing: 16,
        zoom: true,
        wheelControl: true
    });
</script>
```

## Options

La fonction s'initialise de la façon suivante
```js
  AdGallery(HtmlTag, options)
```


Voici la liste des options de configuration, les valeurs sont celles par défaut.
```js
var options = {
    // espacement haut
    topPadding: 100,
    
    // espacement bas
    bottomPadding: 200,
    
    // espacement horizontal entre les images
    imgSpacing: 8,
    
    // Zoom sur click sur les images
    zoom: false,
    
    // Gestion de la molette pour le défilement
    wheelControl: true,
    
    // Ajout d'un bouton de fermeture de fenetre zoom
    showZoomCloseBtn: true,
    
    // Ajout des boutons de navigation sur fenetre zoom
    showZoomNavBtn: true
}
```


## Navigateurs compatible
AdGallery à été testé sur les navigateurs suivant

* Google Chrome
* Mozilla Firefox
* Microsoft Edge


##Licence
Distribué sous la [licence MIT](https://opensource.org/licenses/MIT).