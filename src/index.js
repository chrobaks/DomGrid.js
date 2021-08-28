import {DomGrid} from "./service/DomGrid/DomGrid";
import {config} from "../config/test";

new DomGrid(config); // geil oder? :D

// Der Service DomGrid läd andere Services/Klassen
// und jeder Service und jede Klasse kann dann "ihr" SCSS nachladen
// Und jeder Service kann natürlich seinerseits andere Services/Klassen anfordern