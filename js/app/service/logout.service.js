modalService = {};

if (typeof ServiceLogout === 'undefined') {

    class ServiceLogout 
    {
        constructor() 
        {
            this.config = {};
            this.modalHead = document.getElementById('wrapper-modal').querySelectorAll('div.modal-head')[0];
            this.modalBody = document.getElementById('wrapper-modal').querySelectorAll('div.modal-body')[0];
            this.modalFooter = document.getElementById('wrapper-modal').querySelectorAll('div.modal-footer')[0];
            this.error = [];   
        }

        setConfig (conf)
        {
            this.config = conf;
        }

        setView ()
        {
            
        }
    }
  
    // Init modal service instance
    modalService = new ServiceLogout();
}