class GridElement
{
    parent;
    container;
    eventConfig;

    constructor (container, parent)
    {
        this.parent = parent;
        this.container = container;
        this.eventConfig = [];
    }

    setEvents ()
    {
        if (!this.eventConfig.length) {return false;}

        this.eventConfig.map((conf) => {

            const list = this.container.querySelectorAll(conf.selector);

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

        GridStage[requestAct](request);
    }
}