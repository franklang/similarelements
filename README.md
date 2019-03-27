# similarelements

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
