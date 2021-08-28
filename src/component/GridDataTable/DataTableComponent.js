import {GridComponent} from "../../service/GridComponent/GridComponent";
import {DataTable} from "./DataTable";
import {GridDatePicker} from "../GridDatePicker/GridDatePicker";

export class DataTableComponent extends GridComponent {
    constructor(obj, nameSpace, callerInput) {
        super(obj, nameSpace);

        // Create DataTable instance
        this.dataTable = new DataTable(
            this.container,
            {ajaxUrl: this.containerUrl, domAttr: {colWidth: 250, mnWidth: 70}}
        );

        this.eventConfig = [
            {selector: ".datepicker", action: "onmouseover", callBack: "setDatepicker"},
        ];

        this.setState([
            {id: 'dateFrom', elmn: this.container.querySelectorAll('input.inpt-date')[0]},
            {id: 'dateTo', elmn: this.container.querySelectorAll('input.inpt-date')[1]}
        ]);

        this.setEvents();
    }

    setDatepicker(obj) {
        GridDatePicker.createInstance(this.nameSpace, obj);
    }

    refreshDataTable() {
        this.dataTable.setRequest();
    }
}