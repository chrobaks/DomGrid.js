import {Element} from "../../service/Element/Element";
import {Ui} from "../../service/Ui/GridUi";
import {GridStage} from "../../service/GridStage/GridStage";

export class Row extends Element {
    constructor(container, parent) {
        super(container, parent);

        this.eventConfig = [
            {selector: ".btn.edit", action: "onclick", callBack: "setModal"},
            {selector: ".btn.delete", action: "onclick", callBack: "setDeleteRow"},
        ];

        this.setEvents();
    }

    setDeleteRow(obj) {
        // Row request url
        const url = Ui.dataSetValue(obj, 'requestUrl');
        const csrfInpt = this.container.querySelector('input[name="_token"]');
        const formData = (csrfInpt) ? Ui.formData({"_token": csrfInpt.value}) : [];

        // Confirm delete action
        if (url && confirm("Möchtest du wirklich diese Daten löschen?")) {
            // Set request message
            this.setParentAction('setMessage', "Die Daten werden gelöscht, bitte warten ..");
            // Send delete request
            this.setElementRequest("postRequest", {
                    url: url,
                    formData: formData,
                    response: "setResponse"
                }
            );
        }
    }

    setResponse(response) {
        // Delete row, if response.status is success
        if (Ui.requestStatus(response)) {
            this.container.remove();
        }
    }

    setModal(obj) {
        const callBack = {obj: this, method: "setModalRequest"};
        const url = Ui.dataSetValue(obj, 'requestUrl');

        // Set triggerUrl for modalRequest
        this.requestTriggerUrl = Ui.dataSetValue(obj, 'triggerUrl');
        // Set modal title
        GridStage.modal.modalTitle("Daten bearbeiten");
        // Set modal request, load html template
        GridStage.modal.modalRequest({url: url}, {callBack: callBack});
    }

    setModalRequest(formData) {
        // Set request message
        this.setParentAction('setMessage', "Die Daten werden gespeichert, bitte warten ..");
        // Send post request
        this.setElementRequest("postRequest", {url: this.requestTriggerUrl, formData: Ui.formData(formData), response: "setModalResponse"});
    }

    setModalResponse(res) {
        // Set response message
        this.setParentAction('setMessage', res);
        // If response status is success, update row data
        if (Ui.requestStatus(res)) {
            this.renderBody(res.data);
        }
    }

    renderBody(data) {
        // Render new element data with attribute data-grid-edit-key
        Ui.renderDatasetList(this.container.querySelectorAll('[data-grid-edit-key]'), data);
    }
}