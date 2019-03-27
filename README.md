# jQuery similar elements plug-in

L'idée de départ est de pouvoir piloter de manière dynamique un certain nombre d'éléments de la page qui déclenchent une même action. L'action sera déclenchée une seule fois, mais tous les éléments pourront être mis à jour. On peut exécuter de manière séparée du code pour l'élément activé et les éléments similaires non-activés qui doivent quand-même faire l'objet d'une mise à jour.

## Usage:

On déclare un tableau (array) contenant l'ensemble des éléments similaires susceptibles d'être présents dans le DOM.
```
const $_BUTTONS_TOGGLEALLDETAILS = [$('#offCanvas_toggleAllOrderDetail'), $('#inPage_toggleAllOrderDetail'), $('#inPage2_toggleAllOrderDetail')];
```

On initie le plug-in.
```
$(document).similarElements({
  arrayOfSimilarElements: $_BUTTONS_TOGGLEALLDETAILS,
  triggerEvent: 'click',
  triggeredElement: function() {
    // Le code à exécuter pour l'élément "triggeré".
  },
  nonTriggeredElement: function() {
    // Le code à exécuter pour le(s) autre(s) élément(s) ("non-triggeré(s)").
  }
});
```
