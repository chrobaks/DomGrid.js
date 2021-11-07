class GridFormList extends GridComponent
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
            this.renderBody(res.data);
        }
    }

    renderBody (data)
    {
        const row = document.createElement('tr');
        const cell = document.createElement('td');

        cell.innerHTML = data.name;
        row.append(cell);

        this.container.querySelector('tbody').append(row);
    }
}
