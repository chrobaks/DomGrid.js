// TODO
//
class DataTableUtile {
    static getStrNumber(i, str) {
        let res = "";
        let nextChar = null;
        let doIt = true;
        while (doIt) {
            res += "" + str[i];
            if (i + 1 < str.length && /^[\d]$/.test(str[i + 1])) {
                i++;
            } else {
                if (i + 1 < str.length) {
                    nextChar = str[i + 1];
                }
                doIt = false;
            }
        }

        return {res: res, nextChar: nextChar};
    }

    static getSortRes(a, b, orderAsc) {
        if (a < b) return ((orderAsc) ? 1 : -1);
        if (a > b) return ((orderAsc) ? -1 : 1);
        return 0;
    }

    static getSort(arr, orderAsc, config) {
        let res = arr;
        res.sort(function (a, b) {
            return DataTableUtile.getSortRes(a[1], b[1], orderAsc)
        });

        return res.sort(function (a, b) {
            if (/^[\d]{2}\.[\d]{2}\.[\d]{4}$/.test(a[1]) && /^[\d]{2}\.[\d]{2}\.[\d]{4}$/.test(b[1])) {
                return DataTableUtile.sortDate(a[1], b[1], orderAsc, config.dateLang);
            } else {
                return DataTableUtile.sortString(a, b, orderAsc);
            }
        });
    }

    static getLangDate(date, lang) {
        date = date.split('.');
        const res = (lang === 'de') ? new Date(date[2] * 1, date[1] * 1 - 1, date[0] * 1).getTime() : new Date(date[2] * 1, date[0] * 1 - 1, date[1] * 1).getTime();

        return res;
    }

    static sortDate(a, b, orderAsc, dateLang) {
        const dateA = DataTableUtile.getLangDate(a, dateLang);
        const dateB = DataTableUtile.getLangDate(b, dateLang);

        return DataTableUtile.getSortRes(dateA, dateB, orderAsc);
    }

    static getValidInpt(obj) {
        let intVal = obj.inpt.value.trim();
        let res = null;

        if (/^[\d]+$/.test(intVal) && intVal) {
            if (obj.max < intVal * 1) {
                intVal = obj.max;
                obj.inpt.value = intVal;
            }
            res = intVal * 1;
        } else {
            obj.inpt.value = obj.default;
        }

        return res;
    }

    static sortString(a, b, orderAsc) {
        const arr0 = (a[1]) ? a[1].toLowerCase().match(/[^\W*]/g) : "";
        const arr1 = (b[1]) ? b[1].toLowerCase().match(/[^\W*]/g) : "";
        let res0 = "";
        let res1 = "";

        for (let i = 0; i < arr0.length; i++) {
            if (/^[\d]$/.test(arr0[i]) && /^[\d]$/.test(arr1[i])) {
                const objNr0 = this.getStrNumber(i, arr0);
                const objNr1 = this.getStrNumber(i, arr1);
                let n0 = objNr0.res * 1;
                let n1 = objNr1.res * 1;

                if (n0 === n1) {
                    if (objNr0.nextChar !== null && objNr1.nextChar === null) {
                        n0 = 1;
                        n1 = 0;
                    } else if (objNr1.nextChar !== null && objNr0.nextChar === null) {
                        n0 = 0;
                        n1 = 1;
                    }
                }
                return DataTableUtile.getSortRes(n0, n1, orderAsc);
            }
            if (arr1.length <= i && res0 === res1 || arr0[i] != arr1[i] && /^[\d]$/.test(arr1[i])) {
                return (!orderAsc) ? 1 > 0 : 1 < 0;
            } else {
                res0 = arr0[i];
                res1 = arr1[i];
                if (arr0[i] != arr1[i]) {
                    return DataTableUtile.getSortRes(arr0[i], arr1[i], orderAsc);
                }
            }
        }

        return DataTableUtile.getSortRes(res1, res0, orderAsc);
    }
}

/**
 * ------------------------------------
 * DataTableConf
 * ------------------------------------
 */
class DataTableConf {
    static getConf(config) {
        const defaultConf = {
            dataTable: [],
            dataTableCache: [],
            dataTableClone: "",
            dataIndex: 0,
            dataConfig: {
                dataStep: 1,
                maxStep: 0,
                maxLen: 0,
                stepLen: 0,
                actualLen: 0,
                rowLen: 0,
            },
            dateLang: "de",
            tplLang: "de",
            arrToggleList: [],
            arrRowList: [],
            arrRowIndex: [],
            arrColType: {},
            objSortList: {},
            urlGetParam: [],
            urlPostParam: null,
            urlSearchParam: null,
            searchDate: {start: [], end: [], show: false},
            dom: {container: null},
            domId: {
                btnNext: 'btn-step-forward',
                btnBack: 'btn-step-back',
                btnStep: 'btn-step',
                btnSearch: 'btn-search',
                btnShowList: 'btn-show-list',
                btnShowSelct: 'btn-show-selection',
                btnRstSelct: 'btn-reset-selection',
                btnRstGlblSrch: 'btn-reset-global-search',
                btnContLen: 'btn-content-length',
                btnConlToggle: 'btn-col-toggle',
                contentInfo: 'dataTable-content-info',
                maxStep: 'dataTable-max-step',
                colToggleList: 'dataTable-toggle-list-column',
                colSearchList: 'dataTable-toggle-list-search',
                inptContentLength: 'inpt-content-length',
                inptStep: 'inpt-step',
                wrapper: 'dataTable-wrapper',
                header: 'dataTable-header',
                content: 'dataTable-content',
                colToggleWrapper: 'dataTable-col-toggle-wrapper'
            },
            tpl: {
                "columnHeader": '<div class="col-header-wrapper"><div class="col-header-label">{%column%}</div><div class="order-box-container"><span class="svg-arrow-item" data-arrow-id="up"><svg class="svg-arrow" viewBox="0 0 640 640" width="10" height="10"><defs><path d="M160.01 320.01L0.02 640.02L320.03 640.01L640.02 640L480.03 320L320.01 0.01L160.01 320.01Z" id="bbbJpxd7D"></path></defs><g><g><g><use xlink:href="#bbbJpxd7D" opacity="1" fill="#30bf2d" fill-opacity="1"></use><g><use xlink:href="#bbbJpxd7D" opacity="1" fill-opacity="0" stroke="#42413f" stroke-width="1" stroke-opacity="1"></use></g></g></g></g></svg></span><span class="svg-arrow-item" data-arrow-id="down"><svg class="svg-arrow" viewBox="0 0 640 640" width="10" height="10"><defs><path d="M480.02 320L640 0L320 0.01L0 0.02L160 320.01L320.01 640.01L480.02 320Z" id="a4wj2R4nkY"></path></defs><g><g><g><use xlink:href="#a4wj2R4nkY" opacity="1" fill="#30bf2d" fill-opacity="1"></use><g><use xlink:href="#a4wj2R4nkY" opacity="1" fill-opacity="0" stroke="#42413f" stroke-width="1" stroke-opacity="1"></use></g></g></g></g></svg></span></div></div>',
                "columnToggleList": '<span>{%column%}</span><input type="radio" checked="checked"/>',
                "searchToggleList": '<span>{%column%}</span>',
                "rowIndex": '<span class="rowIndex">{%rowIndex%}</span>',
                "app": [
                    '<div class="dataTable-toolbar"><button class="btn-show-list btn-blue">{%show_list%}</button><button class="btn-show-selection btn-blue">{%show_selection%}</button><button class="btn-reset-selection btn-blue">{%show_reset%}</button><button class="btn-reset-global-search btn-blue hide">{%reset-global-search%}</button><div class="dataTable-col-toggle-wrapper"><button class="btn-col-toggle btn-blue">{%in_column%} <span class="column-name"></span> {%search%}</button><div class="dataTable-col-toggle-list toggle-top dataTable-toggle-list-search"></div></div><div class="dataTable-search-wrapper-str"><input class="inpt-search" type="text" data-col-index=""><input name="global-search-text" type="checkbox"><span class="txt-global"> : global</span><div class="btn-search btn-blue"><svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/></svg></div></div><div class="dataTable-search-wrapper-date"><input class="inpt-date datepicker" name="date-from" type="text" data-col-index=""><span>-</span><input class="inpt-date datepicker" name="date-to" type="text"><input name="global-search-text" type="checkbox"><span class="txt-global"> : global</span><div class="btn-search btn-blue"><svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/></svg></div></div></div></div>',
                    '<div class="dataTable-wrapper"><table class="dataTable-table"><thead class="dataTable-header"></thead><tbody class="dataTable-content"></tbody></table></div>',
                    '<div class="dataTable-toolbar"><button class="btn-step-back btn-green"><div class="svg-wrapper"><svg version="1.1" viewBox="0 0 640 640" width="20" height="20"><defs><path d="M320.02 480.01L640.02 640L640.01 319.99L640 0L320.01 159.99L0.01 320.01L320.02 480.01Z" id="dByRCX4Jj"></path></defs><g><g><g><use xlink:href="#dByRCX4Jj" opacity="1" fill="#96938e" fill-opacity="1"></use><g><use xlink:href="#dByRCX4Jj" opacity="1" fill-opacity="0" stroke="#42413f" stroke-width="1" stroke-opacity="1"></use></g></g></g></g></svg></div></button><div class="dataTable-content-info"></div><button class="btn-step-forward btn-green"><div class="svg-wrapper"><svg version="1.1" viewBox="0 0 640 640" width="20" height="20"><defs><path d="M320.01 160L0 0.02L0.01 320.02L0.02 640.02L320.02 480.02L640.01 320.01L320.01 160Z" id="bIbcTwxec"></path></defs><g><g><g><use xlink:href="#bIbcTwxec" opacity="1" fill="#96938e" fill-opacity="1"></use><g><use xlink:href="#bIbcTwxec" opacity="1" fill-opacity="0" stroke="#42413f" stroke-width="1" stroke-opacity="1"></use></g></g></g></g></svg></div></button><input type="text" class="inpt-content-length"><button class="btn-content-length btn-green">{%results_per_page%}</button><input type="text" class="inpt-step" value="1"><button class="btn-step btn-green"> / <span class="dataTable-max-step">1</span> {%page%}</button><div class="dataTable-col-toggle-wrapper"><button class="btn-col-toggle btn-green">{%column_hide_show%}</button><div class="dataTable-col-toggle-list toggle-bottom dataTable-toggle-list-column"></div></div></div>'
                ]
            },
            lang: {
                "de": {
                    "show_list": "Liste zeigen",
                    "show_selection": "Auswahl zeigen",
                    "show_reset": "Auswahl aufheben",
                    "in_column": "In Spalte",
                    "search": "suchen",
                    "results_per_page": "Ergebnisse pro Seite",
                    "page": "Seite",
                    "column_hide_show": "Spalten zeigen / verstecken",
                    "reset-global-search": "Globalsuche aufheben",
                },
                "en": {
                    "show_list": "Show list",
                    "show_selection": "Show selection",
                    "show_reset": "Deselect",
                    "in_column": "Search in column",
                    "search": "",
                    "results_per_page": "Results per page",
                    "page": "Page",
                    "column_hide_show": "Show / hide columns",
                    "reset-global-search": "Deselect Globalsearch",
                }
            }
        };

        return Object.assign(defaultConf, config);
    }
}

/**
 * ------------------------------------
 * DataTableSearch
 * ------------------------------------
 */
class DataTableSearch {
    constructor() {
        this.config = {};
    }

    getSearch(srchConf) {
        const list = this.config.content.querySelectorAll('.data-row');
        let result = [];
        let revertIndex = list.length - 1;
        srchConf.val = srchConf.val.toLowerCase();
        srchConf.colIndex = srchConf.colIndex * 1;

        for (let i = 0; i < list.length; i++) {

            let colVal1 = list[i].querySelectorAll('.data-col')[srchConf.index].innerHTML.toLowerCase();
            let colVal2 = list[revertIndex].querySelectorAll('.data-col')[srchConf.index].innerHTML.toLowerCase();

            if (srchConf.type === 'date' && srchConf.hasOwnProperty('dateEnd')) {

                let sDate = DataTableUtile.getLangDate(srchConf.val, this.config.dateLang);
                let eDate = DataTableUtile.getLangDate(srchConf.dateEnd, this.config.dateLang);
                colVal1 = DataTableUtile.getLangDate(colVal1, this.config.dateLang);
                colVal2 = DataTableUtile.getLangDate(colVal2, this.config.dateLang);

                if (colVal1 >= sDate && colVal1 <= eDate) {
                    result.push(list[i].dataset.rowIndex * 1);
                }
                if (revertIndex > i) {
                    if (colVal2 >= sDate && colVal2 <= eDate) {
                        result.push(list[revertIndex].dataset.rowIndex * 1);
                    }
                    revertIndex--;
                }

            } else {
                if (colVal1 === srchConf.val) {
                    result.push(list[i].dataset.rowIndex * 1);
                }
                if (revertIndex > i) {
                    if (colVal2 === srchConf.val) {
                        result.push(list[revertIndex].dataset.rowIndex * 1);
                    }
                    revertIndex--;
                }
            }

            if (revertIndex === i) {
                break;
            }
        }

        return result;
    }

    getSort(colIndex, order) {
        let arrRes = [];
        let arrIndex = [];
        let arrRowIndex = [];
        const asc = (order === 'down') ? 1 : 0;

        for (let i = 0; i < this.config.dataTable.length; i++) {
            let rowId = this.config.content.getElementsByClassName("data-row")[i].dataset.rowIndex * 1;
            arrIndex.push([rowId, this.config.dataTable[rowId][colIndex]]);
        }
        arrIndex = DataTableUtile.getSort(arrIndex, asc, this.config);

        for (let n = 0; n < arrIndex.length; n++) {
            arrRes.push(this.config.dataTable[arrIndex[n][0] * 1]);
            arrRowIndex.push(arrIndex[n][0] * 1);
        }

        return {arrRes: arrRes, arrRowIndex: arrRowIndex};
    };

    set _config(obj) {
        this.config = Object.assign(this.config, obj);
    }
}

class DataTable {
    constructor(container, config) {
        // Set config
        this.config = DataTableConf.getConf(config);
        this.config.dom.container = container;
    }
}

class DataTableHandler extends DataTable {
    constructor(container, config) {
        super(container, config);
    }
}


class GridDataTableNew extends GridComponent {
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
        this.dataTable.setRequest();
    }
}