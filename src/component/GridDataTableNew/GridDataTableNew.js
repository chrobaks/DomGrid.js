import "./order-box-container.scss";

import {GridComponent} from "../../service/GridComponent/GridComponent";

import {DataTable} from "./DataTable";
import {GridDatePicker} from "../GridDatePicker/GridDatePicker";

export class GridDataTableNew extends GridComponent {
    constructor(obj, nameSpace, callerInput) {
        super(obj, nameSpace);

        // Create DataTable instance
        this.dataTable = new DataTable(this.container, {ajaxUrl: this.containerUrl, domAttr: {colWidth: 250, mnWidth: 70}});

        this.eventConfig = [
            {selector: ".datepicker", action: "onmouseover", callBack: "setDatepicker"},
        ];

        this.setEvents();
    }

    setDatepicker(obj) {
        GridDatePicker.createInstance(this.nameSpace, obj);
    }

    refreshDataTable() {
        this.dataTable.setRequest(); // TODO
    }
}