/**
 *-------------------------------------------
 * GridPageLinkModule.js
 *-------------------------------------------
 * @version 1.0
 * @createAt 17.06.2020 17:30
 * @updatedAt 01.03.2022 14:52
 * @author NetCoDev
 *-------------------------------------------
 **/

class GridPageLinkModule extends GridModule
{
    constructor(selector)
    {
        super();

        // Set a status object to control smooth scroll action
        this.statusObj = {status : 0};
        this.eventConfig = [
            {container: document.body,selector : selector, action : "click", callBack : "smoothScroll"},
        ];
        this.setEvents();
    }

    smoothScroll ($e)
    {
        const id = GridUi.dataSetValue($e, 'id');
        if (id && document.getElementById(id)) {
            const y = document.getElementById(id).offsetTop - 10;
            this.statusObj.status = 1;
            window.requestAnimationFrame(() => {GridUi.checkScrollEnd(y, this.statusObj)});
            window.scrollTo({top: y, left: 0, behavior: 'smooth'});
        }
    }
}

const GridPageLink = new GridPageLinkModule('.page-link');
