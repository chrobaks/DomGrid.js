modalService = {};

if (typeof ServiceAddFormListExample === 'undefined') {

class ServiceAddFormListExample
{
    constructor()
    {
        this.config = {};
        this.domModal = {};
        this.formData = [];
        this.error = [];
    }

    setConfig (conf, domModal)
    {
        this.config = conf;
        this.domModal = domModal;
    }

    setView () { this.domModal.body.querySelector('input[name="name"]').focus(); }

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

        [...this.domModal.body.querySelectorAll("input")].map((inpt) => {
            if (inpt.hasAttribute("data-required") && inpt.value.trim() === "") {
                this.error.push("No entry in: " + inpt.getAttribute("placeholder"))
            } else {
                this.formData[inpt.name] = inpt.value.trim();
            }
        });

        if (!this.error.length && this.formData === []) {
            this.error.push("No form data found.");
        }
    }
}

// Init modal service instance
modalService = new ServiceAddFormListExample();
}