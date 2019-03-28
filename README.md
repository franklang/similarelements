# jQuery similar elements plug-in

[jsFiddle live Demo!](https://jsfiddle.net/frontenddeveloper/2vm1rLdo/59/)

L'idée de départ est de pouvoir piloter de manière dynamique un certain nombre d'éléments de la page qui déclenchent une même action. L'action sera déclenchée une seule fois, mais tous les éléments déclancheurs pourront être mis à jour. On peut exécuter de manière séparée du code pour l'élément activé par l'utilisateur et les éléments similaires non-activés qui doivent quand-même faire l'objet d'une mise à jour.

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

## Known bugs:
* L'option triggerEvent doit être précisée à l'initialisation du plug-in, même si on veut utiliser la valeur par défaut ('click').

## TODOs:
* Rajouter un paramètre true/false qui permet de passer la phase de vérification de présence dans le DOM des éléments déclarés dans l'array. C'est une sécurité pour le bon fonctionnement du plug-in, mais si le développeur est certain que les éléments déclarés dans l'array sont bien tous présents dans le DOM, la vérification n'est pas nécessaire donc petit gain de performance.
