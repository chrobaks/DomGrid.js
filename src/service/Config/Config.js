import {Ui} from "../Ui/Ui";
import {Node} from "../Node/Node";

import {Global} from "../../namespace/Global/Global";

import {EditModal} from "../../component/EditModal/EditModal";
import {DataTable} from "../../component/DataTableNew/DataTable";
import {ExampleModal} from "../../component/ExampleModal/ExampleModal";
import {DatePicker} from "../../component/DatePicker/DatePicker";
import {Form} from "../../component/Form/Form";
import {FormList} from "../../component/FormList/FormList";
import {SelectContent} from "../../component/SelectContent/SelectContent";
import {SideNavi} from "../../component/SideNavi/SideNavi";

import {Link} from "../../element/Link/Link";
import {AngryDuck} from "../../element/AngryDuck/AngryDuck";
import {Row} from "../../element/Row/Row";

let $document = new Node(window.document);

export var Config = {

    $document: $document,
    $container: $document.find('[data-domgrid]'),

    namespaces: {
        'GlobalNamespace': Global,
    },
    components: {
        'DataTable': DataTable, // Hier werden nur Constructors gemapped - wie bekommen wir die Config in die Instanz?
        'GridDatePicker': DatePicker,
        'GridEdit': EditModal,
        'GridExampleModal': ExampleModal,
        'GridForm': Form,
        'GridFormList': FormList,
        'GridSelectContent': SelectContent,
        'GridSideNavi': SideNavi,
    },
    elements: {
        'GridLinkElement': Link,
        'GridModalTplElement': AngryDuck,
        'GridRowElement': Row,
    },
    service: {
        'ui': Ui,
        'node': Node
        // was macht hier Sinn?
    },

    getScriptUri: function (name, group) {
        return 'dist/' + group + '/' + name + '/' + name + '.js';
    }
}