/**
 * "Similar Elements" jQuery plug-in
 * @author: Frank LANG (https://github.com/franklang/)
 *
 * Usage: $(document).similarElements( <array of similar elements>, <jQuery event ('click' is default)> );
 * <array of similar elements> parameter is mandatory.
 * ALL elements within <array of similar elements> MUST trigger the EXACT SAME code.
 */
;( function ( $, window, undefined ) {
  $.fn.similarElements = function(options) {

    var defaults = {
      arrayOfSimilarElements: null,
      triggerEvent: 'click',
      // Définition de 2 fonctions anonymes vides qui serviront à passer
      // du code sous forme de callback pour le "triggeredElement" et pour 
      // le(s) "nonTriggeredElement" au moment de l'initialisation du plugin. 
        // https://learn.jquery.com/plugins/advanced-plugin-concepts/#provide-callback-capabilities
      triggeredElement: function() {},
      nonTriggeredElement: function() {}
    }

    var settings = $.extend( {}, defaults, options);


    // Vérifier la présence effective, dans le DOM, de chaque élément 
    // déclaré dans le tableau [arrayOfSimilarElements]...
      // https://stackoverflow.com/questions/50955692/javascript-check-if-html-contains-an-item-from-an-array
    const MATCHED_ELEMENTS = [];
    options.arrayOfSimilarElements.forEach( (el) => {
      const MATCH = $(el);
      // ...et stocker ceux qui sont présents dans un nouveau tableau <MATCHED_ELEMENTS>.
      if (MATCH && MATCH.length != 0) {
          MATCHED_ELEMENTS.push(el);
      }
    });
    // console.log('Trouvé(s) dans le DOM: ' + MATCHED_ELEMENTS.length + ' élement(s) qui matche(nt) sur un total de ' + options.arrayOfSimilarElements.length + '.');



    // Si au moins 2 éléments déclarés dans le tableau [options.arrayOfSimilarElements] sont présents dans le DOM:
    if (MATCHED_ELEMENTS.length >= 2) {
      // console.log('Nous avons au moins 2 éléments déclarés dans le tableau [options.arrayOfSimilarElements] qui sont présents dans le DOM!');
      // console.log('L_utilisation de ce plugin est justifiée.');

      // On boucle sur les éléments stockés dans le tableau <MATCHED_ELEMENTS>.
        // https://stackoverflow.com/questions/21070431/how-to-loop-over-an-array-and-add-jquery-click-events
      for (let s in MATCHED_ELEMENTS) {
        let MATCHED_ELEMENTS_s = MATCHED_ELEMENTS[s];
        (function( triggeredElement ){
          // Pour l'élément du tableau <MATCHED_ELEMENTS> qui a été utilisé 
          // pour déclancher l'événement <options.triggerEvent> (et UNIQUEMENT pour celui-ci): 
          triggeredElement.on(options.triggerEvent, function(){

            // Le callback pour le "triggeredElement":
            // === Your custom code outside this plugin, within the triggeredElement() function ===
            // Do something with triggered element of options.arrayOfSimilarElements.
            options.triggeredElement.call( triggeredElement );
            // === end: Your custom code. ===


            // On filtre les éléments du tableau <MATCHED_ELEMENTS> pour
            // y retirer l'élément déclancheur de l'événement <options.triggerEvent>.
            // On se retrouve avec un nouveau tableau <FILTERED_MATCHED_ELEMENTS>
            // qui contient uniquement les éléments du tableau de départ qui sont 
            // présents dans le DOM mais qui n'ont pas été utilisés.
            const FILTERED_MATCHED_ELEMENTS = MATCHED_ELEMENTS.filter(function( value, index, arr ) {
              return value != triggeredElement;
            });


            // Pour ce(s) élément(s) qui n'ont PAS déclanché l'événement <options.triggerEvent>
            // (et UNIQUEMENT ceux-ci): 
            FILTERED_MATCHED_ELEMENTS.forEach(function( item ) {
              
              // Le callback pour le(s) "nonTriggeredElement":
              // === Your custom code outside this plugin, within the nonTriggeredElement() function ===
              // Do something with non-triggered element(s) of options.arrayOfSimilarElements.
              options.nonTriggeredElement.call( item );
              // === end: Your custom code. ===
            });
          });
        }(MATCHED_ELEMENTS_s));
      }
    }

    // Si 1 seul élément parmi ceux déclarés dans le tableau [options.arrayOfSimilarElements] est présent dans le DOM:
    else if (MATCHED_ELEMENTS.length === 1) {
      // console.log('1 seul élément parmi ceux déclarés dans le tableau [options.arrayOfSimilarElements] est présent dans le DOM.');
      // console.log('Vous ne devriez probablement pas utiliser ce plugin si vous ne gérez qu_1 seul élément...');
      $(MATCHED_ELEMENTS[0]).on(options.triggerEvent, function(){
        // Le callback pour le "triggeredElement":
        // === Your custom code outside this plugin, within the triggeredElement() function ===
        // Do something with triggered element of options.arrayOfSimilarElements.
        options.triggeredElement.call( $(this) );
        // === end: Your custom code. ===
      });
    }

    // Si AUCUN élément parmi ceux déclarés dans le tableau [options.arrayOfSimilarElements] n'est présent dans le DOM:
    else {
      // console.log('AUCUN élément parmi ceux déclarés dans le tableau [options.arrayOfSimilarElements] n_est présent dans le DOM.');
      // console.log('Vous ne devriez probablement pas utiliser ce plugin...');
      return false;
    }

  };
}( jQuery, window ));
