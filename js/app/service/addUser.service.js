modalService = {};

if (typeof ServiceAddUser === 'undefined') {

    class ServiceAddUser 
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

        setModalTitel (str) { this.domModal.head.querySelector('span.title').innerHTML = str; }

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
                    this.error.push("Eintrag fehlt in: " + inpt.getAttribute("placeholder"))
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
    modalService = new ServiceAddUser();
    // Set modal title
    GridStage.modal.modalTitle("User / Neuer Benutzer");
}