# TODO

## Nice To Have

### Flexibilität

`config/theme.scss` und `config/config.js` enthalten ein paar Stellschrauben für die Entwickler 
und sollten die Wiederverwendbarkeit dieses Bundles verbessern.

### Überall DomGridUi nötig?

Ich sprech mal jQuery:

Wenn ich ein `$nodeElement` habe wie zB jQuery.find('#DomGrid'), dann hat dieses $nodeElement
alle Methoden, die es in jQuery gibt. Damit kann ich dann Sachen machen wie:

- $nodeElement.find('.cildNode')
- $nodeElement.load(uriContent)
- $nodeElement.closest('.parentNode')

Das führt dazu, dass man jQuery selbst eigendlich gar nicht weiter benötigt.

Sowas sollte man auch hier versuchen...

Angenommen wir hätten in der DomGridConfig sowas:

```js
config.$container = DomGridUi.find('#DomGrid');
```

Dann bräuchten wir nirgendwo mehr die DomGridUi direkt zu referenzieren und es indirekt machen:

```js
$components = $container.find('[data-domgrid-component]')
```

## Code Review

Hier ein paar Sachen, die aufgefallen sind und überarbeitet werden könnten.

### Mehr Constructor Injection (aka "CI")

Keine Globalen Klassen. Einzige Ausnahme wären so kleine Toolbelts wie `Math`.

Es gibt zu viele Stellen, an denen sich Klassen selbst Daten oder Instanzen anderer Klassen holen.
Besser wäre es, wenn es beim NEW-Statement explizit übergeben wird.

```js
var domGridConfig = new Config({
    'ui': new Ui(UiConfig)
});
```

oder falls du auf Getter und Setter stehst wäre das auch sehr schön:

```js
var domGridConfig = new Config();
domGridConfig->setUI(new Ui(UiConfig));
```

Und dann:

```js
new Loader(domGridConfig);
```

... und im Code von DomGrid dann:
```js
constructor(config) {
  this.config = config;
}
/**
* returns UiService 
*/
getUi(){
  return this.config.ui;
  // bzw return this.config.getUi();
}
```

Das ermöglicht eine saubere und strenge Typisierung, die von viele JS-Tools sehr eng geprüft werden kann 
und ermöglicht besseres Pre-Compiling in modernen JS-Engines.

### Variablen bzgl DOM-Lib

Ich hätte gerne, dass es mehr wie jQuery aussieht und dass Variablennamen dann mit einem "$" anfangen.

### Naming

#### JS

Ich würde das Prefix "Grid" weglassen und statt dessen die ParentKlasse mit in den Namen schreiben.

alt: `GridEdit extends GridComponent`

neu: `EditComponent extends Component`

Oder gar komplett weglassen? `Edit extends Component` wäre schon cool. 
Auch sähen dann die HTML Attribute besser aus: `data-domgrid-component="Edit"`

#### CSS

Ich habe es auch nach SCSS umgewandelt und bereits angefangen, es zu separieren.
Das macht den Code übersichtlicher.

Die CSS-Klassen und IDs sollten genau so heissen wie die JavaScript-Objekte. 
Zudem würde ich alle CSS-Selectoren mit dem Namespace einengen:

```scss
#DomGrid {
  .DomGrid-Edit{
    display: block;   
  }  
}
```

Die SCSS-Datei sollte genauso heissen wie die JS-Datei, für die sie gedacht ist.

```sh
  DomGrid-Edit.js
  DomGrid-Edit.scss
```

### Separation 

Eine JS-Klasse pro Datei.
Jede JS-Klasse kann ihr eigenes SCSS mitbringen.
Jede JS-Klasse kann weitere JS-Klassen anfordern. Aber dran denken: Besser als CI umsetzen! 
