class GridModalTplElement extends GridElement
{
    constructor (container, parent)
    {
        super(container, parent);

        this.eventConfig = [
            {selector : ".btn-modal", action : "onclick", callBack : "setModal"},
        ];

        this.setEvents();
    }

    setModal (obj)
    {
        const url =  GridUi.dataSetValue(obj, 'requestUrl');

        // Set modal title
        GridStage.modal.modalTitle("AngryDuckForum");
        // Set modal request, load html template
        GridStage.modal.modalRequest({url : url}, {});
    }
}