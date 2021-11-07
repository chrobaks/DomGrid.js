class GridEdit extends GridComponent
{
    constructor (obj, nameSpace)
    {
        super(obj, nameSpace);

        this.eventConfig = [
            {selector : ".btn.edit", action : "onclick", callBack : "setModal"},
        ];

        this.setEvents();
    }

    setModal (obj)
    {
        const callBack = {obj:this, method: "setModalRequest"};
        const url =  GridUi.dataSetValue(obj, 'requestUrl');

        // Set triggerUrl for modalRequest
        this.requestTriggerUrl = GridUi.dataSetValue(obj, 'triggerUrl');
        GridStage.modal.modalTitle("Daten bearbeiten");
        GridStage.modal.modalRequest({url : url}, {callBack : callBack});
    }

    setModalRequest (formData)
    {
        // Set request message
        this.setMessage("Die Daten werden gespeichert, bitte warten ..");

        // Send post request
        this.setComponentRequest("postRequest", {url : this.requestTriggerUrl, formData : GridUi.formData(formData), response : "setModalResponse"});
    }

    setModalResponse (res)
    {
        // Set response message
        this.setMessage(res);

        if (GridUi.requestStatus(res)) {
            this.renderDataset(res.data);
        }
    }

    renderDataset (data)
    {
        GridUi.renderDatasetList(this.container.querySelectorAll('[data-grid-edit-key]'), data);
        [...this.container.querySelectorAll('[data-grid-edit-param]')].map(obj => {
            const key = GridUi.dataSetValue(obj,"gridEditParam");
            if (key && data.hasOwnProperty(key)) {
                obj.dataset[key] = data[key];
            }
        });
    }
}