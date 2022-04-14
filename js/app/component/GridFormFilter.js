/**
 *-------------------------------------------
 * Class GridFormFilter
 *-------------------------------------------
 * @version 1.0
 * @createAt 12.09.2021 13:20
 * @updatedAt 01.03.2022 14:52
 * @author NetCoDev
 *-------------------------------------------
 **/

class GridFormFilter extends GridComponent
{
    constructor (obj, nameSpace)
    {
        super(obj, nameSpace);

        this.selector = {

        };
        this.ListCheckModule = null;
        this.TableSearchModule = null;
        this.requestUrl = this.containerRequestUrl;
        this.infoContainer = this.container.querySelectorAll(".info-data-length");
        this.dataList = [];
        this.listSelect = this.container.querySelectorAll('select.search-selection');
        this.listTrRow = this.container.querySelectorAll('tr.row-data');
        this.eventConfig = [
            {selector : "button.btn-primary", action : "click", callBack : "setDataList"},
        ];

        GridStage.GridWatcher.setWatcher(this.componentId, {meth: [this.nameSpace, this.componentId, "setRequestFormTable"]});

        this.setModule();
        this.setEvents();
    }

    setModule ()
    {
        if (GridListCheckModule) {
            this.ListCheckModule = new GridListCheckModule(
                this.container,
                {watcher: this.componentId + "Info"}
            );
            GridStage.GridWatcher.setWatcher(this.componentId + "Info", {meth: [this.nameSpace, this.componentId, "setInfo"]});
        }
        if (GridTableSearchModule && this.listSelect.length && this.listTrRow.length) {
            this.TableSearchModule = new GridTableSearchModule(
                this.listSelect,
                this.listTrRow,
                {watcher: this.componentId + "ResetCheckBox"}
            );
            GridStage.GridWatcher.setWatcher(this.componentId + "ResetCheckBox", {meth: [this.nameSpace, this.componentId, "setResetCheckBox"]});
        }
    }

    setResetCheckBox ()
    {
        this.ListCheckModule.resetCheck();
    }

    setInfo ()
    {
        if (this.infoContainer.length) {
            [...this.infoContainer].map(element => element.innerText = this.ListCheckModule.checkLength);
        }
    }

    setDataList (obj)
    {
        this.dataList = [];
        if (!this.ListCheckModule.checkLength) {
            this.setMessage("Keine markierten Daten gefunden, es muss min. eine Datenreihe markiert werden!");
        } else {
            [...this.container.querySelectorAll("input.check-item")].map(item => {
                if (item.checked) {
                    const $formContainer = GridUi.closest('tr', item);
                    const formList = [
                        ...$formContainer.querySelectorAll("input"),
                        ...$formContainer.querySelectorAll("select"),
                        ...$formContainer.querySelectorAll("textarea")
                    ];
                    // Get form validation
                    const error = GridUi.checkFormValidation(formList);
                    // If empty required fields exists
                    if (error.length) {
                        alert("Alle Felder* benötigen einen Eintrag: " + error.join(", "));
                        return false;
                    }
                    this.dataList.push({
                        formData: GridUi.formPostData(GridUi.formPostList(formList)),
                        formContainer: $formContainer,
                        checkBox: item,
                    });
                }
            });
            if (this.dataList.length) {
                this.setMessage("Die Daten werden gespeichert, bitte warten ..");
                this.setRequest(this.dataList[0]);
            }
        }
    }

    setRequest (formResults)
    {
        if (formResults?.formData) {
            this.setComponentRequest(
                "postRequest",
                {
                    url : this.containerRequestUrl,
                    formData : formResults.formData,
                    response : "setResponse"
                });
        }
    }

    setResponse (res)
    {
        this.setMessage(res);

        if (GridUi.requestStatus(res)) {
            try {
                if (this.dataList[0]?.formContainer) {
                    this.dataList[0]?.formContainer.remove();
                    this.ListCheckModule.checkLength --;
                    this.setInfo();
                }

                this.dataList = this.dataList.slice(1);

                if (this.dataList.length) {
                    this.setMessage("Die nächsten Daten werden gespeichert, bitte warten ..");
                    this.setRequest(this.dataList[0]);
                } else {
                    this.setMessage("Die Datenliste wird aktualisiert, bitte warten ..");
                    this.setRequestFormTable();
                    if (this.gridWatcher) {
                        this.runWatcher("", [[false]]);
                    }
                }
            } catch (error) {console.error(this.componentId + ".setResponse",  error.message);}
        }
    }

    setRequestFormTable ()
    {
        this.setComponentRequest("tplRequest", {url : this.containerTriggerUrl, response : "setResponseFormTable"});
    }

    setResponseFormTable (data)
    {
        try {
            const formTable = this.container.querySelectorAll("table.dataTable");
            if (formTable.length) {
                formTable[0].innerHTML = data;
                this.ListCheckModule.setUpdate(formTable[0]);
                this.TableSearchModule.setUpdate(formTable[0]);
                [...this.container.querySelectorAll('input.date-picker')].map(obj => {
                    GridDateTimePicker.setDateObject(obj);
                });

                this.setMessage("Die Datenliste wurde aktualisiert.");
            }
        } catch (error) {console.error(this.componentId + ".setResponseFormTable",  error.message);}
    }
}