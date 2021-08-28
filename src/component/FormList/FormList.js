import {Component} from "../../service/Component/Component";
import {Ui} from "../../service/Ui/GridUi";
import {GridStage} from "../../service/GridStage/GridStage";

export class FormList extends Component {
    constructor(obj, nameSpace) {
        super(obj, nameSpace);

        this.eventConfig = [
            {selector: ".btn-primary", action: "onclick", callBack: "setModal"},
        ];

        this.setEvents();
    }

    setModal(obj) {
        const callBack = {obj: this, method: "setModalRequest"};
        const url = Ui.dataSetValue(obj, 'requestUrl');

        // Set triggerUrl for modalRequest
        this.requestTriggerUrl = Ui.dataSetValue(obj, 'triggerUrl');
        GridStage.modal.modalTitle("Neue Daten");
        GridStage.modal.modalRequest({url: url}, {callBack: callBack});
    }

    setModalRequest(formData) {
        // Set request message
        this.setMessage("Die Daten werden gespeichert, bitte warten ..");

        // Send post request
        this.setComponentRequest("postRequest", {url: this.requestTriggerUrl, formData: Ui.formData(formData), response: "setModalResponse"});
    }

    setModalResponse(res) {
        // Set response message
        this.setMessage(res);

        if (Ui.requestStatus(res)) {
            this.setComponentRequest("tplRequest", {url: this.containerUrl, response: "renderBody"});
        }
    }

    renderBody(html) {
        this.container.querySelector('tbody').innerHTML = html;

        // Reset element instance grid elements if exists
        if (this.container.querySelector('tbody').querySelectorAll("[data-grid-element]").length) {
            GridStage.initElements(this, this.container, this.nameSpace);
        }
    }
}