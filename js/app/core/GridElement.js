/**
 *-------------------------------------------
 * Class GridElement
 *-------------------------------------------
 * @version 1.0
 * @createAt 15.06.2020 17:30
 * @updatedAt 01.03.2022 14:52
 * @author NetCoDev
 *-------------------------------------------
 **/
class GridElement
{
    parent;
    container;
    eventConfig;
    elementId;
    containerTriggerUrl;
    containerUpdateUrl;
    gridWatcher;

    constructor (container, parent)
    {
        this.parent = parent;
        this.container = container;
        this.eventConfig = [];
        this.elementId = GridUi.dataSetValue(this.container, 'gridElementId');
        this.containerTriggerUrl = GridUi.dataSetValue(this.container, 'containerTriggerUrl');
        this.containerUpdateUrl = GridUi.dataSetValue(this.container, 'containerUpdateUrl');
        this.gridWatcher = GridUi.dataSetValue(this.container, 'gridWatcher');
    }

    setEvents ()
    {
        if (!this.eventConfig.length) {return false;}

        this.eventConfig.map((conf) => {

            const list = (conf?.container)
                ? conf.container.querySelectorAll(conf.selector)
                : this.container.querySelectorAll(conf.selector);

            if (list && list.length) {
                [...list].map((obj) => {
                    obj[conf.action] = () => {

                        const event = (conf.hasOwnProperty('callBack')) ? conf.callBack : null;
                        
                        if (typeof this[event] !== 'undefined') { 
                            if (conf.hasOwnProperty('callParam')) {
                                this[event](obj, conf.callParam);
                            } else {
                                this[event](obj);
                            }
                        }
                    }
                });
            }
        });
    }

    setComponentAction (act)
    {
        const args = (arguments.length > 1) 
            ? [this.parent.nameSpace, this.parent.componentId, act, arguments[1]] 
            : [this.parent.nameSpace, this.parent.componentId, act];
            
        GridStage.setNameSpaceComponentAction(...args);
    }

    setParentAction (act)
    {
        (arguments.length > 1) ? this.parent.componentInstance[act](arguments[1]) : this.parent.componentInstance[act]();
    }
    

    setElementRequest (requestAct, request)
    {
        request.component = this;

        GridAjax[requestAct](request);
    }
}