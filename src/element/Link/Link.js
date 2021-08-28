import {Ui} from "../../service/Ui/GridUi";
import {Element} from "../../service/Element/Element";

export class Link extends Element {
    action;

    constructor(container, parent) {
        super(container, parent);
        // Link action method name
        this.action = Ui.dataSetValue(this.container, 'action');
        // Click event
        this.container.onclick = () => {
            if (this.action && typeof this[this.action] !== 'undefined') {
                this[this.action]();
            }
        };
    }

    replaceUrl() {
        const path = Ui.dataSetValue(this.container, 'requestUrl');
        const param = Ui.dataSetValue(this.container, 'requestParam');
        // Call new href
        if (path) {
            this.container.href = path.replace('0', param);
        }
    }
}