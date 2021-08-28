import {DataTableConf} from "./DataTableConf";

export class DataTable {
    constructor(container, config) {
        // Set config
        this.config = DataTableConf.getConf(config);
        this.config.dom.container = container;
    }

    setRequest() {
        // TODO
    }
}