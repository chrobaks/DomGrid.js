class TimePickerModule
{
    $container;
    showContainer;
    defaults;

    constructor(customerSettings)
    {
        customerSettings = (arguments.length) ? customerSettings : {};
        this.setDefaults(customerSettings);
        this.setContainer();
        this.setSelectors();
        this.showContainer = false;
    }

    setDefaults (customerSettings)
    {
        this.defaults = {...{
                'selector' : 'dom-grid-time-picker',
                'container' : 'dom-grid-time-picker-container',
                'timeItem' : 'time-item',
                'timeHidden' : 'time-hidden',
                'timeSelected' : 'time-selected',
                'dataTimeSpace' : 'timeSpace',
            }, ...customerSettings};
    }

    setContainer ()
    {
        this.$container = document.createElement('div');
        this.$container.classList.add(this.defaults.container);

        for (let h = 0; h < 24; h++) {
            let hour = (h < 10) ? "0" + h : h;
            for (let m = 0; m < 4; m++) {
                let minute = (!m) ? "00": "" + (15 * m);
                let $timeItem = document.createElement('div');
                $timeItem.classList.add(this.defaults.timeItem);
                $timeItem.innerText = hour + ":" + minute;
                this.$container.append($timeItem);
            }
        }
    }

    setSelectors ()
    {
        const $elements = this.getListElements();
        if ($elements.length) {
            $elements.map($e => {
                $e['onfocus'] = () => {
                    this.showContainer = true;
                    this.showTimePicker($e)
                };
                $e['onblur'] = () => {
                    this.showContainer = false;
                    window.setTimeout(()=> {
                        if (!this.showContainer) {
                            this.$container.remove();
                        }
                    }, 200)
                };
                this.setFromToTime($elements, $e);
            });
        }
    }

    setFromToTime ($elements, $element)
    {
        if ($element.classList.contains('time-picker-from')) {
            const $timeTo = this.getElementTimeTo($elements, $element);
            const timeFrom = $element.value.trim();
            if ($timeTo && timeFrom) {
                const timeSpace = this.getNextTimeSpace($element);
                const timeTo = this.getNextTime(timeFrom);
                $timeTo.dataset[this.defaults.dataTimeSpace] = timeTo + "," + timeSpace;
            }
        }
    }

    setSelectedTime (time, $timeItems)
    {
        if ($timeItems.length) {
            [...$timeItems].map($e => {
                $e.classList.remove(this.defaults.timeSelected);
                if ($e.innerText === time)  {
                    $e.classList.add(this.defaults.timeSelected);
                }
            });
        }
    }

    setTimeSpace ($input, $timeItems)
    {
        let start = -1;
        let end = 2400;

        if ($input.dataset.hasOwnProperty(this.defaults.dataTimeSpace)) {
            const timeSpace = $input.dataset.timeSpace.split(',');
            start = timeSpace[0].replace(':', '') * 1;
            end = timeSpace[1].replace(':', '') * 1;
        }

        if ($timeItems.length) {
            [...$timeItems].map($e => {
                let time = $e.innerText.replace(':', '') * 1;
                $e.classList.remove(this.defaults.timeHidden);
                if (time < start || time > end) {
                    $e.classList.add(this.defaults.timeHidden);
                }
            });
        }
    }

    getListElements ()
    {
        const $elements = document.getElementsByClassName(this.defaults.selector);
        return ($elements.length) ? [...$elements] : [];
    }

    getNextTimeSpace ($element)
    {
        const timeSpace = ($element.dataset.hasOwnProperty(this.defaults.dataTimeSpace))
            ? $element.dataset[this.defaults.dataTimeSpace].split(',')
            : '';
        return (timeSpace === '') ? "24:00" : timeSpace[1];
    }

    getNextTime (timeFrom)
    {
        const arrTimeFrom = timeFrom.split(':');
        arrTimeFrom[0] = (arrTimeFrom[1] === '45') ? arrTimeFrom[0] * 1 + 1 : arrTimeFrom[0];
        arrTimeFrom[0] = (arrTimeFrom[0]*1 < 10) ? "0" + arrTimeFrom[0] : arrTimeFrom[0];
        arrTimeFrom[1] = (arrTimeFrom[1] === '00')
            ? '15'
            : ((arrTimeFrom[1] === '45') ? '00' : arrTimeFrom[1] * 1 + 15);

        return arrTimeFrom.join(':');
    }

    getElementTimeTo ($elements, $element, index)
    {
        const nextIndex = this.getNextIndex($element);
        return ($elements.length > nextIndex) ? $elements[nextIndex] : null;
    }

    getNextIndex ($element)
    {
        const $elements = document.getElementsByClassName(this.defaults.selector);
        let index = 0;
        let nextIndex = 0;
        [...$elements].map($e => {
            if ($element == $e) {
                nextIndex = index + 1;
            }
            index++;
        });
        return nextIndex;
    }

    showTimePicker ($input)
    {
        const $timeItems = this.$container.getElementsByClassName(this.defaults.timeItem);
        this.setSelectedTime($input.value, $timeItems);
        this.setTimeSpace($input, $timeItems);

        this.$container.style.left = ($input.offsetLeft  + window.scrollX) + "px";
        this.$container.style.width = ($input.offsetWidth) + "px";

        $input.after(this.$container);

        if ($timeItems.length) {
            [...$timeItems].map($e => {
                $e['onclick'] = () => {
                    $input.value = $e.innerText;

                    this.setFromToTime(this.getListElements(), $input, this.getNextIndex($input));
                };
            });
        }
    }
}

const TimePicker = new TimePickerModule();
