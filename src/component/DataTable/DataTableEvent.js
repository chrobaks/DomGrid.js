export class DataTableEvent {
    constructor(DataTable) {
        this.DataTable = DataTable;
        this.config = DataTable.config;
    }

    headerEvent() {
        // Create event onclick for each datatable header column (td)
        [...this.config.dom.header.getElementsByClassName("col-header")].map((col) => {
            col.onclick = () => {
                // If active arrow than 1 or 0
                const activeArrow = col.querySelectorAll('.svg-arrow-item.active').length;
                // Arrow is first svg-arrow-item (desc)
                let arrow = col.querySelectorAll('.svg-arrow-item')[0];
                // If active arrow already set, toggle desc and asc
                if (activeArrow) {
                    arrow = (col.querySelectorAll('.svg-arrow-item')[0].classList.contains('active'))
                        ? col.querySelectorAll('.svg-arrow-item')[1]
                        : col.querySelectorAll('.svg-arrow-item')[0];
                }
                // Sort datatable by column index and sort rule (desc/asc)
                this.DataTable.setSortDataTable(col.dataset.colIndex, arrow);
            };
        });
    }

    contentEvent() {
        // Create event onclick for each datatable row (tr)
        [...this.config.dom.content.getElementsByClassName("data-row")].map((row) => {
            row.onclick = () => {
                this.DataTable.View.toggleDataRow(row);
            }
        });
    }

    colToggleEvent(obj) {
        const radio = obj.getElementsByTagName("input")[0];
        const status = !!(radio.getAttribute('checked'));

        if (!status) {
            radio.setAttribute('checked', 'checked');
            this.config.arrToggleList.splice(this.config.arrToggleList.indexOf(obj.dataset.colIndex), 1);
        } else {
            radio.removeAttribute('checked');
            this.config.arrToggleList.push(obj.dataset.colIndex);
        }
        this.DataTable.View.setColumnUpdate(obj.dataset.colIndex, status);
    }

    searchToggleEvent(obj, val, index) {
        const parent = this.DataTable.View.getClosest('dataTable-col-toggle-wrapper', obj);
        const container = this.DataTable.View.getClosest('dataTable-toolbar', parent);
        parent.getElementsByClassName("column-name")[0].innerHTML = val;

        const strSearchWrapper = container.getElementsByClassName("dataTable-search-wrapper-str")[0];
        const dateSearchWrapper = container.getElementsByClassName("dataTable-search-wrapper-date")[0];

        if (!this.config.arrColType.hasOwnProperty("col_" + index)) {
            this.config.arrColType["col_" + index] = this.DataTable.View.getColumnType(index);
        }

        if (this.config.arrColType["col_" + index] === "string") {
            if (!strSearchWrapper.classList.contains('active')) {
                strSearchWrapper.classList.add('active');
            }
            if (dateSearchWrapper.classList.contains('active')) {
                dateSearchWrapper.classList.remove('active');
            }
            strSearchWrapper.getElementsByClassName("inpt-search")[0].dataset.colIndex = index;
            strSearchWrapper.getElementsByClassName("inpt-search")[0].value = "";
            strSearchWrapper.getElementsByClassName("inpt-search")[0].focus();
        } else {

            if (strSearchWrapper.classList.contains('active')) {
                strSearchWrapper.classList.remove('active');
            }
            if (!dateSearchWrapper.classList.contains('active')) {
                dateSearchWrapper.classList.add('active');
            }

            dateSearchWrapper.getElementsByClassName("inpt-date")[0].dataset.colIndex = index;
            dateSearchWrapper.getElementsByClassName("inpt-date")[0].value = "";
            dateSearchWrapper.getElementsByClassName("inpt-date")[1].value = "";
            dateSearchWrapper.getElementsByClassName("inpt-date")[0].focus();
        }
    }
}
