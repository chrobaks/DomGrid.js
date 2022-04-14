/**
 *-------------------------------------------
 * Class GridModal
 *-------------------------------------------
 * @version 1.0.5
 * @createAt 15.06.2019 15:05
 * @updatedAt 13.04.2022 14:52
 * @author NetCoDev
 *-------------------------------------------
 **/

class GridModal
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
        this.modalType = "save";

        this.modalEvent();
    }

    modalDisplay ()
    {
        this.modal.style.display = (this.modal.style.display === 'inline-block') ? 'none' : 'inline-block';

        if (this.modal.style.display === 'inline-block') {
            document.body.classList.add('no-scroll');
            this.modalBg.style.height = window.innerHeight + "px";
            this.modalContainer.style.top = (100 + window.scrollY) + "px";
            [...this.modal.querySelectorAll('button')].map((btn) => {
                btn.style.display = 'block';
            });
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

    modalRequest (request, obj, modalType = "save", modalView = "")
    {
        this.modalType = modalType;
        GridAjax.modalRequest(request, obj);
        if (!modalView) {
            this.modalContainer.classList.remove('expand');
        } else {
            this.modalContainer.classList.add('expand');
        }
    }

    modalResponse (obj, response)
    {
        this.setModalType();
        this.renderModalBody(response);

        if (this.modalBody.querySelector('[data-service-js]')) {
            this.loadService(obj, this.modalBody.querySelector('[data-service-js]').dataset.serviceJs)
        } else {
            this.modalFooter.querySelector('.btn.save').style.display = 'none';
        }
    }

    modalTitle (strTitle)
    {
        this.modalHead.querySelector('.title').innerHTML = strTitle;
    }

    setModalType ()
    {
        switch (this.modalType) {
            case 'prompt':
                this.modal.querySelector('button.save').innerHTML = "Daten löschen";
                this.modal.querySelector('button.close').innerHTML = "Abbrechen";
                break;
            default:
                this.modal.querySelector('button.save').innerHTML = "Daten speichern";
                this.modal.querySelector('button.close').innerHTML = "Fenster schliessen";
                break;
        }
    }

    loadService (obj, serviceUrl)
    {
        const domModal = {modal : this.modal, container : this.modalContainer, head : this.modalHead, body : this.modalBody, footer : this.modalFooter}
        const script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');

        script.onload = function () {
            if (typeof modalService !== "undefined") {
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