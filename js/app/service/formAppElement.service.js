
modalService = {};

if (typeof ServiceAddAppElement === 'undefined') {

class ServiceAddAppElement
{
    constructor()
    {
        this.config = {};
        this.domModal = {};
        this.formData = [];
        this.formElements = [];
        this.error = [];
    }

    setConfig (conf, domModal)
    {
        this.config = conf;
        this.domModal = domModal;
    }

    setView ()
    {
        this.formElements = [
            ...this.domModal.body.querySelectorAll("input"),
            ...this.domModal.body.querySelectorAll("select"),
        ];
        this.formElements.map(element =>
        {
            const $tdResult = this.domModal.body.querySelector('[data-form-result="' + element.getAttribute('name') + '"]');
            if (element.classList.contains('date-picker')) { GridDateTimePicker.setDateObject(element); }
            element.addEventListener("change", () => {
                if ($tdResult) {
                    this.setClientInfo($tdResult, element);
                }
            });
            // Set default values from form
            if ($tdResult) {
                this.setClientInfo($tdResult, element);
            }
        });
    }

    setClientInfo ($tdResult, element)
    {
        if (element.classList.contains('date-picker') || element.getAttribute('type') === 'text') {
            $tdResult.innerText = element.value;
        } else {
            $tdResult.innerText = (element.value)
                ? element.querySelector('option[value="' + element.value + '"]').innerText
                : element.value;
        }
    }

    setViewClose ()
    {
        this.setFormData();
        if (this.error.length) {
            alert(this.error.join("\n"));
            this.error = [];
        } else {
            this.config.callBack.obj[this.config.callBack.method](this.formData);
            GridStage.modal.modalDisplay();
        }
    }

    setFormData ()
    {
        this.formData = [];
        this.formElements.map((inpt) => {
            if (inpt.hasAttribute("data-required") && inpt.value.trim() === "") {
                this.error.push("Eintrag fehlt in: " + inpt.getAttribute("title"))
            } else {
                this.formData[inpt.name] = inpt.value.trim();
            }
        });
        if (!this.error.length && this.formData === []) {
            this.error.push("Fehler, keine Formulardaten gefunden.");
        }

    }
}

// Init modal service instance
modalService = new ServiceAddAppElement();
}