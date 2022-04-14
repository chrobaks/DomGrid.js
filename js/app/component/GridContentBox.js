/**
 *-------------------------------------------
 * Class GridContentBox
 *-------------------------------------------
 * @version 1.0
 * @createAt 12.09.2021 13:20
 * @updatedAt 01.03.2022 14:52
 * @author NetCoDev
 *-------------------------------------------
 **/

class GridContentBox extends GridComponent
{
    constructor (obj, nameSpace)
    {
        super(obj, nameSpace);

        this.eventConfig = [{selector : ".box-item-icon", action : "click", callBack : "setItemAction"}];
        this.listFilter = [];
        this.objRemove = [];
        this.packageId = undefined;
        this.elementPackageId = undefined;
        this.elementContainer = undefined;
        this.itemAction = "";

        GridStage.GridWatcher.setWatcher(this.componentId, {meth: [this.nameSpace, this.componentId, "refreshContentBox"]});

        this.setEvents();
    }

    setItemAction (obj) {
        this.elementContainer = GridUi.closest('li', obj);
        const caseParam = (obj.classList.contains('edit'))
            ? "edit"
            : ((obj.classList.contains('delete')) ? "delete" : "show");
        const inputId = this.elementContainer.querySelector("input[name='id']");
        const inputPackageId = this.elementContainer.querySelector("input[name='package_id']");
        const callBack = {obj:this, method: "setModalRequest"};
        const modalTitle = obj.classList.contains('edit') ? "Daten speichern" : "Daten löschen";
        const modalType = obj.classList.contains('edit') ? "" : "prompt";
        const modalView = obj.classList.contains('edit') ? "expand" : "";
        const url = obj?.dataset?.requestUrl;
        this.requestTriggerUrl = obj?.dataset?.triggerUrl;
        this.packageId = inputId?.value;
        this.elementPackageId = inputPackageId?.value;
        this.itemAction = caseParam;
        this.objRemove = [];

        switch(caseParam) {
            case'delete':
                this.objRemove.push(this.elementContainer);
                GridStage.modal.modalTitle(modalTitle);
                GridStage.modal.modalRequest({url: url}, {callBack : callBack}, modalType, modalView);
                break;
            case'edit':
                GridStage.modal.modalTitle(modalTitle);
                GridStage.modal.modalRequest({url: url}, {callBack : callBack}, modalType, modalView);
                break;
            case'show':
                this.toggleBoxItem(this.elementContainer);
                break;
        }
    }

    setModalRequest (formData)
    {
        this.setMessage("Die Daten werden gespeichert, bitte warten ..");

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
        this.setMessage(res);

        if (GridUi.requestStatus(res)) {
            try {
                if (this.elementPackageId && this.gridElementWatcher) { // If element view action
                    this.runWatcher([
                        this.gridWatcher,
                        this.gridElementWatcher.replace('{id}', this.elementPackageId)
                    ]);
                    this.objRemove.map(obj => obj.remove());
                    this.setBoxItemDisplay("remove", "hidden");
                } else if (this.gridWatcher) { // If package view action
                    if (this.itemAction === "delete") {
                        this.deleteBoxItem();
                    } else {
                        this.editBoxItem();
                    }
                }
            } catch (error) {console.error("GridContentBox.setModalResponse",  error.message);}
        }
    }

    deleteBoxItem ()
    {
        try {
            GridStage.GridWatcher.runWatcher(this.gridWatcher);
            const elementContainerWatcher = GridUi.dataSetValue(this.elementContainer, 'gridWatcher');
            if (elementContainerWatcher) {
                this.runWatcher([elementContainerWatcher]);
            }
        } catch (error) {console.error("GridContentBox.deleteBoxItem",  error.message);}
    }

    editBoxItem ()
    {
        try {
            if (this.gridElementWatcher) {
                const elementWatcher = this.gridElementWatcher.replace('{id}', this.packageId);
                this.runWatcher([elementWatcher]);
            }
            if (this.elementContainer.classList.contains("show")) {
                const elementContainerWatcher = GridUi.dataSetValue(this.elementContainer, 'gridWatcher');
                this.runWatcher(
                    [elementContainerWatcher],
                    [[GridUi.dataSetValue(this.elementContainer, 'containerTriggerUrl')]]
                );
            }
        } catch (error) {console.error("GridContentBox.editBoxItem",  error.message);}
    }

    toggleBoxItem (container)
    {
        const containerWatcher = container?.dataset?.gridWatcher;
        const containerTriggerUrl = container?.dataset?.containerTriggerUrl;
        if (container.classList.contains("show")) {
            container.classList.remove("show");
            this.setBoxItemDisplay ("remove", "hidden");
        } else {
            this.setBoxItemDisplay ("add", "hidden");
            container.classList.remove("hidden");
            container.classList.add("show");
        }
        if (containerWatcher && containerTriggerUrl) {
            const params = (container.classList.contains("show")) ? [containerTriggerUrl] : [];
            this.runWatcher([containerWatcher], [params]);
        }
    }

    setBoxItemDisplay (action, display)
    {
        [...this.container.querySelectorAll(".content-box-item")].map(item => item.classList[action](display));
    }

    setResponse (res)
    {
        this.setMessage(res);

        if (GridUi.requestStatus(res)) {
            this.setMessage("Die Datenliste wird aktualisiert, bitte warten ..");
            this.setComponentRequest("tplRequest", {url : this.containerTriggerUrl, response : "updateContentBox"});
        }
    }

    refreshContentBox ()
    {
        const triggerUrl = (arguments.length) ? arguments[0] : this.containerTriggerUrl;
        this.setComponentRequest("tplRequest", {url : triggerUrl, response : "updateContentBox"});
    }

    updateContentBox (data)
    {
        try {
            const container = this.container.querySelectorAll(".container-content-box");
            const listElements = container[0].querySelectorAll("[data-grid-element]");
            this.listFilter = [];
            if (container.length) {
                container[0].innerHTML = data;
                GridStage.resetElements(this.nameSpace, listElements);
                GridStage.initNameSpaceElement(this, container[0].querySelectorAll("[data-grid-element]"));
                this.setEvents([{container: container[0], selector: ".box-item-icon", action: "onclick", callBack: "setItemAction"}]);
                this.setMessage("Die Datenliste wurde aktualisiert.");
            }
            if (this.container.querySelectorAll("[data-content-id]")) {
                [...this.container.querySelectorAll("[data-content-id]")].map(obj => {
                    if (!this.listFilter.includes(obj.dataset.contentId)) {
                        this.listFilter.push(obj.dataset.contentId);
                    }
                });
            }
        } catch (error) {console.error("GridContentBox.updateContentBox",  error.message);}
    }
}