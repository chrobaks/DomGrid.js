/**
 *-------------------------------------------
 * GridAppLangModule.js
 *-------------------------------------------
 * @version 1.0
 * @createAt 17.06.2020 17:30
 * @updatedAt 01.03.2022 14:52
 * @author NetCoDev
 *-------------------------------------------
 **/

class GridAppLangModule extends GridModule
{
    constructor ()
    {
        super();

        this.eventConfig = [
            {container: document.body, selector : "a.lang", action : "click", callBack : "setRequest"},
        ];

        this.setEvents();
    }

    setRequest (obj)
    {
        const url = GridUi.dataSetValue(obj, 'requestUrl');

        if (url && !obj.classList.contains('active')) {
            [...document.body.querySelectorAll('a.lang')].map($e => {
                $e.classList.remove('active');
                if ($e.innerText === obj.innerText) {
                    $e.classList.add('active');
                }
            });
            // Send post request
            this.setModuleRequest("postRequest", {url : url, formData :[] , response : "setResponse"});
        }
    }

    setResponse (response)
    {
        if (GridUi.requestStatus(response)) {

            Object.entries(response.data).forEach(([key, value]) => {
                if (document.body.querySelectorAll('[data-translate="' + {key}.key +'"]').length) {
                    [...document.body.querySelectorAll('[data-translate="' +{key}.key+'"]')].map(obj => {
                        obj.innerHTML = {value}.value;
                    });
                }
            });
            this.setLinkTranslate(response);
        }
    }

    setLinkTranslate (response)
    {
        [...document.body.querySelectorAll('[data-link-translate]')].map($e => {
            const linkTranslate = (GridUi.dataSetValue($e, 'linkTranslate'))
                ? GridUi.dataSetValue($e, 'linkTranslate') .split(',') : [];
            let linkTxt = [];
            if (linkTranslate.length) {
                linkTranslate.map(key => {
                    if (key in response.data) {
                        linkTxt.push(response.data[key]);
                    }
                });
            }
            if (linkTxt.length) {
                $e.dataset.linkTxt = linkTxt.join(',');
            }
        });
    }
}

const GridAppLang = new GridAppLangModule();
