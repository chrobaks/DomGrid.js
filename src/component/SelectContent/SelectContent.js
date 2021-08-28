import {Component} from "../../service/Component/Component";
import {Ui} from "../../service/Ui/GridUi";
import {GridStage} from "../../service/GridStage/GridStage";

export class SelectContent extends Component {
    requestSelectId;

    constructor(obj, nameSpace) {
        super(obj, nameSpace);

        this.eventConfig = [
            {
                selector: "select.data-grid-select",
                action: "onclick",
                callBack: "setRequest"
            },
        ];

        this.requestSelectId = [];

        this.setEvents();
    }

    setRequest(obj) {
        this.requestSelectId.push(Ui.dataSetValue(obj, 'gridSelectId'));
        this.setComponentRequest("tplRequest", {url: obj.value, response: "renderBody"});
    }

    renderBody(html) {
        const selectId = this.requestSelectId[0];
        this.requestSelectId = this.requestSelectId.slice(1);
        if (selectId && this.container.querySelector('[data-grid-select="' + selectId + '"]')) {
            const wrapper = this.container.querySelector('[data-grid-select="' + selectId + '"]');
            wrapper.innerHTML = html;
            // Reset element instance grid elements if exists
            console.log("renderBody", wrapper.querySelectorAll("[data-grid-element]").length);
            if (wrapper.querySelectorAll("[data-grid-element]").length) {
                GridStage.initElements(this, this.container, this.nameSpace);
            }
        }


    }
}