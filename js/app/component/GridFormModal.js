class GridFormModal extends GridComponent
{
    constructor (obj, nameSpace)
    {
        super(obj, nameSpace);

        this.eventConfig = [
            {selector : ".btn-primary", action : "onclick", callBack : "setModal"},
        ];

        this.setEvents();
    }

    setModal (obj)
    {
        const callBack = {obj:this, method: "setModalRequest"};
        const url =  GridUi.dataSetValue(obj, 'requestUrl');
        // Set triggerUrl for modalRequest
        this.requestTriggerUrl = (GridUi.dataSetValue(obj, 'triggerUrl') === "")
            ? url : GridUi.dataSetValue(obj, 'triggerUrl');
        GridStage.modal.modalTitle("Neue Daten");
        GridStage.modal.modalRequest({url : url}, {callBack : callBack}, "save", "expand");
    }

    setModalRequest (formData)
    {
        // Set request message
        this.setMessage("Die Daten werden gespeichert, bitte warten ..");

        // Send post request
        this.setComponentRequest(
            "postRequest",
            {
                url : this.requestTriggerUrl,
                formData : GridUi.formPostData(formData),
                response : "setModalResponse"
            });
    }

    setModalResponse (res)
    {
        // Set response message
        this.setMessage(res);

        if (GridUi.requestStatus(res) && this.gridWatcher) {
            GridStage.GridWatcher.runWatcher(this.gridWatcher);
        }
    }
}
