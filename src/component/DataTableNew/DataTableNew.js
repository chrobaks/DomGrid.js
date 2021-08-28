import "./order-box-container.scss";

import {Component} from "../../service/Component/Component";

import {DataTable} from "./DataTable";
import {DatePicker} from "../DatePicker/DatePicker";

export class DataTableNew extends Component {
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
        DatePicker.createInstance(this.nameSpace, obj);
    }

    refreshDataTable() {
        this.dataTable.setRequest(); // TODO
    }
}