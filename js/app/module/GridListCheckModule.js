/**
 *-------------------------------------------
 * GridListCheckModule.js
 *-------------------------------------------
 * @version 1.0
 * @createAt 17.06.2020 17:30
 * @updatedAt 01.03.2022 14:52
 * @author NetCoDev
 *-------------------------------------------
 **/

class GridListCheckModule extends GridModule
{
    constructor (container, config = {})
    {
        super();
        this.config = config;
        this.checkLength = 0;
        this.listCheckBoxAll = container.querySelector('input.check-all');
        this.listCheckBoxItem = container.querySelectorAll('input.check-item');
        this.eventConfig = [
            {container: container, selector : "input.check-all", action : "click", callBack : "setCheckAll"},
            {container: container,selector : "input.check-item", action : "click", callBack : "setCheckItem"},
        ];

        this.setEvents();
    }

    setUpdate (container)
    {
        this.listCheckBoxAll = container.querySelector('input.check-all');
        this.listCheckBoxItem = container.querySelectorAll('input.check-item');
        this.setEvents([
            {container: container, selector: "input.check-all", action: "click", callBack: "setCheckAll"},
            {container: container, selector: "input.check-item", action: "click", callBack: "setCheckItem"},
        ]);
    }

    setCheckAll ()
    {
        this.checkLength = 0;
        [...this.listCheckBoxItem].map(item => {
            const $formContainer = GridUi.closest('tr', item);
            if ($formContainer.style.display === "" || $formContainer.style.display !== "none") {
                item.checked =  this.listCheckBoxAll.checked;
                this.setCheckItem(item, this.listCheckBoxAll.checked);
            }
        });
        if (!this.listCheckBoxAll.checked) {
            this.setInfo();
        }
    }

    setCheckItem (obj, changeImportLength = true)
    {
        const $formContainer = GridUi.closest('tr', obj);
        const classAction = (obj.checked) ? "add" : "remove";

        [...$formContainer.querySelectorAll("td")].map($td => {
            $td.classList[classAction]("checked");
        });
        if (changeImportLength) {
            this.checkLength = (obj.checked) ? this.checkLength + 1 : this.checkLength - 1;
            this.setInfo();
        }
    }

    getListChecked ()
    {
        const result = [];
        [...this.listCheckBoxItem].map(item => {if(item.checked) {result.push(item)}});

        return result;
    }

    resetCheck (setInfo = true)
    {
        this.listCheckBoxAll.checked = false;
        [...this.listCheckBoxItem].map(item => {
            item.checked =  false;
            this.setCheckItem(item, false);
        });
        this.checkLength = 0;
        if (setInfo) {
            this.setInfo();
        }
    }

    setInfo ()
    {
        if (this.config?.watcher) {
            GridStage.GridWatcher.runWatcher(this.config.watcher);
        }
    }
}

