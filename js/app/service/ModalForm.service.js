modalService = {};

if (typeof ServiceModalForm === 'undefined') {

    class ServiceModalForm
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

        setView () {
            this.domModal.body.querySelectorAll('input')[0].focus();
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
            const formFields = GridUi.formList(this.domModal.body);
            this.formData = [];

            [...formFields].map((inpt) => {
                if (inpt.hasAttribute("required") && inpt.value.trim() === "") {
                    this.error.push("Eintrag fehlt in: " + inpt.getAttribute("title"))
                } else {
                    this.formData[inpt.name] = inpt.value.trim();
                }
            });

            if (!this.error.length && this.formData === []) {
                this.error.push("Keine Fomulardaten gefunden.");
            }
        }
    }
    
    // Init modal service instance
    modalService = new ServiceModalForm();

}