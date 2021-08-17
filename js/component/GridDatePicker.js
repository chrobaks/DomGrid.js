class GridDatePicker extends GridComponent
{
    constructor (obj, nameSpace, callerInput) 
    { 
        super(obj, nameSpace); 

        this.eventConfig = [ 
            {selector : ".btn-change", action : "onclick", callBack : "setChange"},
        ];
        // Caller input
        this.callerInput = callerInput;
        // Date today
        this.now = new Date();
        // Stores yyyy.mm.dd
        this.callerDate = [];
        // Stores caller input value as array
        this.callerDateArgs = [];
        // Config date
        this.confDate = { weekDday : null, day : null, month : null, year :null, days : null  };
        // German month name
        this.month = ["Januar","Ferbruar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
        // Dom elements year, month and items container
        this.labelYear = this.container.querySelector(".year-label");
        this.labelMonth = this.container.querySelector(".month-label");
        this.itemsContainer = this.container.querySelector(".date-picker-items");

        // Set input value form Caller if not empty
        this.setCallerDate();
        // Set date config
        this.setConfDate(this.callerDateArgs);
        // Render day items
        this.setDayItems();
        // Set year label & value
        this.setLabelYear();
        // Set month label & value
        this.setLabelMonth();
        // Set year/month change event
        this.setEvents();
    }

    static createInstance (nameSpace, obj)
    {
        // Set obj parent postion to relativ
        const objContaner = GridUi.closest('div', obj);
        objContaner.style.position = "relative";

        // Create Datepicker template
        const datePickerContainer = document.createElement("d");
        datePickerContainer.classList.add('date-picker');
        datePickerContainer.innerHTML = GridDatePicker.getTpl();
        datePickerContainer.style.top = "0";
        datePickerContainer.style.zIndex = 1000;
        datePickerContainer.style.display = "block";

        // Append to obj parent element
        objContaner.appendChild(datePickerContainer);

        // Initiallize GridDatePicker Instance
        let Inst = new GridDatePicker(datePickerContainer, nameSpace, obj);

        // Hide Datepicker
        datePickerContainer.onmouseleave = () => {
            document.querySelectorAll(".date-picker")[0].remove();
            Inst = null;
        };
    }

    static getTpl ()
    {
        let tpl = '<div class="date-picker-year"><div class="btn-change year back">&lt;</div><div class="year-label" data-value=""></div><div class="btn-change year forward">&gt;</div></div>';
        tpl += '<div class="date-picker-month"><div class="btn-change month back">&lt;</div><div class="month-label" data-value=""></div><div class="btn-change month forward">&gt;</div></div>';
        tpl += '<div class="date-picker-items"></div>';
        return tpl;
    }

    setCallerDate ()
    {
        if (/[\d]{2}.[\d]{2}.[\d]{4}/g.test(this.callerInput.value)) {
            const inputDate = this.callerInput.value.split('.');
            const month = (inputDate[1] * 1) -1;
            this.callerDateArgs = [inputDate[2],month,inputDate[0]];
            const d = new Date(...this.callerDateArgs);
            this.callerDate = {weekDay : d.getDay(), day : d.getDate(), month : d.getMonth(), year : d.getFullYear()};
        }
    }

    setConfDate ()
    {
        const args = (arguments.length) ? arguments[0] : [];
        const d = new Date(...args);

        this.confDate = {weekDay : d.getDay(), day : d.getDate(), month : d.getMonth(), year : d.getFullYear()};
        this.confDate.days = new Date(this.confDate.year, this.confDate.month+1, 0).getDate();
    }

    setDayItems ()
    {
        this.itemsContainer.innerHTML = "";

        for(let i = 1; i <= this.confDate.days; i++) {

            const item = document.createElement("p");
            item.classList.add("item");
            item.setAttribute("data-value", (i <= 9) ? "0" + i : i);
            item.innerHTML = (i <= 9) ? "0" + i : i;

            this.itemsContainer.appendChild(item);

            if (i === this.now.getDate() && this.confDate.month === this.now.getMonth() && this.confDate.year === this.now.getFullYear()) {
                item.classList.add("today");
            }
            if (this.callerDateArgs.length && i === this.callerDate.day && this.confDate.month === this.callerDate.month && this.confDate.year === this.callerDate.year) {
                item.classList.add("active");
            }
        }

        this.setEvents([{selector : ".item", action : "onclick", callBack : "setCallerInput"}]);
    }

    setLabelYear () {
        this.labelYear.innerHTML = this.confDate.year;
        this.labelYear.dataset.value = this.confDate.year;
    }

    setLabelMonth () {
        this.labelMonth.innerHTML = this.month[this.confDate.month];
        this.labelMonth.dataset.value = ((this.confDate.month + 1) <= 9) ? "0" + (this.confDate.month+1) : this.confDate.month+1;
    }

    setChange (obj)
    {
        const direction = (obj.classList.contains('back')) ? -1 : +1;

        if ((obj.classList.contains('year'))) {
            this.confDate.year = (this.confDate.year + direction >= 1970) ? this.confDate.year + direction : 1970;
        } else {
            this.confDate.month = this.confDate.month + direction;
        }

        this.setConfDate([this.confDate.year, this.confDate.month, 1]);
        this.setDayItems();
        this.setLabelYear();
        this.setLabelMonth(); 
    } 

    setCallerInput (obj)
    {
        this.callerInput.value = [GridUi.dataSetValue(obj, "value"), this.labelMonth.dataset.value, this.labelYear.dataset.value].join('.');
        if(this.itemsContainer.querySelectorAll(".item.active").length) {this.itemsContainer.querySelectorAll(".item.active")[0].classList.remove('active');}
        obj.classList.add('active');

        this.setCallerDate();
    }
}