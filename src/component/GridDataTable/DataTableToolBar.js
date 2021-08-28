import "./dataTableToolBar.scss";

export class DataTableToolBar {
    constructor(DataTable) {
        this.DataTable = DataTable;
        this.config = DataTable.config;
    }

    setToolbarEvent() {
        // Show default data list button event
        this.config.dom.btnShowList.onclick = () => {
            this.DataTable.setDataTableCache(true);
        };
        // Select marked data row button event
        this.config.dom.btnShowSelct.onclick = () => {
            this.DataTable.setDataTableCache(false);
        };
        // Reset marked data row button event
        this.config.dom.btnRstSelct.onclick = () => {
            this.DataTable.View.resetActiveSelection();
        };
        // Reset global search button event
        this.config.dom.btnRstGlblSrch.onclick = () => {
            this.resetGlobalSearch();
        };
        // Search button event
        [...this.config.dom.container.getElementsByClassName('btn-search')].map((btn) => {
            btn.onclick = () => {
                this.setSearch(btn)
            };
        });
        // Step button event
        this.config.dom.btnNext.onclick = () => {
            this.setStep(1);
        };
        this.config.dom.btnBack.onclick = () => {
            this.setStep(0);
        };
        this.config.dom.btnStep.onclick = () => {
            let intVal = DataTableUtile.getValidInpt({
                inpt: this.config.dom.inptStep,
                max: this.config.dataConfig.maxStep,
                default: this.config.dataConfig.dataStep
            });
            if (intVal !== null) {
                this.config.dataConfig.dataStep = intVal;
                this.setStep(intVal, 0);
            }
        };
        // Button entries per page event
        this.config.dom.btnContLen.onclick = () => {
            this.setEntriesPerPage();
        };
        //Dropdowns event
        document.querySelectorAll('.dataTable-col-toggle-wrapper').forEach((wrapper) => {
            wrapper.onmouseenter = () => {
                wrapper.getElementsByClassName('dataTable-col-toggle-list')[0].style.display = 'block'
            };
            wrapper.onmouseleave = () => {
                wrapper.getElementsByClassName('dataTable-col-toggle-list')[0].style.display = 'none'
            };
        });
        // Show date form event
        this.config.dom.container.getElementsByClassName('dataTable-search-wrapper-date')[0].onmouseenter = () => {
            this.config.searchDate.show = true;
        };
        this.config.dom.container.getElementsByClassName('dataTable-search-wrapper-date')[0].onmouseleave = () => {
            this.config.searchDate.show = false;
        };
    }

    setEntriesPerPage() {
        let intVal = DataTableUtile.getValidInpt({
            inpt: this.config.dom.inptContentLength,
            max: this.config.dataConfig.maxLen,
            default: this.config.dataConfig.stepLen
        });
        if (intVal !== null) {
            this.config.dom.inptStep.value = 1;
            this.config.dataConfig.dataStep = 1;
            this.DataTable.setRequest({contlen: intVal});
            this.DataTable.setUrlPostParam("contlen", intVal);
        }
    }

    setSearch(btn) {
        const container = btn.parentElement;
        const srchConf = {val: null, index: null, type: ''};
        const checkGlobal = container.querySelectorAll('input[name="global-search-text"]')[0];
        // Set searchSpace to list (search in list) or global (search gloobal)
        const searchSpace = (checkGlobal.checked) ? "global" : "list";

        if (container.classList.contains('dataTable-search-wrapper-str')) {
            srchConf.val = container.getElementsByClassName('inpt-search')[0].value.trim();
            srchConf.index = container.getElementsByClassName('inpt-search')[0].dataset.colIndex;
            srchConf.type = 'string';
        } else {
            srchConf.val = container.getElementsByClassName('inpt-date')[0].value.trim();
            srchConf.index = container.getElementsByClassName('inpt-date')[0].dataset.colIndex;
            srchConf.type = 'date';

            if (container.getElementsByClassName('inpt-date')[1].value.trim()) {
                srchConf.dateEnd = container.getElementsByClassName('inpt-date')[1].value.trim();
            }
        }

        if (srchConf.val && srchConf.index >= 0) {
            if (searchSpace === "list") { // List Search
                this.DataTable.setSearchDataTable(srchConf);
            } else { // Global Search
                if (this.config.dom.btnRstGlblSrch.classList.contains('hide')) {
                    this.config.dom.btnRstGlblSrch.classList.toggle('hide');
                }
                this.config.urlSearchParam = {...srchConf};
                this.setStep(1, 0);
            }

        } else {
            alert('Kein Suchbegriff gefunden.');
        }
    }

    setStep(next, isOneStep = 1) {
        if (!isOneStep
            || next && this.config.dataConfig.dataStep + 1 <= this.config.dataConfig.maxStep
            || !next && this.config.dataConfig.dataStep - 1 > 0) {
            this.config.dataConfig.dataStep = (next)
                ? ((isOneStep) ? this.config.dataConfig.dataStep + 1 : next)
                : this.config.dataConfig.dataStep - 1;
            const filter = (!this.config.urlPostParam)
                ? {step: this.config.dataConfig.dataStep}
                : {step: this.config.dataConfig.dataStep, ...this.config.urlPostParam};

            if (isOneStep) {
                this.config.dom.inptStep.value = this.config.dataConfig.dataStep;
            }
            this.DataTable.setRequest(filter);
        }
    }

    setToolbarInfo() {
        this.config.dom.contentInfo.innerHTML = this.config.dataConfig.actualLen + " / " + this.config.dataConfig.maxLen;
        this.config.dom.inptContentLength.value = this.config.dataConfig.stepLen;
        this.config.dom.maxStep.innerHTML = this.config.dataConfig.maxStep;
        this.config.dom.inptStep.value = this.config.dataConfig.dataStep;
    }

    resetGlobalSearch() {
        this.config.dom.btnRstGlblSrch.classList.toggle('hide');
        this.config.urlSearchParam = null;
        this.setStep(1, 0);
    }
}
