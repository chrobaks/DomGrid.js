
modalService = {};

if (typeof ServiceDeleteData === 'undefined') {

    class ServiceDeleteData
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
            ];
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
                this.formData[inpt.name] = inpt.value.trim();
            });
            if (!this.error.length && this.formData === []) {
                this.error.push("Fehler, keine Formulardaten gefunden.");
            }
        }
    }

// Init modal service instance
    modalService = new ServiceDeleteData();
}