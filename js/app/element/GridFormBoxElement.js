/**
 *-------------------------------------------
 * Class GridFormBoxElement
 *-------------------------------------------
 * @version 1.0
 * @createAt 12.09.2021 13:20
 * @updatedAt 01.03.2022 14:52
 * @author NetCoDev
 *-------------------------------------------
 **/

class GridFormBoxElement extends GridElement
{
    constructor (container, parent)
    {
        super(container, parent);

        this.eventConfig = [{selector : ".btn-primary", action : "onclick", callBack : "setModal"},];

        GridStage.GridWatcher.setWatcher(this.elementId, {meth: [this.parent.nameSpace, this.elementId, "updateContent"]});

        this.setEvents();
    }

    setModal (obj)
    {
        const callBack = {obj:this, method: "setModalRequest"};
        const url =  GridUi.dataSetValue(obj, 'requestUrl');

        // Set triggerUrl for modalRequest
        this.requestTriggerUrl = GridUi.dataSetValue(obj, 'triggerUrl');
        // Set modal title
        GridStage.modal.modalTitle("Daten bearbeiten");
        // Set modal request, load html template
        GridStage.modal.modalRequest({url : url}, {callBack : callBack}, 'save', 'expand');
    }

    setModalRequest (formData, elementCount)
    {
        // Set request message
        this.setParentAction('setMessage', "Die Daten werden gespeichert, bitte warten ..");
        // Send post request
        this.setElementRequest("postRequest", {url : this.requestTriggerUrl, formData : GridUi.formPostData(formData), response : "setModalResponse"});
    }

    setModalResponse (res)
    {
        // Set response message
        this.setParentAction('setMessage', res);
        // If response status is success, update row data
        if (GridUi.requestStatus(res)) {
            this.updateContent();
            if (GridUi.dataSetValue(this.container, 'containerTriggerUrl') && GridUi.dataSetValue(this.container, 'gridWatcher')) {
                GridStage.GridWatcher.runWatcher(
                    GridUi.dataSetValue(this.container, 'gridWatcher'),
                    [GridUi.dataSetValue(this.container, 'containerTriggerUrl')]
                );
            }
        }
    }

    updateContent ()
    {
        this.setElementRequest("tplRequest", {url : this.containerUpdateUrl, response : "renderContent"});
    }

    renderContent (html)
    {
        const container = this.container.querySelector('.box-item-content');
        if (container) {
            container.innerHTML = html;
            this.setEvents([{container: container, selector : ".btn-primary", action : "onclick", callBack : "setModal"}]);
            this.setParentAction("setEvents", [{container: container, selector : ".box-item-icon", action : "onclick", callBack : "setItemAction"}]);
        }
    }
}