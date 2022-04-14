modalService = {};

if (typeof ServiceFormBoxElement === 'undefined') {

    class ServiceFormBoxElement
    {
        constructor()
        {
            this.config = {};
            this.domModal = {};
            this.formData = [];
            this.elementCount = 0;
            this.error = [];
        }

        setConfig (conf, domModal)
        {
            this.config = conf;
            this.domModal = domModal;
            this.listCheck = null;
            this.listSearch = null;
            this.listSelect = this.domModal.body.querySelectorAll('select');
            this.listData = this.domModal.body.querySelectorAll('tr.row-data');
            this.infoContainer = this.domModal.body.querySelector('.container-info-check-length');
        }

        setView () {
            if (GridListCheckModule) {
                this.listCheck = new GridListCheckModule(
                    this.domModal.body,
                    {info: {meth: () => {this.setInfo()}}}
                );
            }
            if (GridTableSearchModule && this.listSelect.length && this.listData.length) {
                this.listSearch = new GridTableSearchModule(
                    this.listSelect,
                    this.listData,
                    {reset: {meth: () => {this.listCheck.resetCheck()}}}
                );
            }
        }

        setInfo ()
        {
            if (this.infoContainer) {
                this.infoContainer.innerText = this.listCheck.checkLength;
            }
        }

        setViewClose ()
        {
            this.setFormData();

            if (this.error.length) {
                alert(this.error.join("\n"));
                this.error = [];
            } else {
                this.config.callBack.obj[this.config.callBack.method](this.formData, this.elementCount);
                GridStage.modal.modalDisplay();
            }
        }

        setFormData ()
        {
            const listChecked = this.listCheck.getListChecked();
            const packageId = this.domModal.body.querySelector('input[name="custom_package_id"]');
            const userId = this.domModal.body.querySelector('input[name="user_id"]');
            const listId = [];
            this.formData = [];

            if (listChecked.length) {
                listChecked.map(checkbox => {
                    const container =  GridUi.closest('td', checkbox);
                    if (container && container.querySelector('input[name="id"]')) {
                        listId.push(container.querySelector('input[name="id"]').value);
                    }
                });
                if (packageId?.value && userId?.value && listId.length) {
                    this.elementCount = listId.length;
                    this.formData["element_ids"] = listId.toString();
                    this.formData["custom_package_id"] = packageId.value.trim();
                    this.formData["user_id"] = userId.value.trim();
                } else {
                    this.error.push("Fehler in den Formulardaten, bitte wende dich an den Support.");
                }
            } else {
                this.error.push("Keine markierten Daten gefunden.");
            }
        }
    }

    // Init modal service instance
    modalService = new ServiceFormBoxElement();
}