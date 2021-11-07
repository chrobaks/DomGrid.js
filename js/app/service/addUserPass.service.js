modalService = {};

if (typeof ServiceAddUserPass === 'undefined') {

    class ServiceAddUserPass 
    {
        constructor() 
        {
            this.config = {};
            this.domModal = {};
        }

        setConfig (conf, domModal)
        {
            this.config = conf;
            this.domModal = domModal;
        }

        setModalTitel (str) { 
            this.domModal.head.querySelector('span.title').innerHTML = str; 
        }

        setView () { 
            // Select passwort
            this.domModal.body.querySelectorAll('input')[0].select();
            // Hide button data save
            this.domModal.footer.querySelectorAll('button')[0].style.display = 'none';
        }
    }
    
    // Init modal service instance
    modalService = new ServiceAddUserPass();
    // Set modal title
    GridStage.modal.modalTitle("User / Neues Benutzer Passwort");
}