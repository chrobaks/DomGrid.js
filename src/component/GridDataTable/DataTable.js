import "./dataTable.scss"; // jede Komponente sollte ihr eigenes CSS mitbringen!

export class DataTable {
    constructor(container, config) {
        // Set config
        this.config = DataTableConf.getConf(config);
        this.config.dom.container = container;
        // Init components
        this.Search = new DataTableSearch();
        this.Event = new DataTableEvent(this);
        this.View = new DataTableView(this);
        this.Toolbar = new DataTableToolBar(this);
        // Render appp
        this.setApp();
        // Set data request
        this.setRequest();
    }

    setApp() {
        this.View.setAppTpl();

        for (let key in this.config.domId) {
            this.config.dom[key] = this.config.dom.container.getElementsByClassName(this.config.domId[key])[0];
        }

        this.Search._config = {"dateLang": this.config.dateLang};
    }

    setAppLang(lang) {
        if (this.config.lang.hasOwnProperty(lang)) {
            this.config.tplLang = lang;
            this.setApp();
            this.setRequest();
        }
    }

    setRequest(postParam = null) {
        const xhttp = new XMLHttpRequest();
        const _this = this;
        // Create object with Form parameter
        // Add Search Param if exists
        let formData = (this.config.urlSearchParam !== null) ? {...this.config.urlSearchParam} : {};
        // Add postParam  if not empty
        if (postParam !== null) {
            formData = {...formData, ...postParam};
        }
        // Scroll data table view to top
        this.config.dom.wrapper.scrollTop = 0;

        // Send ajax request
        xhttp.open("POST", this.config.ajaxUrl, true);
        xhttp.send(GridUi.formData(formData));
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const responseData = JSON.parse(this.responseText);
                if (responseData.status === "success") {
                    _this.setDataTable(responseData.dataTable);
                }
            }
        };
    }

    setDataTable(dataTable) {
        this.config.dataIndex = 0;

        if (dataTable.hasOwnProperty('header') && dataTable.header.length) {
            this.View.setHeader(dataTable.header);
            this.Event.headerEvent();
            this.Toolbar.setToolbarEvent();
        } else {
            if (this.config.dom.header.querySelectorAll('.svg-arrow-item.active').length) {
                this.config.dom.header.querySelectorAll('.svg-arrow-item.active')[0].setAttribute('class', 'svg-arrow-item');
            }
        }
        this.setDataConfig(dataTable);
        this.setDataTableContent(dataTable.content);
        this.Toolbar.setToolbarInfo();
        this.Search._config = {"dataTable": dataTable.content};
        this.config.dataTableClone = this.config.dom.content.innerHTML;
        this.config.dataTableCache = dataTable.content;
    }

    setDataTableContent(dataTable) {
        this.config.dataIndex = 0;
        this.config.dom.content.innerHTML = "";
        dataTable.map((val) => this.View.setContent(val));
        this.Search._config = {content: this.config.dom.content};
        this.Event.contentEvent();
    }

    setDataTableCache(reset = false) {
        if (reset) {
            this.config.dataTable = this.config.dataTableCache;
            this.Search._config = {"dataTable": this.config.dataTable};
            this.config.dom.content.innerHTML = this.config.dataTableClone;
            this.View.resetOrder();
            this.Event.contentEvent();
        } else {
            if (this.config.arrRowList.length) {
                const dataTable = [];
                this.config.arrRowList.map((val) => {
                    dataTable.push(this.config.dataTable[val * 1]);
                });
                this.config.arrRowList = [];
                this.config.arrRowIndex = [];
                this.View.resetOrder();
                this.setDataTableContent(dataTable);
                this.Search._config = {"dataTable": dataTable};
                this.config.dataTable = dataTable;
            } else {
                alert("Keine markierten Daten gefunden.")
            }
        }
    }

    setSortDataTable(index, obj) {
        this.config.objSortList = {};
        this.config.objSortList['sortId_' + index] = obj.dataset.arrowId;
        this.Search._config = {content: this.config.dom.content};
        const dataTable = this.Search.getSort(index, obj.dataset.arrowId);

        this.config.arrRowIndex = dataTable.arrRowIndex;

        if (this.config.dom.header.querySelectorAll('.svg-arrow-item.active').length) {
            this.config.dom.header.querySelectorAll('.svg-arrow-item.active')[0].setAttribute('class', 'svg-arrow-item');
        }
        obj.setAttribute('class', 'svg-arrow-item active');
        this.setDataTableContent(dataTable.arrRes);
    }

    setSearchDataTable(srchConf) {
        if (srchConf.val) {

            this.Search._config = {content: this.config.dom.content};
            const dataTable = [];
            const searchRes = this.Search.getSearch(srchConf);

            if (searchRes.length) {
                searchRes.map((val) => {
                    dataTable.push(this.config.dataTable[val * 1]);
                });
                this.config.arrRowList = [];
                this.config.arrRowIndex = [];
                this.View.resetOrder();
                this.setDataTableContent(dataTable);
                this.Search._config = {"dataTable": dataTable};
                this.config.dataTable = dataTable;
            } else {
                alert("Kein Ergebniss gefunden für: " + srchConf.val);
            }
        }
    }

    setUrlPostParam(key, val) {
        if (this.config.urlPostParam === null) {
            this.config.urlPostParam = {};
        }
        this.config.urlPostParam[key] = val;
    }

    setDataConfig(dataTable) {
        for (let key in this.config.dataConfig) {
            if (dataTable.hasOwnProperty(key)) {
                this.config.dataConfig[key] = dataTable[key];
            }
        }
        this.config.dataTable = dataTable.content;
        this.config.objSortList = {};
        this.config.arrRowIndex = [];
    }
}
