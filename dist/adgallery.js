/**
 * AdGalleryJs
 * OnePage Gallery with Zoom image
 *
 * @version     0.1 Alpha
 * @category    Javascript
 * @author      DESSI Alain <contact@alain-dessi.com>
 * @copyright   2016 Dessi Alain
 * @link        http://www.alain-dessi.com
 */

function AdGallery(ContainerGallery, options)
{
    // ----------------------------------------------------------------
    // - Options
    // ----------------------------------------------------------------
    var padding          = options.padding || 200;
    var topPadding       = options.topPadding || padding / 2;
    var bottomPadding    = options.bottomPadding || padding / 2;
    var imgSpacing       = options.imgSpacing || 8;
    var zoom             = options.zoom || false;
    var wheelControl     = options.wheelControl || true;
    var showZoomCloseBtn = options.showZoomCloseBtn || true;
    var showZoomNavBtn   = options.showZoomNavBtn || true;

    padding = topPadding + bottomPadding;

    // ----------------------------------------------------------------
    // - Initialisation
    // ----------------------------------------------------------------
    var gallery             = document.querySelector(ContainerGallery);
    var galleryImgContainer = gallery.querySelector('ul');
    var galleryImgs         = gallery.querySelectorAll('li img');
    var btnGalleryPrev      = document.querySelector('.adgallery-left');
    var btnGalleryNext      = document.querySelector('.adgallery-right');
    var PositionCounter     = 0;
    var actualImage         = null;

    // ----------------------------------------------------------------
    // - Start AdGallery
    // ----------------------------------------------------------------
    document.onreadystatechange = function() {
        if(document.readyState == 'complete') {
            resizeImgHeight();
            if(zoom) {
                activateZoomImage();
            }
        }
    };
    // ----------------------------------------------------------------
    // - Gestions des évenements
    // ----------------------------------------------------------------

    // Redimensionnement de la fenetre
    window.addEventListener('resize', resizeImgHeight, false);

    // Boutons de navigation
    btnGalleryPrev.addEventListener('click', previousImage, false);
    btnGalleryNext.addEventListener('click', nextImage, false);

    // Molette de la souris
    gallery.addEventListener("mousewheel", mouseWheelHandler);
    gallery.addEventListener("DOMMouseScroll", mouseWheelHandler);


    // ----------------------------------------------------------------
    // - Fonctions relative à la gallerie
    // ----------------------------------------------------------------

    /**
     * Redimensionnement des images suivant hauteur
     * de la fenetre du navigateur
     * @return {Boolean}
     */
    function resizeImgHeight()
    {
        // récupération de la taille écran
        var winWidth   = window.innerWidth;
        var winHeight  = window.innerHeight;

        var widthImagesContainer = 0;

        // Calcul de la hauteur de l'image
        var imgHeight  = winHeight - (padding);

        // application des tailles
        for (var i = 0; i < galleryImgs.length; i++) {
            // définition de la hauteur et largeur des images
            var imgNaturalHeight  = parseInt(galleryImgs[i].naturalHeight);
            var imgNaturalWidth   = parseInt(galleryImgs[i].naturalWidth);

            // calcul de la nouvelle largeur
            var ImgNewSizePercent = (imgHeight - imgNaturalHeight) / imgNaturalHeight;
            var imgWidth = Math.trunc(imgNaturalWidth + (imgNaturalWidth * ImgNewSizePercent));

            widthImagesContainer = widthImagesContainer + imgWidth + 20 + imgSpacing;
            console.log('[' + i + ']% :' + ImgNewSizePercent + ' width:' + galleryImgs[i].naturalHeight);
            // application de la nouvelle tailles aux images
            galleryImgs[i].style.height  = imgHeight + 'px';
            galleryImgs[i].style.width   = imgWidth + 'px';
            galleryImgs[i].style.marginLeft   = imgSpacing + 'px';
        }
        // var realPadding = Math.trunc((winHeight - imgHeight) / 2);
        gallery.style.paddingTop = topPadding + 'px';
        galleryImgContainer.style.width = widthImagesContainer + 'px';
        // console.log(parseInt(widthImagesContainer));

        return true;
    };

   /**
    * Image précedente
    * @return {boolean}
    */
    function previousImage()
    {
        // récupération de l'offset de l'image
        var positionLeft = galleryImgContainer.offsetLeft;

        if(PositionCounter > 0) {
            PositionCounter = PositionCounter - 1;
            var translateX = -(galleryImgs[PositionCounter].offsetLeft - imgSpacing);
            galleryImgContainer.style.transform = 'translateX(' + translateX + 'px)';
        }
        return true;
    }

   /**
    * Image suivante
    * @return {boolean} [description]
    */
    function nextImage()
    {
        // récupération de l'offset de l'image
        var positionLeft = galleryImgContainer.offsetLeft;

        if(PositionCounter < galleryImgs.length - 1) {
          PositionCounter = PositionCounter + 1;
          var translateX = -(galleryImgs[PositionCounter].offsetLeft - imgSpacing);
          galleryImgContainer.style.transform = 'translateX(' + translateX + 'px)';
        }
        return true;
    }

   /**
    * Handler de la molette
    */
    function mouseWheelHandler(e)
    {
        var e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        if(delta >0) {
            nextImage(e);
        } else {
            previousImage(e);
        }
        return false;
    }

    // ----------------------------------------------------------------
    // - Zoom image
    // ----------------------------------------------------------------

   /**
    * Active la gestion du zoom
    * @return {boolean}
    */
    function activateZoomImage()
    {
        // Click sur les images
        for (var i = 0; i < galleryImgs.length; i++) {
          galleryImgs[i].addEventListener('click',function()
          {
              if(document.querySelector('.adgallery-zoom') === null ) {
                  insertZoomWindow()
              }
              displayZoomImage(this);
          });
        }
        return true;
    }

   /**
    * Affiche l'image
    * @param  jqueryElements imageObject
    * @return {boolean}
    */
    function displayZoomImage(imageObject)
    {
        if(imageObject != '') {
            actualImage = imageObject;

            // récupération de la taille écran
            var winWidth   = window.innerWidth;
            var winHeight  = window.innerHeight;

            // récupére la taille des images
            var zoomImgNaturalHeight  = actualImage.naturalHeight;
            var zoomImgNaturalWidth   = actualImage.naturalWidth;

            var zoomImgHeight = zoomImgNaturalHeight;
            var zoomImgWidth  = zoomImgNaturalWidth;

            if(zoomImgNaturalWidth > winWidth || zoomImgNaturalHeight > winHeight) {
                if(zoomImgNaturalHeight > winHeight) {
                    zoomImgHeight = winHeight - 30;
                    // calcul de la nouvelle largeur
                    zoomImgNewSizePercent = (zoomImgHeight - zoomImgNaturalHeight) / zoomImgNaturalHeight;
                    zoomImgWidth = Math.round(zoomImgNaturalWidth + (zoomImgNaturalWidth * zoomImgNewSizePercent));
                }
            }
            var zoomImage = document.querySelector('#zoom-image');
            var imgUrl = actualImage.getAttribute('src');
            zoomImage.setAttribute('src', imgUrl);
            zoomImage.style.height  = zoomImgHeight + 'px';
            zoomImage.style.width   = zoomImgWidth + 'px';
            zoomImage.style.width   = zoomImgWidth + 'px';
            zoomImage.style.position = 'absolute';
            var positionTop  = (winHeight - zoomImgHeight) / 2;
            var positionLeft = (winWidth - zoomImgWidth) / 2;
            zoomImage.style.top  = positionTop + 'px';
            zoomImage.style.left = positionLeft + 'px';
        }
        return true;
    }

    /**
     * Insertion html fenetre zoom
     * @return {boolean}
     */
    function insertZoomWindow()
    {
        // container
        var newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'adgallery-zoom');
        var page = document.querySelector('body');
        page.appendChild(newDiv);
        // Fnd container & zone de click de fermeture
        var fndZoom = document.createElement('span');
        fndZoom.setAttribute('id', 'zoom-bck');
        var zoomContainer = document.querySelector('.adgallery-zoom');
        zoomContainer.appendChild(fndZoom);
        // Image
        var imgZoom = document.createElement('img');
        imgZoom.setAttribute('src', 'no-image');
        imgZoom.setAttribute('id', 'zoom-image');
        var zoomContainer = document.querySelector('.adgallery-zoom');
        zoomContainer.appendChild(imgZoom);


        // Boutons de Navigation
        if(showZoomNavBtn) {
            // BtnLeft
            var btnLeft = document.createElement('div');
            btnLeft.setAttribute('class', 'zoom-nav nav-left');
            var zoomContainer = document.querySelector('.adgallery-zoom');
            zoomContainer.appendChild(btnLeft);
            // BtnLeft
            var btnRight = document.createElement('div');
            btnRight.setAttribute('class', 'zoom-nav nav-right');
            var zoomContainer = document.querySelector('.adgallery-zoom');
            zoomContainer.appendChild(btnRight);

            // Click sur le bouton précedent
            var buttonLeft = document.querySelector('.nav-left');
            buttonLeft.addEventListener('click', previousImageZoom, false);

            // Click sur le bouton close
            var buttonRight = document.querySelector('.nav-right');
            buttonRight.addEventListener('click', nextImageZoom, false);
        }

        // Bouton de fermeture
        if(showZoomCloseBtn) {
            var btnClose = document.createElement('div');
            btnClose.setAttribute('class', 'zoom-nav nav-close');
            var zoomContainer = document.querySelector('.adgallery-zoom');
            zoomContainer.appendChild(btnClose);

            // Click sur le bouton de fermeture
            var buttonClose = document.querySelector('.nav-close');
            buttonClose.addEventListener('click', removeZoomWindow, false);
        }

        // Click sur le fnd fenetre zoom
        var zoomWindowBck = document.querySelector('#zoom-bck');
        zoomWindowBck.addEventListener('click', removeZoomWindow, false);

        // Click sur l'image
        var zoomImage = document.querySelector('#zoom-image');
        zoomImage.addEventListener('click', nextImageZoom, false);

        return true;
    }

    /**
     * Fermeture de la fenêtre de zoom
     * @return {boolean}
     */
    function removeZoomWindow()
    {
        var page    = document.querySelector('body');
        var divZoom = document.querySelector('.adgallery-zoom');
        page.removeChild(divZoom);

        return true;
    }

    /**
      * Recherche de l'image Suivante
      * @return {boolean}
      */
    function nextImageZoom()
    {
        var parent = actualImage.parentNode;
        var parent = parent.nextSibling;
        var nextImage = parent.nextSibling.firstElementChild;
        displayZoomImage(nextImage);

        return true;
    }

    /**
      * Recherche de l'image Precedente
      * @return {boolean}
      */
    function previousImageZoom()
    {
        var parent = actualImage.parentNode;
        var parent = parent.previousSibling;
        var previousImage = parent.previousSibling.firstElementChild;
        console.log(parent);
        console.log(previousImage);
        displayZoomImage(previousImage);

        return true;
    }

};
