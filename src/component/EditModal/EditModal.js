import {Component} from "../../service/Component/Component";
import {Ui} from "../../service/Ui/GridUi";
import {GridStage} from "../../service/GridStage/GridStage";

export class EditModal extends Component {
    constructor(obj, nameSpace) {
        super(obj, nameSpace);

        this.eventConfig = [
            {selector: ".btn.edit", action: "onclick", callBack: "setModal"},
        ];

        this.setEvents();
    }

    setModal(obj) {
        const callBack = {obj: this, method: "setModalRequest"};
        const url = Ui.dataSetValue(obj, 'requestUrl');

        // Set triggerUrl for modalRequest
        this.requestTriggerUrl = Ui.dataSetValue(obj, 'triggerUrl');
        GridStage.modal.modalTitle("Daten bearbeiten");
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
            this.renderDataset(res.data);
        }
    }

    renderDataset(data) {
        Ui.renderDatasetList(this.container.querySelectorAll('[data-grid-edit-key]'), data);
        [...this.container.querySelectorAll('[data-grid-edit-param]')].map(obj => {
            const key = Ui.dataSetValue(obj, "gridEditParam");
            if (key && data.hasOwnProperty(key)) {
                obj.dataset[key] = data[key];
            }
        });
    }
}