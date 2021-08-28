import {Ui} from "../../service/Ui/GridUi";
import {Element} from "../../service/Element/Element";
import {GridStage} from "../../service/GridStage/GridStage";

export class AngryDuck extends Element {
    constructor(container, parent) {
        super(container, parent);

        this.eventConfig = [
            {selector: ".btn-modal", action: "onclick", callBack: "setModal"},
        ];

        this.setEvents();
    }

    setModal(obj) {
        const url = Ui.dataSetValue(obj, 'requestUrl');

        // Set modal title
        GridStage.modal.modalTitle("AngryDuckForum");
        // Set modal request, load html template
        GridStage.modal.modalRequest({url: url}, {});
    }
}