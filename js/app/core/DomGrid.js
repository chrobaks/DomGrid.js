class DomGrid
{
    constructor (config)
    {
        this.config = config;
        this.container = document.getElementById(config.containerId);
        this.nameSpaces = [];
        this.components = [];
        this.modal = new gridModal();
        this.registeredScripts = [];
        this.error = [];
        this.env = [
            {"path": "component", "dataKey": "gridComponent", "selector" : "data-grid-component", "elements" : []},
            {"path": "element", "dataKey": "gridElement", "selector" : "data-grid-element", "elements" : []},
            {"path": "component", "dataKey": "gridRequired", "selector" : "data-grid-required", "elements" : []},
            {"path": "module", "dataKey": "gridModule", "selector" : "data-grid-module", "elements" : []},
            {"path": "route", "dataKey": "gridRoute", "selector" : "data-grid-route", "elements" : []},
        ];
        // Load required js
        if (this.initRegisteredScripts()) {this.loadScript(0);}

        // Set ajax polyfill status
        GridAjax.setUsePolyFill(false);
    }

    initRegisteredScripts ()
    {
        this.env.map(obj => {
            switch(obj.dataKey)
            {
                case 'gridRoute':
                    const route = GridUi.dataSetValue(this.container, obj.dataKey);
                    if (route) {
                        this.registeredScripts.push("route/" + route + ".route");
                    }
                    break;
                case 'gridModule':
                    obj.elements = (obj.dataKey in this.container.dataset)
                        ? [...this.container.querySelectorAll("[" + obj.selector +"]"), this.container]
                        : [...this.container.querySelectorAll("[" + obj.selector +"]")];
                    break;
                default:
                    obj.elements = [...this.container.querySelectorAll("[" + obj.selector +"]")];
            }
            if (obj.elements.length) {
                obj.elements.map($e => {
                    const dataset = GridUi.dataSetValue($e, obj.dataKey).split(',');
                    dataset.map(item => {
                        const scriptName = obj.path + "/" + item.trim();
                        if (!this.registeredScripts.includes(scriptName)) {
                            this.registeredScripts.push(scriptName);
                        }
                    });
                });
            }
        });

        return !!(this.registeredScripts.length);
    }

    initNameSpaces ()
    {
        const env = this.getEnv('gridComponent');
        env.elements.map($e => {
            const nameSpace =  (GridUi.dataSetValue($e, "gridNameSpace") === "" )
                ? GridUi.closest('[data-grid-name-space]', $e)
                : GridUi.dataSetValue($e, "gridNameSpace");
            const component = eval($e.dataset.gridComponent);
            if (typeof this.nameSpaces[nameSpace] === 'undefined') {
                this.nameSpaces[nameSpace] = {components: []};
            }
            if (typeof component !== undefined) {
                const componentInstance = new component($e, nameSpace);
                const id = (GridUi.dataSetValue($e, 'gridComponentId')) ? GridUi.dataSetValue($e, 'gridComponentId') : $e.dataset.gridComponent;
                this.nameSpaces[nameSpace].components[id] = componentInstance;
                if ($e.querySelectorAll("[data-grid-element]").length) {
                    this.initElements (componentInstance, $e, nameSpace);
                }
            }
        });
    }

    initElements (componentInstance, component, parentNameSpace)
    {
        // Element list with attribute data-grid-element
        const env = this.getEnv('gridElement');
        if (env.elements.length) {
            env.elements.map((obj) => {
                // Select closest component as parent component
                const parent = GridUi.closest("[data-grid-component]", obj);
                // If parent exists
                if (parent && parent.dataset.gridComponent === component.dataset.gridComponent) {
                    // If element object exists
                    if (typeof eval(obj.dataset.gridElement) !== 'undefined') {
                        // Create object instance
                        const element = eval(obj.dataset.gridElement);

                        new element(obj, {componentInstance : componentInstance, nameSpace : parentNameSpace, componentId : component.dataset.gridComponent});
                    }
                }
            });
        }
    }

    loadScript (scriptIndex)
    {
        const script = document.createElement('script');
        const registeredScripts = this.registeredScripts;
        // Script onload event
        script.onload = function () {
            if (scriptIndex + 1 < registeredScripts.length) {
                GridStage.loadScript(scriptIndex+1);
            } else {
                // If script loading went wrong
                if (GridStage.error.length) {
                    console.error(GridStage.getError());
                } else {
                    GridStage.initNameSpaces();
                }
            }
        };

        script.onerror = function () {
            GridStage.setError("JS-Script kann nicht geladen werden: " + script.src);
        };

        script.src = this.config.scriptPath + this.registeredScripts[scriptIndex] + ".js?" + Date.now();

        document.querySelector("head").appendChild(script);
    }

    setNameSpaceComponentAction (nameSpaceId, componentId, method)
    {
        if (this.nameSpaces.hasOwnProperty(nameSpaceId) && this.nameSpaces[nameSpaceId].components.hasOwnProperty(componentId)) {
            const component = this.nameSpaces[nameSpaceId].components[componentId];
            if (typeof component[method] === 'function') {
                if (arguments.length > 3) {
                    component[method](arguments[3]);
                } else {
                    component[method]();
                }
            }
        }
    }

    setError (error)
    {
        this.error.push(error);
    }

    getError ()
    {
        return this.error;
    }

    getEnv (dataKey)
    {
        let result = {};
        this.env.map(obj => { if (obj.dataKey === dataKey) { result = {...obj}; }});

        return result;
    }

    getNameSpaceComponentAction (nameSpaceId, componentId, method)
    {
        let result = null;
        if (this.nameSpaces.hasOwnProperty(nameSpaceId) && this.nameSpaces[nameSpaceId].components.hasOwnProperty(componentId)) {
            const component = this.nameSpaces[nameSpaceId].components[componentId];
            if (typeof component[method] === 'function') {
                if (arguments.length > 3) {
                    result = component[method](arguments[3]);
                } else {
                    result = component[method]();
                }
            }
        }

        return result;
    }
}
