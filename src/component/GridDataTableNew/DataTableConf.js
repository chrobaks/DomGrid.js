export class DataTableConf {
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
