/**
 *-------------------------------------------
 * GridUi.js
 *-------------------------------------------
 * @version 1.0
 * @createAt 17.06.2020 17:30
 * @updatedAt 01.03.2022 14:52
 * @author NetCoDev
 *-------------------------------------------
 **/
class GridUi
{
    static closest (selector, obj)
    {
        const selectorArgs = (selector.match(/\./)) ? selector.split('.').slice(1) : [];
        const datasetArgs = (selector.match(/^\[/)) ? selector : "";

        if (datasetArgs.length && GridUi.checkDataSet(obj.parentElement,datasetArgs)) {
            return obj.parentElement;
        } else if (selectorArgs.length && GridUi.checkClassList(obj.parentElement,selectorArgs)) {
            return obj.parentElement;
        } else if (obj.parentElement.hasAttribute("class") && obj.parentElement.classList.contains(selector)) {
            return obj.parentElement;
        } else if (obj.parentElement.nodeName.toLowerCase() === selector) {
            return obj.parentElement;
        } else {
            if (obj.parentElement.nodeName.toLowerCase() !== 'body') {
                return GridUi.closest(selector, obj.parentElement)
            } else {
                return null;
            }
        }
    }

    static requestStatus (res)
    {
        return !!(res.hasOwnProperty('status') && res.status === 'success');
    }

    static checkDataSet (obj, datasetArgs)
    {
        let result = false;
        let keyArgs = "";
        let key = "";
        let value = "";

        datasetArgs = datasetArgs.replace("[", "");
        datasetArgs = datasetArgs.replace("]", "");
        datasetArgs = datasetArgs.replace("'['", "");
        datasetArgs = datasetArgs.replace('"', "");
        datasetArgs = datasetArgs.replace('data-', "");
        keyArgs = datasetArgs;

        if (datasetArgs.match(/=/)) {
            datasetArgs = datasetArgs.split('=');
            keyArgs = datasetArgs[0];
            value = (datasetArgs.length > 1) ? datasetArgs[1] : "";
        }

        keyArgs = keyArgs.split("-");
        key = keyArgs[0];

        for(let i = 1; i < keyArgs.length; i++) { key += keyArgs[i].charAt(0).toUpperCase() + keyArgs[i].slice(1)}
        
        if (obj.dataset.hasOwnProperty(key)) {
            
            result = true;

            if (value && this.dataSetValue(obj, key) !== value) {
                result = false;
            }
        }

        return result;
    }

    static checkDate (arrDate)
    {
        let result = false;

        if (arrDate.length && arrDate.length === 3) {
            
            const check = new Date(arrDate[0]+"-"+arrDate[1]+"-"+arrDate[2]);
            result = (check.toString() !== "Invalid Date");
        }
        
        return result;
    }

    static checkDateRange (from, to)
    {
        const startArg = from.split('.');
        const endArg = to.split('.');
        const startDate = new Date(startArg[1]+"/"+startArg[0]+"/"+startArg[2]).getTime();
        const endDate = new Date(endArg[1]+"/"+endArg[0]+"/"+endArg[2]).getTime();
        
        return (startArg <= endArg);
    }

    static checkClassList (obj, listClass)
    {
        const getClassName = (arguments.length > 2) ? arguments[2] : 0;
        let result = (getClassName) ? '' : true;

        for (let e in listClass) {
            if (getClassName) {
                if (obj.classList.contains(listClass[e])) {
                    result = listClass[e];
                    break;
                }
            } else {
                if (!obj.classList.contains(listClass[e])) {
                    result = false;
                    break;
                }
            }
        }
    }

    static checkDataChanged (list)
    {
        let result = false;

        list.map((obj) => {

            const value = obj.value.trim();

            if (GridUi.dataSetValue(obj, "cacheValue") && GridUi.dataSetValue(obj, "cacheValue") !== value) { result = true; }
        });

        return result;
    }

    static checkFormValidation (list)
    {
        const result = [];

        list.map((obj) => {

            const value = obj.value.trim();

            if (GridUi.dataSetValue(obj, "required") && value === '') {
                result.push(obj.title);
            }
        });

        return result;
    }

    static checkScrollEnd (y, statusObj) {
        if ((window.scrollY || document.body.scrollTop || document.documentElement.scrollTop) < y) {
            window.requestAnimationFrame(() => {GridUi.checkScrollEnd(y, statusObj)});
        } else {
            statusObj.status = 0;
        }
    }

    static formList (container)
    {
        return [
            ...container.querySelectorAll("input"),
            ...container.querySelectorAll("select"),
            ...container.querySelectorAll("textarea"),
        ];
    }

    static formListToData (formList)
    {
        const formData = new FormData();
        const emptyKeys = [];

        if (formList.length) {
            formList.map((elmn) => {

                formData.append(elmn.name, elmn.value.trim());
                
                if (elmn.value === "") {
                    emptyKeys.push(elmn.name);
                }
            });
        }

        return {formData : formData, emptyKeys : emptyKeys};
    }

    static formData (arrArgs)
    {
        const formData = new FormData();

        for (let e in arrArgs) {
            formData.append(e, arrArgs[e]);
        }

        return formData;
    }

    static formPostList (formList)
    {
        let result = [];
        formList.map($element => {result[$element.name] = $element.value.trim()});

        return result;
    }

    static formPostData (arrArgs)
    {
        const formData = this.formData(arrArgs);
        const result = Array
            .from(formData.entries())
            .reduce((m, [ key, value ]) => Object.assign(m, { [key]: value }), {});

        return result;
    }
    
    static formFileData (id, appType, arrArgs)
    {
        const formData = new FormData();
        
        for (let i = 0; i < arrArgs.length; i++) {
            
            const file = arrArgs[i];
            
            // Check file type is allowed in appType
            if (!appType.includes(file.type)) {
                continue;
            }
        
            // Add file data
            formData.append(id, file, file.name);
        }

        return formData;
    }

    static updateCacheValue (list)
    {
        list.map((obj) => {
            if (GridUi.dataSetValue(obj, "cacheValue")) { obj.dataset.cacheValue = obj.value.trim(); }
        });
    }

    static resetFromCacheValue (list)
    {
        list.map((obj) => {
            const cacheValue = GridUi.dataSetValue(obj, "cacheValue");
            if (cacheValue && cacheValue !== obj.value) { 
                obj.value = GridUi.dataSetValue(obj, "cacheValue");
            }
        });
    }

    static updateSelectSequence (tbody)
    {
        const list = tbody.querySelectorAll('tr.row-formAddImport');
        [...list].map((row) => {

            const containerIndex = GridUi.getIndex(tbody, 'tr.row-formAddImport', row);
            const inptSequenceId = row.querySelector("input[name='sequence_id']");

            row.querySelector('select.sequence-select').innerHTML = "";

            if (inptSequenceId) { inptSequenceId.value = containerIndex + 1; }

            for (let i = 1; i <= list.length; i++) {
                const option = document.createElement("option");
                option.value = i;
                option.innerHTML = i;
                row.querySelector('select.sequence-select').appendChild(option);
            }
            row.querySelector('select.sequence-select').selectedIndex = containerIndex;
        });
    }

    static dataSetValue (obj, key)
    {
        return (obj.dataset?.[key]) ? obj.dataset[key] : '';
    }

    static getIndex (container, selector, obj)
    {
        const list = Array.prototype.slice.call( container.querySelectorAll(selector) );

        return list.indexOf(obj);
    }

    static getJsonFromStr (key, str)
    {
        let result = null;

        try {
            const jsonObj = JSON.parse(str);

            if (typeof jsonObj === 'object' && jsonObj.hasOwnProperty(key)) {result = jsonObj.key;}
        }
        catch(err) {
            if (err && err.message.length) {
                result = null;
            }
        }

        return result;
    }

    static listHasUniqueValue (list, value, limit)
    {
        let count = 0;

        list.map(obj => {
            if (obj.value === value) {
                count++;
            }
        });

        return (count <= limit);
    }

    static renderDom (conf, parent)
    {
        conf.map((obj) => {

            const element = document.createElement(obj.tag);

            if (obj.selectorAttr === "class") {
                element.classList.add(...obj.selector);
            } else {
                element.setAttribute(obj.selectorAttr, obj.selector);
            }

            if (obj.hasOwnProperty("textNode")) {
                element.append(obj.textNode)
            }

            if (obj.hasOwnProperty("childNodes")) {
                GridUi.renderDom(obj.childNodes, element);
            }

            parent.append(element);
        });
    }

    static renderDatasetList (listDataElements, data)
    {
        if (listDataElements.length) {
            [...listDataElements].map(obj => {
                const key = GridUi.dataSetValue(obj,"gridEditKey");
                if (key && data.hasOwnProperty(key)) {
                    if (typeof data[key] === 'object' && data[key].hasOwnProperty('length')) {
                        data[key] = data[key].join('<br>');
                    }
                    obj.innerHTML = data[key];
                }
            });
        }
    }
}