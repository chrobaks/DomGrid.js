class GridExampleModal extends GridComponent
{
    constructor (obj, nameSpace)
    {
        super(obj, nameSpace);

        this.eventConfig = [
            {selector : "", action : "onclick", callBack : "setModal"},
        ];

        this.setEvents();
    }

    setModal ()
    {
        GridStage.modal.modalTitle("Example / Hello World");
        GridStage.modal.renderModalBody("<p style='padding: 10px;'>Say <b>Hello</b> to the world with GridModal.</p>");
    }
}