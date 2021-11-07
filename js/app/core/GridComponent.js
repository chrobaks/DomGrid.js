class GridComponent
{
    nameSpace;
    componentId;
    container;
    eventConfig;
    state;
    stateOk;
    containerUrl;

    constructor (container, nameSpace)
    {
        this.nameSpace = nameSpace;
        this.componentId = container.dataset.gridComponent;
        this.container = container;
        this.eventConfig = [];
        this.state = {};
        this.stateOk = true;
        this.containerUrl = GridUi.dataSetValue(this.container,'containerUrl');
    }

    setEvents ()
    {
        const _this =  this;
        const eventList = (!arguments.length) ? [...this.eventConfig] : [...arguments[0]];
        
        if (!this.stateOk || eventList.length < 1) {return false;}

        eventList.map((conf) => 
        {
            const list = (conf.selector !== '')
                ? this.container.querySelectorAll(conf.selector)
                : [this.container];

            if (list && list.length) {
                [...list].map((obj) => {
                    conf.action = /^on/g.test(conf.action) ? conf.action.replace(/^on/, '').toLowerCase() : conf.action;
                    obj.addEventListener (conf.action,() => {
                        const event = (conf.hasOwnProperty('callBack')) ? conf.callBack : null;
                        if (typeof this[event] !== 'undefined') {
                            if (conf.hasOwnProperty('callParam')) {
                                this[event](obj, conf.callParam);
                            } else {
                                this[event](obj);
                            }
                        }
                    }, true);
                });
            }
        });
    }

    setState (objState)
    {
        objState.map((obj) => {
            if (typeof obj.elmn !== 'undefined') {
                this.state[obj.id] = obj.elmn;
            } else {
                if(this.stateOk) {this.stateOk = false;}
            }
        });
    }

    setStateValue (key,val)
    {
        if (this.state.hasOwnProperty(key)) {this.state[key].value = val;}
    }

    setStateDataSetValue (key, dsKey, val)
    {
        if (this.state.hasOwnProperty(key) && this.state[key].dataset && this.state[key].dataset.hasOwnProperty(dsKey)) { this.state[key].dataset[dsKey] = val; }
    }

    setMessage (msg)
    {
        const componentMsg = this.container.querySelector(".component-msg");
        let strMsg = '';

        if (componentMsg) { 
            if (typeof msg === 'object' && msg.hasOwnProperty('status')) {
                strMsg = (msg.status === 'success') ? msg.msg : ((msg.hasOwnProperty('errorMsg')) ? msg.msg+"<br>"+msg.errorMsg : msg.msg);
            } else {
                strMsg = msg;
            }
            componentMsg.innerHTML = strMsg; 
        }
    }

    setComponentAction (conf)
    {
        const multipleAct = (arguments.length > 1) ? arguments[1] : false;

        if (!multipleAct) {
            GridStage.setNameSpaceComponentAction(this.nameSpace, ...conf);
        } else {
            conf.map((args) => {
                GridStage.setNameSpaceComponentAction(this.nameSpace, ...args);
            });
        }
    }

    setComponentRequest (requestAct, request)
    {
        request.component = this;

        GridStage[requestAct](request);
    }

    getState (key)
    {
        return (this.state.hasOwnProperty(key)) ? this.state[key] : null;
    }

    getStateDataSet (key, dsKey)
    {
        return (this.state.hasOwnProperty(key) && this.state[key].dataset && this.state[key].dataset.hasOwnProperty(dsKey)) ? this.state[key].dataset[dsKey] : null;
    }

    getComponentAction (conf)
    {
        return GridStage.getNameSpaceComponentAction(this.nameSpace, ...conf);
    }

    createElementInstance (elementId, param)
    {
        if (typeof eval(elementId) !== 'udefined') {
            const element = eval(elementId);
            
            element.createInstance(this, ...param);
        }
    }

    renderBody (html)
    {
        this.container.querySelector('tbody').innerHTML = html;
    }
}