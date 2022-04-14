/**
 *-------------------------------------------
 * GridTableSearchModule.js
 *-------------------------------------------
 * @version 1.0
 * @createAt 17.06.2020 17:30
 * @updatedAt 01.03.2022 14:52
 * @author NetCoDev
 *-------------------------------------------
 **/

class GridTableSearchModule extends GridModule
{
    constructor (listSelect, listData, config = {})
    {
        super();
        this.listSelect = listSelect;
        this.listData = listData;
        this.config = config;
        this.searchStr = "";
        this.searchValue = "";
        this.searchCount = 0;

        this.setSearchEvent();
    }

    setSearchEvent ()
    {
        if (this.listSelect.length) {
            [...this.listSelect].map(select => {
                select.addEventListener("change", () => {
                    this.searchCount = 0;
                    this.setDefaultSelect(select.name);

                    if (this.config?.watcher) {
                        GridStage.GridWatcher.runWatcher(this.config.watcher);
                    }
                    if (select.selectedIndex) {
                        this.searchStr = select.querySelectorAll('option')[select.selectedIndex].innerText;
                        this.searchValue = select.value;
                        this.setSearch(select.name);
                    } else {
                        this.setSearch('');
                    }
                });
            });
        }
    }

    setUpdate (container)
    {
        this.listData = container.querySelectorAll('tr.row-data');
    }

    setDefaultSelect (name)
    {
        [...this.listSelect].map(select => {
            if (select.name !== name) {select.selectedIndex = 0}
        });
    }

    setSearch (name) {
        if (this.listData) {
            let listShow = [];
            [...this.listData].map(row => {
                let rowDisplay = "table-row";
                if (this.searchStr && name || this.searchValue && name) {
                    const searchCell = row.querySelector('td[data-search-column="' + name + '"]');
                    if (searchCell) {
                        rowDisplay = (this.checkSearch(searchCell)) ? "table-row" : "none";
                    } else {
                        rowDisplay = "none";
                    }
                    if (rowDisplay === "table-row") {
                        this.searchCount++;
                        listShow.push(row);
                    }
                }
            });
            if (listShow.length) {
                this.setRowDisplay(this.listData, "none");
                this.setRowDisplay(listShow, "table-row");
            } else {
                this.setRowDisplay(this.listData, "table-row");
            }
        }
    }

    setRowDisplay (list, display)
    {
        [...list].map(row => row.style.display = display);
    }

    checkSearch (searchCell)
    {
        const searchInput = searchCell.querySelector('input');
        const searchSelect = searchCell.querySelector('select');
        let result = true;
        if(searchInput || searchSelect) {
            if (searchInput?.value && searchInput.value !== this.searchStr
                || searchSelect?.value && searchSelect.value !== this.searchValue
            ) {
                result = false;
            }
        } else if (searchCell.innerText !== this.searchStr) {
            result = false;
        }

        return result;
    }
}

