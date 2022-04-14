/**
*-------------------------------------------
* DateTimePicker.js
*-------------------------------------------
* @version 2.4.1
* @createAt 28.02.2022 17:14
* @updatedAt 05.03.2022 14:52
* @author NetCoDev
*-------------------------------------------
**/

/** 
*------------------------------------------- 
* DateTimeUi
*------------------------------------------- 
**/ 
class DateTimeUi {

    static regExDate = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
    static regExDateTime = /^\d{2}[./-]\d{2}[./-]\d{4}[\s]\d{2}[:]\d{2}$/;
    static regExTime = /^\d{2}[:]\d{2}$/;
    static selectorConfig = {
        "timePicker": {
            'selector': 'time-picker',
            'container': 'time-picker-container',
            'timeItem': 'time-item',
            'timeHidden': 'time-hidden',
            'timeSelected': 'time-selected',
            'dataTimeSpace': 'timeSpace',
            'timeFrom': 'time-from',
            'timeTo': 'time-to',
            'itemList': 'time-item-list',
        },
        "timeRange": {
            'selector': 'time-picker',
            'container': 'time-range-container',
            'btnRange': 'btn-range',
            'hour': 'hour',
            'min': 'min',
            'goBack': 'back',
        },
        "datePicker": {
            "container": "date-picker-container",
            "buildInContainer": "build-in-container",
            "buildIn": "build-in",
            "btnChange": "btn-change",
            "dateFrom": "date-from",
            "dateTo": "date-to",
            "day": "day",
            "dayItem": "day-item",
            "empty": "empty",
            "goBack": "back",
            "goForward": "forward",
            "year": "year",
            "selector": "date-picker",
            "selected": "selected",
            "today": "today",
            "notSelectable": "not-selectable",
            "month": "month",
            "pickerDays": "picker-days",
            "pickerLabelDays": "picker-label-days",
            "pickerLabelYear": "picker-label-year",
            "pickerDropdown": "picker-dropdown",
            "pickerDropdownSelect": "picker-dropdown-select",
        },
        "dateTimePicker": {
            "selector": "date-time-picker",
            "container": "date-time-picker-container",
            "dateFrom": "date-from",
            "dateTo": "date-to",
        },
        "minDate": {
            dataSetKey: 'minDate',
            selector: 'data-min-date',
        },
        "maxDate": {
            dataSetKey: 'maxDate',
            selector: 'data-max-date',
        },
        "minTime": {
            dataSetKey: 'minTime',
            selector: 'data-min-time',
        },
        "timeSpace": {
            dataSetKey: 'timeSpace',
            selector: 'data-time-space',
        },
        "maxTime": {
            dataSetKey: 'maxTime',
            selector: 'data-max-time',
        },
        "minRange": {
            dataSetKey: 'minRange',
            selector: 'data-min-range',
        },
        "maxRange": {
            dataSetKey: 'maxRange',
            selector: 'data-max-range',
        },
    };

    static lang = {
        "default": "de",
        "available": ["de"],
    }

    static dateLang = {
        "de": {
            "month": ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
            "weekDays": ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
        }
    }

    static pickerTemplate = {
        'date-time-picker': {tag: 'div', classCss: 'date-time-picker-container'},
        'date-picker': {tag: 'div', classCss: 'date-picker-container', children: [
                {tag: 'div', classCss: 'picker-ctrl,picker-flex', children: [
                        {tag: 'div', classCss: 'btn-change,back,year', children: [{tag: 'div', classCss: '', content: '<'}]},
                        {tag: 'div', classCss: 'picker-label-year'},
                        {tag: 'div', classCss: 'btn-change,forward,year', children: [{tag: 'div', classCss: '', content: '>'}]},
                    ]},
                {tag: 'div', classCss: 'picker-ctrl', children: [
                        {tag: 'div', classCss: 'picker-flex', children: [
                                {tag: 'div', classCss: 'btn-change,back,month', children: [{tag: 'div', classCss: '', content: '<'}]},
                                {tag: 'div', classCss: 'picker-label-month', children: [{tag: 'div', classCss: 'picker-dropdown', data: 'data-value'}]},
                                {tag: 'div', classCss: 'btn-change,forward,month', children: [{tag: 'div', classCss: '', content: '>'}]},
                            ]},
                        {tag: 'div', classCss: 'picker-dropdown-select'},
                    ]},
                {tag: 'div', classCss: 'picker-label-days'},
                {tag: 'div', classCss: 'picker-days'},
            ]
        },
        'time-picker': {tag: 'div', classCss: 'time-picker-container', children: [
            {tag: 'div', classCss: 'time-range-container', children: [
                    {tag: 'div', classCss: 'range-row', children: [
                            {tag: 'div', classCss: 'btn-range,back,hour,space-left', content: '<'},
                            {tag: 'div', classCss: 'range-label', children: [{tag: 'span', classCss: 'txtTime,active'}, {tag: 'span', classCss: 'txtTime'}]},
                            {tag: 'div', classCss: 'btn-range,forward,hour', content: '>'},
                        ]},
                    {tag: 'div', classCss: 'range-row', children: [
                            {tag: 'div', classCss: 'btn-range,back,minute,space-left', content: '<'},
                            {tag: 'div', classCss: 'range-label', children: [{tag: 'span', classCss: 'txtTime'}, {tag: 'span', classCss: 'txtTime,active'}]},
                            {tag: 'div', classCss: 'btn-range,forward,minute', content: '>'},
                        ]},
            ]},
            {tag: 'div', classCss: 'time-item-list'},
        ]},
    };

    static setDefaultLang(lang) {
        if (this.lang.available.includes(lang)) {
            this.lang.default = lang;
        }
    }

    static selector(keys) {
        return this.getObjMapper(keys, this.selectorConfig);
    }

    static setCallerDate(config) {
        config.callerDateArgs = [];
        if (config.value) {
            const dateObj = this.getDateObj(config.value);
            config.callerDateArgs = dateObj.callerDateArgs;
            config.callerDate = dateObj.callerDate;
        }
    }

    static setConfDate(config, configArgs = null) {
        const dateArgs = (configArgs !== null) ? configArgs : config.callerDateArgs;
        const d = (dateArgs.length) ? new Date(...dateArgs) : new Date();
        let confDate = {weekDay: d.getDay(), day: d.getDate()*1, month: d.getMonth(), year: d.getFullYear()};
        confDate.days = new Date(confDate.year, confDate.month + 1, 0).getDate();
        confDate.minDay = (config.options.minDateObj) ? this.getMinMax(config, 'minDateObj', 'day', confDate) : '';
        confDate.maxDay = (config.options.maxDateObj) ? config.options.maxDateObj.callerDate.day : '';
        confDate.minMonth = (config.options.minDateObj) ? this.getMinMax(config, 'minDateObj', 'month', confDate) : '';
        confDate.maxMonth = (config.options.maxDateObj) ? config.options.maxDateObj.callerDate.month : '';
        confDate.minYear = (config.options.minDateObj) ? this.getMinMax(config, 'minDateObj', 'year', confDate) : '';
        confDate.maxYear = (config.options.maxDateObj) ? config.options.maxDateObj.callerDate.year : '';
        config.confDate = confDate;
    }

    static setRange(pickerObj, key) {
        if (pickerObj.config.inputTo && pickerObj.config.options[key]) {
            const pickerObjTo = PickerObj.getPickerObjTo(pickerObj);
            const nextDay = this.getRangeDate(pickerObj.config, key);
            const dataSetKey = (key === 'minRange') ? 'minDate' : 'maxDate';
            this.setElementDataSet(pickerObj.config.inputTo, pickerObj.attrData[dataSetKey].dataSetKey, pickerObj.attrData[dataSetKey].selector, nextDay);
            if (pickerObjTo) {
                if (!pickerObj.hasOwnProperty('DateObj')) {
                    pickerObjTo.proxy.setValue(dataSetKey, nextDay);
                    if (typeof pickerObjTo.viewProxy !== 'undefined' && this.checkMinMaxViewUpdate(pickerObj)) {
                        pickerObj.viewProxy.setValue('updateDateView', pickerObjTo);
                    }
                } else {
                    pickerObjTo.setOptionsMinMaxDate();
                    pickerObjTo.setInput(pickerObjTo.config.value);
                    pickerObj.viewProxy.setValue('updateDateTimeView', pickerObjTo);
                }
            }
        }
    }

    static setElementDataSet(element, dataSetKey, selector, value) {
        if (element !== null) {
            if (dataSetKey !== '' && dataSetKey in element.dataset) {
                element.dataset[dataSetKey] = value;
            } else {
                element.setAttribute(selector, value);
            }
        }
    }

    static setEvents(instance, eventObjs) {
        if (eventObjs.length) {
            eventObjs.map(eventObj => {
                [...eventObj.container.getElementsByClassName(eventObj.selector)].map($e => {
                    $e[eventObj.action] = () => {
                        if ('callBackProps' in eventObj) {
                            instance[eventObj.callBack]($e, eventObj.callBackProps);
                        } else {
                            instance[eventObj.callBack]($e);
                        }
                    };
                });
            });
        }
    }

    static setMinMaxDate(pickerObj, key) {
        if (pickerObj.config.options[key] !== '') {
            const checkAgs = (key === 'minDate') ? [pickerObj.config.options[key], pickerObj.config.value] : [pickerObj.config.value, pickerObj.config.options[key]];
            if (!this.checkDateRange(...checkAgs)) {
                if (key === 'maxDate') {
                    pickerObj.updateConfDateMinMax();
                    pickerObj.setInput('');
                } else {
                    pickerObj.setInput(pickerObj.config.options[key]);
                }
            }
            if (pickerObj.config.value && this.checkDateRange(...checkAgs)) {
                this.updateConfDateMinMax(pickerObj);
            }
        }
    }

    static setEmbedTimeMinMax(DateTimeConfig, TimeConfig, dateTime) {
        const minDateTime = DateTimeConfig.options.minDate;
        const maxDateTime = DateTimeConfig.options.maxDate;
        if (minDateTime) {
            TimeConfig.options.minTime = (dateTime === minDateTime) ? DateTimeConfig.options.time.minTime : '';
            TimeConfig.options.minMinute = (dateTime === minDateTime) ? DateTimeConfig.options.time.minMinute : '';
        }
        if (maxDateTime) {
            TimeConfig.options.maxTime = (dateTime === maxDateTime) ? DateTimeConfig.options.time.maxTime : '';
            TimeConfig.options.maxMinute = (dateTime === maxDateTime) ? DateTimeConfig.options.time.maxMinute : '';
        }
    }

    static getPosLeft(element) {
        let posLeft = (element.offsetLeft - element.parentElement.offsetLeft + window.scrollX);
        return (posLeft < 0) ? element.offsetLeft : posLeft;
    }

    static getMinMax(config, key, dateKey, confDate) {
        let result = '';
        if (config.options[key].callerDate.year === confDate.year
            && config.options[key].callerDate.month === confDate.month) {
            result = config.options[key].callerDate[dateKey];
        }

        return result;
    }

    static getDataset(input) {
        return (typeof input.dataset !== 'undefined' && input.dataset !== '') ? input.dataset : null;
    }

    static getConfig(pickerObj, key) {
        return (pickerObj.config.hasOwnProperty(key)) ? pickerObj.config[key] : '';
    }

    static getAttrData() {
        return {
            "minDate": this.selector(["minDate"]),
            "maxDate": this.selector(["maxDate"]),
            "minRange": this.selector(["minRange"]),
            "maxRange": this.selector(["maxRange"])
        };
    }

    static getDefaultLang() {
        return this.lang.default;
    }

    static getDateLang(keys) {
        return this.getObjMapper(keys, this.dateLang);
    }

    static getObjMapper(arrKeys, obj) {
        const keysLength = arrKeys.length;
        let index = 0;
        let result = '';
        let keyExists = true;
        if (keysLength) {
            arrKeys.map(key => {
                if (index === 0 && obj.hasOwnProperty(key)) {
                    result = (typeof obj[key] === 'string') ? obj[key] : {...obj[key]};
                } else if (index && result.hasOwnProperty(key)) {
                    result = result[key];
                } else {
                    if (!obj.hasOwnProperty(key) || !result.hasOwnProperty(key)) {
                        keyExists = false;
                    }
                }
                index++;
            });
        }
        return (keyExists) ? result : null;
    }

    static getDateAsArray(strDate) {
        let result = [];
        if (this.regExDateTime.test(strDate)) {
            result = strDate.split(' ');
            result[0] = result[0].trim().split('.');
            result[1] = result[1].trim().split(':');
            result = [...result[0], ...result[1]];
        } else if (this.regExDate.test(strDate)) {
            result = strDate.split('.');
        }
        return result;
    }

    static getElementByIndex(index, list) {
        return (list.length && list.length > index) ? list[index] : null;
    }

    static getNextIndex(selector, $element) {
        const $elements = document.getElementsByClassName(selector);
        const hasClass = (arguments.length > 2) ? arguments[2] : '';
        let index = 0;
        let nextIndex = 0;
        [...$elements].map($e => {
            if ($element === $e) {
                if (hasClass === '') {
                    nextIndex = index + 1;
                } else {
                    if ($elements.length > index + 1
                        && $elements[index + 1].classList.contains(hasClass)) {
                        nextIndex = index + 1;
                    }
                }
            }
            index++;
        });
        return nextIndex;
    }

    static getDayIndexNow() {
        const d = new Date();
        let dayIndexNow = d.getDay();
        dayIndexNow = (dayIndexNow === 0) ? 6 : dayIndexNow - 1
        return dayIndexNow;
    }

    static getDateTimeObj(dateTime) {
        const obj = {date: '', dateObj: '', time: '', timeObj: '', minutes: 0};
        if (this.regExDateTime.test(dateTime)) {
            dateTime = dateTime.split(' ');
            obj.date = dateTime[0];
            obj.time = dateTime[1];
            obj.minutes = this.getMinutes(dateTime[1]);
            obj.dateObj = this.getDateObj(dateTime[0]);
            obj.timeObj = this.getTimeObj(obj.minutes);
        }
        return obj;
    }


    static getDateObj(value) {
        const obj = {callerDateArgs: [], callerDate: {}};
        let inputDate = this.getDateAsArray(value);
        if (inputDate.length >= 3) {
            const month = (inputDate[1] * 1) - 1;
            obj.callerDateArgs = (inputDate.length === 3) ? [inputDate[2], month, inputDate[0]] : [inputDate[2], month, inputDate[0], inputDate[3] * 1, inputDate[4] * 1];
            const d = new Date(...obj.callerDateArgs);
            obj.callerDate = {weekDay: d.getDay(), day: d.getDate(), month: d.getMonth(), year: d.getFullYear(), hour: d.getHours(), minutes: d.getMinutes()};
            obj.callerDate.days = new Date(obj.callerDate.year, obj.callerDate.month + 1, 0).getDate();
        }
        return obj;
    }

    static getTimeObj(minutes) {
        let min = minutes % 60;
        let hour = (minutes - min) / 60;
        min = (min < 10) ? "0" + min : min;
        hour = (hour < 10) ? "0" + hour : hour;
        return {hour: hour, min: min, toString: hour + ":" + min};
    }

    static getMinutes(time) {
        const value = time.split(':');
        return ((value[0]*1) * 60 + value[1]*1);
    }

    static getNextDate(args, range) {
        range = range * 1;
        let next = (args.length === 3)
            ? new Date(args[0] * 1, args[1], args[2] * 1, 0, range)
            : new Date(args[0] * 1, args[1], args[2] * 1, args[3], (args[4] * 1) + range);

        return next;
    }

    static getValidDate(date, config) {
        date = (config.regEx.test(date)) ? date.trim() : config.valueCache;
        return (date) ? date : DateTimeUi.getLocaleDateString(config.now, config.format);
    }

    static getLocaleDateString(objDate, format) {
        const options = {
            "date": {year: 'numeric', month: '2-digit', day: '2-digit'},
            "dateTime": {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}
        };
        return objDate.toLocaleDateString('de-DE', options[format]).replace(',', '');
    }

    static getRangeDate(config, key) {
        const dateObj = (config.value) ? DateTimeUi.getDateObj(config.value) : null;
        return (dateObj) ? DateTimeUi.getLocaleDateString(DateTimeUi.getNextDate(dateObj.callerDateArgs, config.options[key]), config.format) : '';
    }

    static getRangeTime(config, key) {
        const value = config.value.split(':');
        const time = ((value[0]*1) * 60 + value[1]*1) + config.options[key]*1;
        let newMinute = time % 60;
        let newHour = (time - newMinute) / 60;
        newMinute = (newMinute < 10) ? "0" + newMinute : newMinute;
        newHour = (newHour < 10) ? "0" + newHour : newHour;

        return newHour + ":" + newMinute
    }

    static getConfDate(pickerObj, key) {
        return (pickerObj.config.confDate.hasOwnProperty(key)) ? pickerObj.config.confDate[key] : '';
    }

    static checkMinMaxViewUpdate(pickerObj) {
        const minYear = pickerObj.getOptions(['minDateObj','callerDate','year']);
        const minMonth = pickerObj.getOptions(['minDateObj','callerDate','month']);
        const maxYear = pickerObj.getOptions(['maxDateObj','callerDate','year']);
        const maxMonth = pickerObj.getOptions(['maxDateObj','callerDate','month']);
        const confYear = this.getConfDate(pickerObj, 'year');
        const confMonth = this.getConfDate(pickerObj, 'month');
        return !!(minYear >= confYear && minMonth >= confMonth || maxYear <= confYear && maxMonth <= confMonth);
    }

    static getPickerTemplate(selector) {
        return DateTimeUi.getHtmlTag(DateTimeUi.pickerTemplate[selector]);
    }

    static getHtmlTag(tagObj) {
        const $element = document.createElement(tagObj.tag);
        if (tagObj.classCss !== '') {
            const css = tagObj.classCss.split(',');
            $element.classList.add(...css);
        }
        if (tagObj.hasOwnProperty('children')) {
            tagObj.children.map($child => {
                $element.append(this.getHtmlTag($child));
            });
        }
        if (tagObj.hasOwnProperty('content')) {
            $element.innerText = tagObj.content;
        }
        if (tagObj.hasOwnProperty('data')) {
            DateTimeUi.setElementDataSet($element, '', tagObj.data, '');
        }
        return $element;
    }

    static closest(selector, obj) {
        const selectorArgs = (selector.match(/\./)) ? selector.split('.').slice(1) : [];
        const datasetArgs = (selector.match(/^\[/)) ? selector : "";

        if (datasetArgs.length && DateTimeUi.checkDataSet(obj.parentElement, datasetArgs)) {
            return obj.parentElement;
        } else if (selectorArgs.length && DateTimeUi.checkClassList(obj.parentElement, selectorArgs)) {
            return obj.parentElement;
        } else if (obj.parentElement.hasAttribute("class") && obj.parentElement.classList.contains(selector)) {
            return obj.parentElement;
        } else if (obj.parentElement.nodeName.toLowerCase() === selector) {
            return obj.parentElement;
        } else {
            if (obj.parentElement.nodeName.toLowerCase() !== 'body') {
                return DateTimeUi.closest(selector, obj.parentElement)
            } else {
                return null;
            }
        }
    }
    static checkActualDay(config, day) {
        return (config.callerDate.day === day
            && config.callerDate.month === config.confDate.month
            && config.callerDate.year === config.confDate.year);
    }

    static checkToday(config, day) {
        return !!(day === config.now.getDate()
            && config.confDate.month === config.now.getMonth()
            && config.confDate.year === config.now.getFullYear()
        )
    }

    static checkIsSelectableDay(config, day) {
        return !(config.confDate.minDay && config.confDate.minDay > day
            && config.confDate.month === config.confDate.minMonth * 1
            && config.confDate.year === config.confDate.minYear * 1
            || config.confDate.maxDay && config.confDate.maxDay < day
            && config.confDate.month === config.confDate.maxMonth * 1
            && config.confDate.year === config.confDate.maxYear * 1);
    }

    static checkIsNotSelectableMonth(config, month) {
        return !!(config.confDate.minMonth
            && config.confDate.minMonth > month
            && config.confDate.minYear * 1 === config.confDate.year
            || config.confDate.maxMonth
            && config.confDate.maxMonth < month
            && config.confDate.maxYear * 1 === config.confDate.year
        );
    }

    static checkUpdateConfDate(pickerObj) {
        const confDateYear = this.getConfDate(pickerObj, 'year');
        const confDateMonth = this.getConfDate(pickerObj, 'month');
        const minYear = pickerObj.getOptions(['minDateObj','callerDate','year']);
        const minMonth = pickerObj.getOptions(['minDateObj','callerDate','month']);
        const maxYear = pickerObj.getOptions(['maxDateObj','callerDate','year']);
        const maxMonth = pickerObj.getOptions(['maxDateObj','callerDate','month']);
        if (confDateYear === '') {
            return true;
        }
        if (confDateYear && minYear || confDateYear && maxYear) {
            if (minYear && minYear > confDateYear || minMonth && minMonth > confDateMonth && minYear === confDateYear) {
                return true;
            }
            if (maxYear && maxYear < confDateYear || maxMonth && maxMonth < confDateMonth && maxYear === confDateYear) {
                return true;
            }
            if (confDateYear === pickerObj.config.callerDate.year && confDateMonth === pickerObj.config.callerDate.month) {
                return true;
            }
        }
        if (confDateYear === pickerObj.config.callerDate.year && confDateMonth === pickerObj.config.callerDate.month) {
            return true;
        }

        return false;
    }

    static checkDataSet(obj, datasetArgs) {
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

        for (let i = 1; i < keyArgs.length; i++) {
            key += keyArgs[i].charAt(0).toUpperCase() + keyArgs[i].slice(1)
        }

        if (obj.dataset.hasOwnProperty(key)) {

            result = true;

            if (value && this.dataSetValue(obj, key) !== value) {
                result = false;
            }
        }

        return result;
    }

    static checkTimeDiff(objTime) {
        let firstTime = objTime.firstTime.replace(':', '') * 1;
        let secondTime = objTime.secondTime.replace(':', '') * 1;
        return (firstTime >= secondTime);
    }

    static checkDate(arrDate) {
        let result = false;
        if (arrDate.length && arrDate.length === 3) {
            const check = new Date(arrDate[0] + "-" + arrDate[1] + "-" + arrDate[2]);
            result = (check.toString() !== "Invalid Date");
        }

        return result;
    }


    static checkClassList(obj, listClass) {
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

        return result;
    }

    static checkDateRange(from, to) {
        const startArg = this.getDateAsArray(from);
        const endArg = this.getDateAsArray(to);
        const startDate = (startArg.length === 3)
            ? new Date(startArg[2], startArg[1], startArg[0]).getTime()
            : new Date(startArg[2], startArg[1], startArg[0], startArg[3], startArg[4]).getTime();
        const endDate = (endArg.length === 3)
            ? new Date(endArg[2], endArg[1], endArg[0]).getTime()
            : new Date(endArg[2], endArg[1], endArg[0], endArg[3], endArg[4]).getTime();
        return (startDate <= endDate);
    }

    static checkTimeRange(from, to) {
        return (from * 1 <= to * 1);
    }

    static dataSetValue(obj, key) {
        return (key in obj.dataset) ? obj.dataset[key] : '';
    }

    static updateConfDateMinMax(pickerObj) {
        const minDate = pickerObj.getOptions(['minDateObj','callerDate']);
        const maxDate = pickerObj.getOptions(['maxDateObj','callerDate']);
        let newMinMax = {};
        if (minDate) {
            newMinMax = {"minDay": minDate.day, "minMonth": minDate.month, "minYear": minDate.year};
        }
        if (maxDate) {
            newMinMax = {...newMinMax, "maxDay": maxDate.day, "maxMonth": maxDate.month, "maxYear": maxDate.year};
        }
        if (minDate || maxDate) {
            for(let key in newMinMax) {
                pickerObj.config.confDate[key] = newMinMax[key];
            }
        }
    }
}
/** 
*------------------------------------------- 
* PickerProxy
*------------------------------------------- 
**/ 
class PickerProxy
{
    config;
    configHandler;
    configProxy;

    constructor(config, handler=null) {
        this.config = config;
        this.configHandler = handler;
        this.setConfigProxy();
    }

    setConfigProxy() {
        this.configProxy = new Proxy(this.config, this.configHandler);
    }

    setValue(key, value) {
        if (typeof key === 'string') {
            this.configProxy[key] = value;
        } else if (key.hasOwnProperty('key')) {
            key.map((arg)=>{
                this.configProxy[arg.key] = arg.value;
            })
        }
    }
}/** 
*------------------------------------------- 
* PickerObj
*------------------------------------------- 
**/ 
class PickerObj
{
    static index = null;
    static indexPreFix = 'dpo_';
    static listPickerObj = {};
    id;

    static autoIndex() {
        let index = 0;
        function getId() {
            index++;
            return index;
        }
        return getId;
    }

    static getIndex() {
        if (this.index === null) {
            this.index = this.autoIndex();
        }
        return this.indexPreFix + Date.now() + "_" + this.index();
    }

    static getObj(id) {
        return (this.listPickerObj.hasOwnProperty(id)) ? this.listPickerObj[id] : null;
    }

    static getPickerObjTo(pickerObj) {
        const pickerObjToId = (pickerObj.config.inputTo) ? DateTimeUi.dataSetValue(pickerObj.config.inputTo, "pickerId") : null;
        return this.getObj(pickerObjToId);
    }

    static setObj(id, obj) {
        this.listPickerObj[id] = obj;
    }

    get autoId() {
        return PickerObj.getIndex();
    }

    get id() {
        return this.id;
    }

    set id(id) {
        this.id = id;
    }
}
/** 
*------------------------------------------- 
* TimeObj
*------------------------------------------- 
**/ 
class TimeObj extends PickerObj
{
    id;
    pickerContainer;
    timeRangeObj;
    attrData;
    config;
    showPicker;
    viewProxy;
    timeProxy;

    constructor(config, pickerContainer, viewProxy) {
        super();
        this.id = (config.hasOwnProperty('id')) ? config.id: this.autoId;
        this.pickerContainer = pickerContainer;
        this.attrData = {
            "minTime": DateTimeUi.selector(["minTime"]),
            "maxTime": DateTimeUi.selector(["maxTime"]),
            "minRange": DateTimeUi.selector(["minRange"]),
            "maxRange": DateTimeUi.selector(["maxRange"])
        };
        this.config = {
            input: "",
            inputTo: "",
            selector: '',
            value: '',
            valueCache: '',
            minutes: 0,
            isEmbedded: false,
            embedDate: '',
            time: '',
            timeObj: {},
            format: 'time',
            regEx: DateTimeUi.regExTime,
            defaultMaxMinute: 1439,
            listRange: 15,
            listItems: [],
            options: {
                minTime: '',
                maxTime: '',
                minMinute: '',
                maxMinute: '',
                minRange: '',
                maxRange: '',
            }
        };
        this.showPicker = false;
        this.viewProxy = viewProxy;
        this.timeProxy = new PickerProxy({updateInput: ''}, {
            set: (target, key, value) => {
                switch(key) {
                    case'updateInput':
                        this.setInput(DateTimeUi.getTimeObj(value).toString);
                        break;
                    case'updateRange':
                        this.setInput(value, false);
                        break;
                    case'updateListItems':
                        this.setUpdateListItems(value);
                        break;
                    case'updateMinMaxTime':
                        this.setMinMaxTime(...value);
                        this.setInput(value[1], true);
                        break;
                    case'updateDateTimeObjTime':
                        if (typeof this.embedProxy !== 'undefined') {
                            this.embedProxy.setValue('updateTime', value);
                        }
                        break;
                }
                return true;
            }
        });
        this.setConfig(config);
        this.setOptions();
        if (!this.config.isEmbedded) {
            PickerObj.setObj(this.id, this);
            DateTimeUi.setElementDataSet(this.config.input, 'pickerId', 'data-picker-id', this.id);
            this.setInput(this.config.input.value);
            this.config.input.onchange = () => { this.setInput(this.config.input.value) };
        }
        this.timeRangeObj = new TimeRangeObj(this.config, this.pickerContainer.container, this.timeProxy);
    }

    setOptions() {
        const dataset = (typeof this.config.input.dataset !== 'undefined' && this.config.input.dataset !== '') ? this.config.input.dataset : null;
        if (dataset !== null) {
            for (let key in this.config.options) {
                if (key in dataset && dataset[key] !== '') {
                    switch (key) {
                        case'minTime':
                        case'maxTime':
                            this.config.options[key] = dataset[key];
                            break;
                        case'minRange':
                        case'maxRange':
                            this.config.options[key] = dataset[key]*1;
                            break;
                    }
                }
            }
        }
    }

    setConfig(config) {
        this.config = {...this.config, ...config};
        if (this.config.input.classList.contains(DateTimeUi.selector(["timePicker", "timeFrom"]))) {
            const selectorList = document.getElementsByClassName(this.config.selector);
            const nextIndex = DateTimeUi.getNextIndex(this.config.selector, this.config.input);
            const inputTo = DateTimeUi.getElementByIndex(nextIndex, selectorList);
            if (inputTo.classList.contains(DateTimeUi.selector(["timePicker", "timeTo"]))) {
                this.config.inputTo = inputTo;
            }
        }
    }

    setInput(value, setListItems = true) {
        const newTime = this.getValidInput(value);
        if (!this.config.isEmbedded) {
            this.config.input.value = newTime;
        }
        this.config.valueCache = newTime;
        this.config.value = newTime;
        ['minTime', 'maxTime'].map(key => { this.setMinMaxTime(key, this.config.options[key]) });
        this.setMinutes();
        this.setRange(setListItems);
        if(setListItems) {
            this.setListItems();
        }
        if(this.viewProxy) {
            this.viewProxy.setValue('updateTimeView', this);
        }
        if(this.timeRangeObj) {
            this.timeRangeObj.setLabel(this.config.minutes, 0);
        }
    }

    setListItems(selectedMinute = 0) {
        const startModulo = (this.config.options.minMinute) ? this.config.options.minMinute % this.config.listRange : 0;
        const endModulo = (this.config.options.maxMinute) ? this.config.options.maxMinute % this.config.listRange : 0;
        const start = (this.config.options.minMinute) ? this.config.options.minMinute - startModulo : 0;
        const end = (this.config.options.maxMinute) ? this.config.options.maxMinute - endModulo : this.config.defaultMaxMinute;
        this.config.listItems = [];
        for(let i = start; i < end; i += this.config.listRange) {
            const moduloResult = this.config.minutes % this.config.listRange;
            const item = {minutes: i, time: DateTimeUi.getTimeObj(i).toString};
            if (selectedMinute &&  selectedMinute === i
                || !selectedMinute && i === this.config.minutes - moduloResult) {
                item.selected = 'selected';
            }
            this.config.listItems.push(item);
        }
    }

    setUpdateListItems(selectedMinute) {
        this.setListItems(selectedMinute);
        if(this.viewProxy) {
            this.viewProxy.setValue('updateTimeView', this);
        }
    }

    setMinMaxTime(key, value) {
        const minuteKey = (key === 'minTime') ? 'minMinute' : 'maxMinute';
        this.config.options[key] = value;
        this.config.options[minuteKey] = DateTimeUi.getMinutes(value);
    }

    setRange(setListItems) {
        if (this.config.inputTo) {
            const keys = ['minRange', 'maxRange'];
            const pickerObjTo = PickerObj.getPickerObjTo(this);
            keys.map(key => {
                const nextTime = DateTimeUi.getRangeTime(this.config, key);
                const dataSetKey = (key === 'minRange') ? 'minTime' : 'maxTime';
                if (pickerObjTo) {
                    pickerObjTo.setMinMaxTime(dataSetKey,nextTime);
                }
                DateTimeUi.setElementDataSet(this.config.inputTo, this.attrData[dataSetKey].dataSetKey, this.attrData[dataSetKey].selector, nextTime);
            });
            if (pickerObjTo) {
                if (typeof pickerObjTo.viewProxy !== 'undefined') {
                    const minMaxKey = pickerObjTo.getMinMaxKey();
                    let value = pickerObjTo.config.value;
                    if (minMaxKey === 'max') {
                        value = DateTimeUi.getTimeObj((this.config.minutes + this.config.options.maxRange) -15).toString;
                    } else if (minMaxKey === 'min') {
                        value = this.config.value;
                    }
                    pickerObjTo.setInput(value,setListItems);
                }
            } else {
                this.config.inputTo.value = this.config.value;
            }
        }
    }

    setMinutes() {
        this.config.minutes = DateTimeUi.getMinutes(this.config.value);
        this.config.timeObj = DateTimeUi.getTimeObj(this.config.minutes);
    }

    getValidInput(value) {
        if (DateTimeUi.regExDateTime.test(value)) {
            value = value.split(' ')[1];
        }
        value = (this.config.regEx.test(value)) ? value.trim() : this.config.valueCache;
        value = (value) ? value : '00:00';

        const minTime = this.config.minTime;
        const maxTime = this.config.maxTime;
        if (value) {
            if (minTime && !DateTimeUi.checkTimeRange(DateTimeUi.getMinutes(minTime), DateTimeUi.getMinutes(value))) {
                if (this.config.valueCache !== value && DateTimeUi.checkTimeRange(minTime, this.config.valueCache)) {
                    value = this.config.valueCache;
                } else {
                    value = minTime;
                }
            }
            if (maxTime && !DateTimeUi.checkTimeRange( DateTimeUi.getMinutes(value), DateTimeUi.getMinutes(maxTime))) {
                if (this.config.valueCache !== value && DateTimeUi.checkTimeRange(this.config.valueCache, maxTime)) {
                    value = this.config.valueCache;
                } else {
                    value = maxTime;
                }
            }
        }

        return value;
    }

    getMinMaxKey() {
        return (this.config.options.minMinute && this.config.options.minMinute > this.config.minutes)
            ? 'min'
            : ((this.config.options.maxMinute && this.config.options.maxMinute <= this.config.minutes)
                ? 'max'
                : '');
    }
}/** 
*------------------------------------------- 
* TimeRangeObj
*------------------------------------------- 
**/ 
class TimeRangeObj
{
    constructor(config, container, parentProxy) {
        this.selectors =  DateTimeUi.selector(['timeRange']);
        this.config = config;
        this.parentProxy = parentProxy;
        this.time = '';
        this.moduloTime = this.config.minutes;
        this.stepHour = 60;
        this.stepMinute = 1;
        this.container = container.getElementsByClassName(this.selectors.container)[0];
        this.input = this.config.input;
        this.labels = [...this.container.querySelectorAll('.txtTime')];
        this.proxy = new PickerProxy({updateTimeRangeLabel: ''}, {
            set: (target, key, value) => {
                switch(key) {
                    case'updateTimeRangeLabel':
                        console.log('TimeRangeObj updateTimeRangeLabel',this.config.minutes)
                        this.moduloTime = this.config.minutes;
                        this.setLabel(this.config.minutes, 0);
                        this.parentProxy.setValue('updateDateTimeObjTime', this.time);
                        break;
                }
                return true;
            }
        });
        [...this.container.getElementsByClassName(this.selectors.btnRange)].map($btn => {
            $btn.addEventListener('click', () => {
                const key = ($btn.classList.contains(this.selectors.hour)) ? this.selectors.hour : this.selectors.min;
                const step = ($btn.classList.contains(this.selectors.hour)) ? this.stepHour : this.stepMinute;
                const counter = ($btn.classList.contains(this.selectors.goBack)) ? -step : +step;
                this.setRange(counter, key);
            });
        });
        this.setLabel(this.config.minutes, 0);
    }

    setInput() {
        const time = DateTimeUi.getTimeObj(this.config.minutes).toString;
        this.input.value = (this.config.isEmbedded) ? this.config.embedDate + " " + time : time;
        this.time = time;
        this.setLabel(this.config.minutes, 0);
    }

    setLabel(time, index) {
        time = DateTimeUi.getTimeObj(time);
        this.time = time.toString;
        this.labels.map(label => {
            label.innerText = (index === 0 || index === 2) ? time.hour : time.min;
            if (index === 1 || index === 3) { label.innerText = ":" + label.innerText;}
            index++;
        });
    }

    setRange(counter, key) {
        if (!this.checkRange(counter)) { return false;}
        this.config.minutes = this.config.minutes + counter;
        this.setInput();
        if (key === this.selectors.hour || key === this.selectors.min && this.setModuloTime()) {
            this.parentProxy.setValue('updateInput', (key === this.selectors.hour) ? this.config.minutes : this.moduloTime);
        } else {
            if (key === this.selectors.min) {
                this.parentProxy.setValue('updateRange', this.time);
                if (counter === -1 && (this.config.minutes % this.config.listRange) === this.config.listRange - 1) {
                    this.parentProxy.setValue('updateListItems', this.config.minutes - (this.config.listRange - 1));
                }
            }
        }
    }

    setModuloTime() {
        if (!(this.config.minutes % this.config.listRange)) {
            this.moduloTime = this.config.minutes;
            return true;
        }
        return false;
    }

    setEmbedDate(date) {
        this.config.embedDate = date;
    }

    checkRange(counter) {
        return !(this.config.options.minMinute && this.config.minutes + counter < this.config.options.minMinute
            || this.config.options.maxMinute && this.config.minutes + counter >= this.config.options.maxMinute
            || this.config.minutes + counter < 0  || this.config.minutes + counter > this.config.defaultMaxMinute
        );
    }
}/** 
*------------------------------------------- 
* DateObj
*------------------------------------------- 
**/ 
class DateObj extends PickerObj
{
    id;
    pickerContainer;
    configUpdateOk;
    monthDropDownIsOpen;
    attrData;
    config;
    dataset;
    viewProxy;
    proxy;
    embedProxy;
    showPicker;

    constructor(config, pickerContainer, viewProxy) {
        super();
        this.id = (config.hasOwnProperty('id')) ? config.id: this.autoId;
        this.pickerContainer = pickerContainer;
        this.configUpdateOk = true;
        this.monthDropDownIsOpen = false;
        this.attrData = {...DateTimeUi.getAttrData()};
        this.config = {
            input: "",
            inputTo: "",
            selector: '',
            value: '',
            valueCache: '',
            now: new Date(),
            isEmbedded: false,
            isBuildIn: false,
            callerDateArgs: [],
            callerDate: {},
            confDate: {},
            format: 'date',
            regEx: DateTimeUi.regExDate,
            options: {
                minDate: '',
                minDateObj: '',
                maxDate: '',
                maxDateObj: '',
                minRange: '',
                maxRange: '',
            },
        };
        this.viewProxy = viewProxy;
        this.proxy = new PickerProxy(this.config, {
            set: (target, key, value) => {
                switch(key) {
                    case'input':
                        this.setInput(value);
                        break;
                    case'value':
                        target[key] = value;
                        target.date = value;
                        break;
                    case'minDate':
                    case'maxDate':
                        target.options[key] = value;
                        target.options[key + "Obj"] = DateTimeUi.getDateObj(value);
                        DateTimeUi.setMinMaxDate(this, key);
                        break;
                    case'minRange':
                    case'maxRange':
                        target.options[key] = value;
                        if (!this.config.isEmbedded) {
                            DateTimeUi.setRange(this, key);
                        }
                        break;
                }
                return true;
            }
        });
        this.embedProxy = null;
        this.showPicker = false;
        this.setConfig(config);
        if (!this.config.isEmbedded) {
            this.setOptions();
            PickerObj.setObj(this.id, this);
            DateTimeUi.setElementDataSet(this.config.input, 'pickerId', 'data-picker-id', this.id);
            this.config.input.onchange = () => {
                this.setInput(this.config.input.value);
                DateTimeUi.setConfDate(this.config);
                this.viewProxy.setValue('updateDateView', this);
            };
        }
    }

    setConfig(config) {
        this.config = {...this.config, ...config};
        if (!this.config.isEmbedded && this.config.input.classList.contains('date-from')) {
            const selectorList = document.getElementsByClassName(this.config.selector);
            const nextIndex = DateTimeUi.getNextIndex(this.config.selector, this.config.input);
            const inputTo = DateTimeUi.getElementByIndex(nextIndex, selectorList);
            if (inputTo.classList.contains('date-to')) {
                this.config.inputTo = inputTo;
            }
        }
        this.dataset = DateTimeUi.getDataset(this.config.input);
        if (!this.config.isEmbedded) {
            this.setInput(this.config.input.value);
        }
    }

    setOptions() {
        if (this.dataset !== null) {
            for (let key in this.config.options) {
                if (key in this.dataset && this.dataset[key] !== '') {
                    switch (key) {
                        case'minDate':
                        case'maxDate':
                        case'minRange':
                        case'maxRange':
                            this.proxy.setValue(key,this.dataset[key]);
                            break;
                    }
                }
            }
        }
    }

    setInput(value) {
        const newValue = this.getValidInput(value);
        if (!this.config.isEmbedded) {
            this.config.input.value = newValue;
        }
        this.config.valueCache = newValue;
        this.config.value = newValue;
        DateTimeUi.setCallerDate(this.config);
        if (DateTimeUi.checkUpdateConfDate(this)) {
            DateTimeUi.setConfDate(this.config);
        }
        if (PickerObj.getPickerObjTo(this) && !this.config.isEmbedded) {
            ['minRange', 'maxRange'].map(key => {DateTimeUi.setRange(this, key)});
        }
    }

    getValidInput(value) {
        const minDate = this.getOptions(['minDate']);
        const maxDate = this.getOptions(['maxDate']);
        value = (this.config.regEx.test(value)) ? value.trim() : this.config.valueCache;
        value = (value) ? value : DateTimeUi.getLocaleDateString(this.config.now, this.config.format);
        if (value) {
            if (minDate && !DateTimeUi.checkDateRange(minDate, value)) {
                if (this.config.valueCache !== value && DateTimeUi.checkDateRange(minDate, this.config.valueCache)) {
                    value = this.config.valueCache
                } else {
                    value = this.getMinMaxValue('minDateObj', value);
                }
            }
            if (maxDate && !DateTimeUi.checkDateRange( value, maxDate)) {
                if (this.config.valueCache !== value && DateTimeUi.checkDateRange(this.config.valueCache, maxDate)) {
                    value = this.config.valueCache
                } else {
                    value = this.getMinMaxValue('maxDateObj', value);
                }
            }
        }
        return value;
    }

    getOptions(keys) {
        return DateTimeUi.getObjMapper(keys, this.config.options);
    }

    getMinMaxValue(key, value) {
        const checkArgs = ['day', 'month','year'];
        const option = this.getOptions([key,'callerDate']);
        let dateObj = DateTimeUi.getDateObj(value);
        let result = value;
        if (option) {
            checkArgs.map(arg => {
                if (key === 'minDateObj' && dateObj.callerDate[arg] < option[arg] || key === 'maxDateObj' && dateObj.callerDate[arg] > option[arg]) {
                    dateObj.callerDate[arg] = option[arg];
                }
            });
            dateObj = new Date(dateObj.callerDate.year ,dateObj.callerDate.month ,dateObj.callerDate.day);
            result = DateTimeUi.getLocaleDateString(dateObj, this.config.format);
        }

        return result;
    }

    updateConfDate(dateObj) {
        switch(dateObj.key) {
            case'day':
                this.config.confDate.day = dateObj.value;
                const newDate = new Date(this.config.confDate.year, this.config.confDate.month, this.config.confDate.day);
                if (this.embedProxy !== null) {
                    this.embedProxy.setValue('updateDateInput', DateTimeUi.getLocaleDateString(newDate, this.config.format));
                } else {
                    this.setInput(DateTimeUi.getLocaleDateString(newDate, this.config.format));
                }
                break;
            case'month':
                this.configUpdateOk = this.checkNextDate(dateObj.key, dateObj.value);
                if (this.configUpdateOk) {
                    this.config.confDate.month = dateObj.value - 1;
                    DateTimeUi.setConfDate(this.config, [this.config.confDate.year, this.config.confDate.month, 1]);
                }
                break;
            case'year':
                this.configUpdateOk = this.checkNextDate(dateObj.key, dateObj.value);
                if (this.configUpdateOk) {
                    this.config.confDate.year = dateObj.value;
                    DateTimeUi.setConfDate(this.config, [this.config.confDate.year, this.config.confDate.month, 1]);
                }
                break;
        }
    }

    checkNextDate(key, value) {
        const confDate =  {...this.config.confDate};
        confDate[key] = value;
        if (key === 'year') {
            if (this.config.options.minDateObj && this.config.options.minDateObj.callerDate.year > confDate.year
                || this.config.options.maxDateObj && this.config.options.maxDateObj.callerDate.year < confDate.year)
            {
                return false;
            }
            this.checkNextMinMaxMonth(confDate);
        } else if (key === 'month') {
            if (this.config.options.minDateObj
                && this.config.options.minDateObj.callerDate.year === confDate.year
                && this.config.options.minDateObj.callerDate.month > confDate.month - 1
                || this.config.options.maxDateObj
                && this.config.options.maxDateObj.callerDate.year === confDate.year
                && this.config.options.maxDateObj.callerDate.month < confDate.month - 1)
            {
                return false;
            }
        }

        return true;
    }

    checkNextMinMaxMonth(confDate) {
        ['minDateObj', 'maxDateObj'].map(key => {
            if (this.config.options[key] && this.config.options[key].callerDate.year === confDate.year) {
                if (key === 'minDateObj' && this.config.options[key].callerDate.month > confDate.month
                    || key === 'maxDateObj' && this.config.options[key].callerDate.month < confDate.month)
                {
                    this.config.confDate.month = this.config.options[key].callerDate.month;
                }
            }
        });
    }
}/** 
*------------------------------------------- 
* DateTimeObj
*------------------------------------------- 
**/ 
class DateTimeObj extends PickerObj
{
    id;
    pickerContainer;
    DateObj;
    TimeObj;
    attrData;
    config;
    showPicker;
    dataset;
    viewProxy;
    proxy;

    constructor(config, pickerContainer, viewProxy) {
        super();
        this.id = this.autoId;
        this.pickerContainer = pickerContainer;
        this.DateObj = new DateObj({
            id: this.id,
            input: config.input,
            selector: DateTimeUi.selector(['datePicker', 'selector']),
            isEmbedded: true
        },  pickerContainer.dateContainer, viewProxy);
        this.TimeObj = new TimeObj({
            id: this.id,
            input: config.input,
            selector: DateTimeUi.selector(['timePicker', 'selector']),
            isEmbedded: true
        },  pickerContainer.timeContainer, viewProxy);

        this.attrData = {...DateTimeUi.getAttrData()};
        this.config = {
            input: '',
            inputTo: '',
            value: '',
            valueCache: '',
            now: new Date(),
            date: '',
            time: '',
            callerDateArgs: [],
            callerDate: {},
            confDate: {},
            dateTimeObj: {},
            format: 'dateTime',
            regEx: DateTimeUi.regExDateTime,
            options: {
                minDate: '',
                minDateObj: '',
                maxDate: '',
                maxDateObj: '',
                minRange: '',
                maxRange: '',
                time : {
                    minTime: '',
                    maxTime: '',
                    minMinute: '',
                    maxMinute: '',
                    minRange: '',
                    maxRange: '',
                }
            }
        };
        this.showPicker = false;
        this.viewProxy = viewProxy;
        this.proxy = new PickerProxy({updateDateTimeInput: ''}, {
            set: (target, key, value) => {
                switch(key) {
                    case'updateDateInput':
                        console.log('DateTimeObj updateDateInput',value)
                        this.setInput(value + " " + this.config.time);
                        break;
                    case'updateTimeInput':
                        console.log('DateTimeObj updateTimeInput',value)
                        this.setTimeInput(value);
                        break;
                    case'updateTime':
                        console.log('DateTimeObj updateTime',value)
                        this.config.time = value;
                        break;
                }
                return true;
            }
        });
        this.DateObj.embedProxy = this.proxy;
        this.TimeObj.embedProxy = this.proxy;

        this.setConfig(config);
        this.setOptionsMinMaxDate();
        this.setInput(this.config.input.value);
        this.setOptionsMinMaxRange();

        PickerObj.setObj(this.id, this);
        DateTimeUi.setElementDataSet(config.input, 'pickerId', 'data-picker-id', this.id);

        this.config.input.onchange = () => {
            this.setInput(this.config.input.value);
        };
    }

    setConfig(config) {
        this.config = {...this.config, ...config};
        if (this.config.input.classList.contains('date-from')) {
            const selectorList = document.getElementsByClassName(this.config.selector);
            const nextIndex = DateTimeUi.getNextIndex(this.config.selector, this.config.input);
            const inputTo = DateTimeUi.getElementByIndex(nextIndex, selectorList);
            if (inputTo.classList.contains('date-to')) {
                this.config.inputTo = inputTo;
            }
        }
        this.DateObj.timeProxy = this.TimeObj.timeProxy;
        this.dataset = DateTimeUi.getDataset(this.config.input);
    }

    setOptionsMinMaxDate() {
        if (this.dataset !== null) {
            ['minDate', 'maxDate'].map(key => {
                if (key in this.dataset && this.dataset[key] !== '') {
                    this.config.options[key] = this.dataset[key];
                    this.config.options[key + "Obj"] = DateTimeUi.getDateObj(this.dataset[key]);
                    const dateTimeObj = DateTimeUi.getDateTimeObj(this.dataset[key]);
                    const timeKey = ('minDate') ? 'minTime' : 'maxTime';
                    const timeMinuteKey = ('minDate') ? 'minMinute' : 'maxMinute';
                    this.DateObj.config.options[key] = dateTimeObj.date;
                    this.DateObj.config.options[key + "Obj"] = dateTimeObj.dateObj;
                    this.config.options.time[timeKey] = dateTimeObj.time;
                    this.config.options.time[timeMinuteKey] = dateTimeObj.minutes;
                }
            });
        }
    }

    setOptionsMinMaxRange(update = false) {
        if (this.dataset !== null) {
            ['minRange', 'maxRange'].map(key => {
                if (key in this.dataset && this.dataset[key] !== '') {
                    if( !update) {
                        this.config.options[key] = this.dataset[key];
                    }
                    DateTimeUi.setRange(this, key);
                }
            });
        }
    }

    setInput(value) {
        const newDate = this.getValidInput(value);
        const dateTimeObj = DateTimeUi.getDateTimeObj(newDate);
        DateTimeUi.setEmbedTimeMinMax(this.config, this.TimeObj.config, newDate);
        this.config.input.value = newDate;
        this.config.value = newDate;
        this.config.valueCache = newDate;
        this.config.date = dateTimeObj.date;
        this.config.time = dateTimeObj.time;
        this.DateObj.setInput(this.config.date);
        this.TimeObj.setInput(this.config.time);
        this.TimeObj.timeRangeObj.setEmbedDate(this.config.date);
        if (this.config.inputTo !== null) {
            this.setOptionsMinMaxRange(true);
        }
    }

    setInputUpdate() {
        this.config.input.value = this.config.date + " " + this.config.time;
        this.config.valueCache = this.config.input.value;
    }

    setTimeInput(value) {
        this.config.time = value;
        this.TimeObj.setInput(this.config.time);
        this.setInputUpdate();
    }

    getValidInput(value) {
        value = DateTimeUi.getValidDate(value, this.config);
        const valueDate = value.split(' ')[0];
        const minDateTime = this.config.options.minDate;
        const minDate = minDateTime.split(' ')[0];
        const maxDateTime = this.config.options.maxDate;
        const maxDate = maxDateTime.split(' ')[0];
        if (minDateTime && !DateTimeUi.checkDateRange(minDateTime, value)) {
            if (this.config.valueCache !== value
                && valueDate !== minDate
                && DateTimeUi.checkDateRange(minDateTime, this.config.valueCache)) {
                value = this.config.valueCache;
            } else {
                value = minDateTime;
            }
        }
        if (maxDateTime && !DateTimeUi.checkDateRange( value, maxDateTime)) {
            if (this.config.valueCache !== value && DateTimeUi.checkDateRange(this.config.valueCache, maxDateTime)) {
                value = this.config.valueCache;
            } else {
                value = maxDateTime;
            }
        }

        return value;
    }
}
/**
*------------------------------------------- 
* DateTimePicker
*------------------------------------------- 
**/ 
class DateTimePicker
{
    constructor() {
        this.config = {};
        this.config.lang = DateTimeUi.getDefaultLang();
        this.dateTimeSelectors = DateTimeUi.selector(['dateTimePicker']);
        this.dateSelectors = DateTimeUi.selector(['datePicker']);
        this.timeSelectors = DateTimeUi.selector(['timePicker']);
        this.month = DateTimeUi.getDateLang([this.config.lang, 'month']);
        this.weekDays = DateTimeUi.getDateLang([this.config.lang, 'weekDays']);
        this.viewProxy = new PickerProxy({updateTimeView: ''}, {
            set: (target, key, pickerObj) => {
                switch(key) {
                    case'updateTimeView':
                        this.setTimeView(pickerObj);
                        break;
                    case'updateDateView':
                        this.setDateView(pickerObj);
                        break;
                    case'updateDateTimeView':
                        this.setDateView(pickerObj.DateObj);
                        this.setTimeView(pickerObj.TimeObj);
                        break;
                }
                return true;
            }
        });
        this.initDateTimePicker();
        this.initDatePicker();
        this.initTimePicker();
    }

    initDateTimePicker() {
        [...document.getElementsByClassName(this.dateTimeSelectors.selector)].map($input => {
            this.setDateTimeObject($input);
        });
    }

    initTimePicker() {
        [...document.getElementsByClassName(this.timeSelectors.selector)].map($input => {
            this.setTimeObject($input);
        });
    }

    initDatePicker() {
        [...document.getElementsByClassName(this.dateSelectors.selector)].map($input => {
            this.setDateObject($input);
        });
    }

    setDateTimeObject ($input) {
        const container = this.getPickerContainer($input, this.dateTimeSelectors);
        container.append(DateTimeUi.getPickerTemplate(this.dateSelectors.selector));
        container.append(DateTimeUi.getPickerTemplate(this.timeSelectors.selector));
        const dateContainer = container.getElementsByClassName(this.dateSelectors.container)[0];
        const timeContainer = container.getElementsByClassName(this.timeSelectors.container)[0];
        const pickerContainer = {
            container: container,
            dateContainer: {
                container: dateContainer,
                labelDays: dateContainer.getElementsByClassName(this.dateSelectors.pickerLabelDays)[0],
                labelYear: dateContainer.getElementsByClassName(this.dateSelectors.pickerLabelYear)[0],
                dropDown: dateContainer.getElementsByClassName(this.dateSelectors.pickerDropdown)[0],
                dropDownSelect: dateContainer.getElementsByClassName(this.dateSelectors.pickerDropdownSelect)[0],
                pickerDays: dateContainer.getElementsByClassName(this.dateSelectors.pickerDays)[0],
            },
            timeContainer: {
                container: timeContainer,
                itemList: timeContainer.getElementsByClassName(DateTimeUi.selector(["timePicker", "itemList"]))[0]
            }
        };
        pickerContainer.dateContainer.container.classList.add('is-embedded');
        pickerContainer.timeContainer.container.classList.add('is-embedded');

        const pickerObj = new DateTimeObj({input: $input, selector: this.dateTimeSelectors.selector}, pickerContainer, this.viewProxy);
        if (!$input.classList.contains('build-in')) {
            this.setPickerEvents(pickerObj, $input, container);
        }
        this.setTimePicker(pickerObj.TimeObj);
        this.setDatePicker(pickerObj.DateObj);
    }

    setTimeObject ($input) {
        const container = this.getPickerContainer($input, this.timeSelectors);
        const pickerContainer = {
            container: container,
            itemList: container.getElementsByClassName(DateTimeUi.selector(["timePicker", "itemList"]))[0],
        };
        const pickerObj = new TimeObj({input: $input, selector: this.timeSelectors.selector}, pickerContainer, this.viewProxy);
        if (!$input.classList.contains('build-in')) {
            this.setPickerEvents(pickerObj, $input, container);
        }
        this.setTimePicker(pickerObj);
    }

    setDateObject ($input) {
        const container = this.getPickerContainer($input, this.dateSelectors);
        const pickerContainer = {
            container: container,
            labelDays: container.getElementsByClassName(this.dateSelectors.pickerLabelDays)[0],
            labelYear: container.getElementsByClassName(this.dateSelectors.pickerLabelYear)[0],
            dropDown: container.getElementsByClassName(this.dateSelectors.pickerDropdown)[0],
            dropDownSelect: container.getElementsByClassName(this.dateSelectors.pickerDropdownSelect)[0],
            pickerDays: container.getElementsByClassName(this.dateSelectors.pickerDays)[0],
        };

        const pickerObj = new DateObj({input: $input, selector: this.dateSelectors.selector}, pickerContainer, this.viewProxy);
        if (!$input.classList.contains('build-in')) {
            this.setPickerEvents(pickerObj, $input, container);
        }
        this.setDatePicker(pickerObj);
    }

    setPickerEvents(pickerObj, input, container) {
        input.onfocus = () => {
            container.style.display = (input.classList.contains(DateTimeUi.selector(['dateTimePicker', 'selector']))) ? 'flex' : 'block';
        };
        input.onblur = () => {
            if(!pickerObj.showPicker) {
                container.style.display = 'none';
            }
        };

        container.onmouseenter = () => {
            pickerObj.showPicker = true;
            input.blur();
        };

        container.onmouseleave = () => {
            pickerObj.showPicker = false;
            container.style.display = 'none';
        };
    }

    setTimePicker(pickerObj) {
        this.setTimeView(pickerObj);
    }

    setDatePicker(pickerObj) {
        this.setDateView(pickerObj);
        this.setDateViewEvents(pickerObj);
    }

    setDateViewEvents(pickerObj) {
        const pickerContainer = (pickerObj.hasOwnProperty('DateObj')) ? pickerObj.DateObj.pickerContainer : pickerObj.pickerContainer;
        [...pickerContainer.container.getElementsByClassName(this.dateSelectors.btnChange)].map($btn => {
            $btn.onclick = () => {
                const direction = ($btn.classList.contains(this.dateSelectors.goBack)) ? this.dateSelectors.goBack : this.dateSelectors.goForward;
                const directionValue = (direction === 'back') ? -1 : +1;
                if ($btn.classList.contains(this.dateSelectors.year)) {
                    const actualYear = pickerContainer.labelYear.innerText * 1;
                    const newYear = actualYear + directionValue;
                    pickerObj.updateConfDate({"key": "year", "value": newYear});
                    if (pickerObj.configUpdateOk) {
                        pickerContainer.labelYear.innerText = newYear;
                        this.setLabelDays(pickerObj);
                        this.setSelectionMonth(pickerObj);
                        this.setDayList(pickerObj);
                    }
                } else {
                    const actualMonth = DateTimeUi.dataSetValue(pickerContainer.dropDown, 'value')*1;
                    const newMonth = actualMonth + directionValue;
                    pickerObj.updateConfDate({"key": "month", "value": newMonth});
                    if (pickerObj.configUpdateOk) {
                        this.setLabelDays(pickerObj);
                        this.setSelectionMonth(pickerObj);
                        this.setSelectionYear(pickerObj);
                        this.setDayList(pickerObj);
                    }
                }
            };
        });
        pickerContainer.dropDownSelect.addEventListener('mouseleave', () => {
            pickerContainer.dropDownSelect.scrollTop = 0;
            pickerContainer.dropDownSelect.style.display = 'none';
            pickerObj.monthDropDownIsOpen = false;
        });
        pickerObj.pickerContainer.dropDown.onclick = () => {
            if (!pickerObj.monthDropDownIsOpen) {
                pickerObj.pickerContainer.dropDownSelect.style.display = 'flex';
                pickerObj.monthDropDownIsOpen = true;
            } else {
                pickerObj.pickerContainer.dropDownSelect.style.display = 'none';
                pickerObj.monthDropDownIsOpen = false;
            }
        };
    }

    setTimeView(pickerObj) {
        pickerObj.pickerContainer.itemList.innerHTML = '';
        DateTimeUi.getConfig(pickerObj,'listItems').map(item => {
            const $item = document.createElement("p");
            $item.classList.add(this.dateSelectors.day);
            $item.innerText = item.time;
            $item.setAttribute('data-value', item.minutes);
            if (item.hasOwnProperty('selected')) { $item.classList.add('selected')}
            pickerObj.pickerContainer.itemList.append($item);
            $item.onclick = () => {
                if (!$item.classList.contains('selected')) {
                    if (pickerObj.config.isEmbedded) {
                        pickerObj.embedProxy.setValue('updateTimeInput', $item.innerText);
                    } else {
                        pickerObj.setInput($item.innerText);
                    }
                }
            };
        });
    }

    setDateView(pickerObj) {
        this.setLabelDays(pickerObj);
        this.setSelectionMonth(pickerObj);
        this.setSelectionYear(pickerObj);
        this.setDayList(pickerObj);
    }

    setLabelDays(pickerObj) {
        const dayIndexNow = DateTimeUi.getDayIndexNow();
        const dayNow = this.weekDays[dayIndexNow].slice(0, 2);
        const monthNow = pickerObj.config.now.getMonth();
        const yearNow = pickerObj.config.now.getFullYear();
        const confDateMonth = DateTimeUi.getConfDate(pickerObj, 'month');
        const confDateYear = DateTimeUi.getConfDate(pickerObj, 'year');
        pickerObj.pickerContainer.labelDays.innerHTML = '';
        this.weekDays.map(day => {
            day = day.slice(0, 2);
            const item = document.createElement("p");
            item.classList.add(this.dateSelectors.day);
            item.innerText = day;
            pickerObj.pickerContainer.labelDays.append(item);
            if (day === dayNow) {
                if (yearNow === confDateYear && monthNow === confDateMonth) {
                    if (!item.classList.contains(this.dateSelectors.selected)) {
                        item.classList.add(this.dateSelectors.selected);
                    }
                } else {
                    item.classList.remove(this.dateSelectors.selected);
                }
            }
        });
    }

    setSelectionYear(pickerObj) {
        const pickerContainer = (pickerObj.hasOwnProperty('DateObj')) ? pickerObj.DateObj.pickerContainer : pickerObj.pickerContainer;
        pickerContainer.labelYear.innerText = DateTimeUi.getConfDate(pickerObj, 'year');
    }

    setSelectionMonth(pickerObj) {
        const pickerContainer = (pickerObj.hasOwnProperty('DateObj')) ? pickerObj.DateObj.pickerContainer : pickerObj.pickerContainer;
        pickerContainer.dropDown.innerText = this.month[DateTimeUi.getConfDate(pickerObj, 'month')];
        DateTimeUi.setElementDataSet(pickerContainer.dropDown, 'value', 'data-value', DateTimeUi.getConfDate(pickerObj, 'month') + 1);
        pickerContainer.dropDownSelect.innerHTML = '';
        for(let i = 0; i < this.month.length;i++) {
            const $child = document.createElement("div");
            $child.setAttribute('data-value', i + 1);
            $child.setAttribute('data-month-name', this.month[i]);
            if (DateTimeUi.getConfDate(pickerObj, 'month') === i) {
                $child.classList.add(this.dateSelectors.selected);
            }
            if (DateTimeUi.checkIsNotSelectableMonth(pickerObj.config, i)) {
                $child.classList.add(this.dateSelectors.notSelectable);
            }
            $child.innerText = this.month[i].slice(0, 3);
            pickerContainer.dropDownSelect.append($child);
            if (!$child.classList.contains(this.dateSelectors.notSelectable)) {
                $child.onclick = () => {
                    if (!$child.classList.contains(this.dateSelectors.selected)) {
                        const newMonth = DateTimeUi.dataSetValue($child, 'value');
                        pickerObj.updateConfDate({"key": "month", "value": newMonth});
                        pickerContainer.dropDown.dispatchEvent(new Event('click'));
                        if (pickerObj.configUpdateOk) {
                            this.toggleSelectedMonth(pickerContainer, $child, newMonth);
                            this.setLabelDays(pickerObj);
                            this.setDayList(pickerObj);
                        }
                    }
                };
            }
        }
    }

    setDayList(pickerObj) {
        const pickerContainer = (pickerObj.hasOwnProperty('DateObj')) ? pickerObj.DateObj.pickerContainer : pickerObj.pickerContainer;
        pickerContainer.pickerDays.innerHTML = '';
        this.renderEmptyItem(pickerObj, pickerContainer);
        for(let i = 0; i < DateTimeUi.getConfDate(pickerObj, 'days');i++) {

            const $child = this.renderDayItem(pickerObj, i);
            pickerContainer.pickerDays.append($child);
            if ($child.classList.contains('day-item')) {
                $child.onclick = () => {
                    pickerObj.updateConfDate({"key": 'day', "value": DateTimeUi.dataSetValue($child, 'value')});
                    let $selected = pickerContainer.pickerDays.getElementsByClassName(this.dateSelectors.selected);
                    if ($selected.length) {
                        $selected[0].classList.remove(this.dateSelectors.selected);
                    }
                    $selected = pickerContainer.pickerDays.querySelector('[data-value="' + DateTimeUi.dataSetValue($child, 'value') + '"]');
                    $selected.classList.add(this.dateSelectors.selected);
                };
            }
        }
        const childLength = pickerContainer.pickerDays.querySelectorAll('p').length;
        if (childLength < 42) {
            this.renderSpaceItem(pickerContainer, childLength, 42);
        }
    }

    getPickerContainer(input, selectors) {
        const container = DateTimeUi.closest('div', input);
        container.append(DateTimeUi.getPickerTemplate(selectors.selector));
        const pickerContainer = container.getElementsByClassName(selectors.container)[0];
        pickerContainer.style.left = DateTimeUi.getPosLeft(input) + "px";
        container.style.position = "relative";
        input.after(pickerContainer);
        if (input.classList.contains('build-in')) {
            container.classList.add('picker-build-in-wrapper');
            pickerContainer.classList.add('build-in');
        }

        return pickerContainer;
    }

    renderEmptyItem(pickerObj, container) {
        const firstDay = new Date(pickerObj.config.confDate.year, pickerObj.config.confDate.month, 1);
        const dayIndex = (firstDay.getDay() > 0) ? firstDay.getDay() - 1 : 6;
        if (dayIndex) {
            this.renderSpaceItem(container, 0, dayIndex);
        }
    }

    renderDayItem(pickerObj, index) {
        const dayIndex = index + 1;
        const selector = (DateTimeUi.checkIsSelectableDay(pickerObj.config, dayIndex)) ? this.dateSelectors.dayItem : this.dateSelectors.notSelectable;
        const $child = document.createElement("p");
        $child.setAttribute('data-value', dayIndex);
        $child.classList.add(selector);
        if (DateTimeUi.checkActualDay(pickerObj.config, dayIndex)) {
            if(DateTimeUi.checkToday(pickerObj.config, dayIndex)) {
                $child.classList.add(this.dateSelectors.today);
            }
            $child.classList.add(this.dateSelectors.selected);
        } else if (DateTimeUi.checkToday(pickerObj.config, dayIndex)) {
            $child.classList.add(this.dateSelectors.today);
        }
        $child.innerText = (index<9) ? "0" + dayIndex : dayIndex;

        return $child;
    }

    renderSpaceItem(container, min, max) {
        for (let i = min; i < max;i++) {
            const empty = document.createElement("p");
            empty.classList.add(this.dateSelectors.empty);
            container.pickerDays.appendChild(empty);
        }
    }

    toggleSelectedMonth(container, $e, value) {
        container.dropDownSelect.getElementsByClassName(this.dateSelectors.selected)[0].classList.remove(this.dateSelectors.selected);
        $e.classList.add(this.dateSelectors.selected);
        container.dropDown.innerText = DateTimeUi.dataSetValue($e, 'monthName');
        DateTimeUi.setElementDataSet(container.dropDown, 'value', 'data-value',value);
    }
}
/**
 *-------------------------------------------
 * Init instance GridDateTimePicker of DateTimePicker
 *-------------------------------------------
 **/
const GridDateTimePicker = new DateTimePicker();