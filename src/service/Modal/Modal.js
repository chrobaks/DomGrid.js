class gridModal
{
    constructor ()
    {
        this.domConf = [{
            selector : "gridModal", selectorAttr : "id", tag: "div",
            childNodes : [
                {selector : "grid-modal-bg", selectorAttr : "id", tag: "div"},
                {selector : "grid-modal-container", selectorAttr : "id", tag: "div", childNodes : [
                        {selector : ["grid-modal-head"], selectorAttr : "class", tag: "div", childNodes : [{selector : ["title"], selectorAttr : "class", tag: "span"}]},
                        {selector : ["grid-modal-body"], selectorAttr : "class", tag: "div"},
                        {selector : ["grid-modal-footer"], selectorAttr : "class", tag: "div", childNodes : [
                                {selector : ["btn","btn-primary", "save"], selectorAttr : "class", tag: "button", textNode : "Daten speichern"},
                                {selector : ["btn","btn-primary", "close"], selectorAttr : "class", tag: "button", textNode : "Fenster schliessen"},
                            ]},
                    ]},
            ]
        }];

        GridUi.renderDom([...this.domConf], document.body);

        this.modal = document.getElementById('gridModal');
        this.modalBg = document.getElementById('grid-modal-bg');
        this.modalContainer = document.getElementById('grid-modal-container');
        this.modalHead = this.modal.querySelector('.grid-modal-head');
        this.modalBody = this.modal.querySelector('.grid-modal-body');
        this.modalFooter = this.modal.querySelector('.grid-modal-footer');

        this.modalEvent();
    }

    modalDisplay ()
    {
        this.modal.style.display = (this.modal.style.display === 'inline-block') ? 'none' : 'inline-block';

        if (this.modal.style.display === 'inline-block') {
            document.body.classList.add('no-scroll');
            this.modalBg.style.height = document.body.clientHeight + "px";
            this.modalContainer.style.top = (100 + window.scrollY) + "px";
            [...this.modal.querySelectorAll('button')].map((btn) => {
                btn.style.display = 'block';
            })
        } else {
            document.body.classList.remove('no-scroll');
        }
    }

    modalEvent ()
    {
        this.modal.querySelector('button.save').onclick = () => {
            if(typeof modalService !== 'undefined' && typeof modalService.setViewClose === 'function') {
                modalService.setViewClose();
            }
        }
        this.modal.querySelector('button.close').onclick = () => { this.modalDisplay(); }
        this.modalBg.onclick = () => { this.modalDisplay(); }
    }

    modalRequest (request, obj)
    {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) { GridStage.modal.modalResponse(obj, this.responseText);  }
        };
        xhttp.open("GET", request.url, true);
        xhttp.send();
    }

    modalResponse (obj, response)
    {
        this.renderModalBody(response);

        if (this.modalBody.querySelector('[data-service-js]')) {
            this.modalFooter.querySelector('.btn.save').style.display = 'block';
            this.loadService(obj, this.modalBody.querySelector('[data-service-js]').dataset.serviceJs)
        } else {
            this.modalFooter.querySelector('.btn.save').style.display = 'none';
        }
    }

    modalTitle (strTitle)
    {
        this.modalHead.querySelector('.title').innerHTML = strTitle;
    }

    loadService (obj, serviceUrl)
    {
        const domModal = {modal : this.modal, container : this.modalContainer, head : this.modalHead, body : this.modalBody, footer : this.modalFooter}
        const script = document.createElement('script');

        script.onload = function () {
            if (modalService) {
                if (typeof modalService.setConfig === 'function') { modalService.setConfig(obj, domModal); }
                if (typeof modalService.setView === 'function') { modalService.setView(); }
            }
        };
        script.src = serviceUrl;
        
        this.modalBody.appendChild(script);
    }

    renderModalBody (response)
    {
        this.modalBody.innerHTML = response;

        this.modalDisplay();
    }
}