import {GridComponent} from "../../service/GridComponent/GridComponent";
import {GridStage} from "../../service/GridStage/GridStage";

export class GridExampleModal extends GridComponent {
    constructor(obj, nameSpace) {
        super(obj, nameSpace);

        this.eventConfig = [
            {
                selector: "button.btn-primary",
                action: "onclick",
                callBack: "setRequest"
            },
        ];

        this.setEvents();
    }

    setRequest(obj) {
        GridStage.modal.modalTitle("Example / Hello World");
        GridStage.modal.renderModalBody("<p style='padding: 10px;'>Hello World in einem Modal Fenster.</p>");
    }
}