/**
 *-------------------------------------------
 * Class DomGrid
 *-------------------------------------------
 * @version 1.0.5
 * @createAt 15.06.2019 14:25
 * @updatedAt 01.03.2022 14:52
 * @author NetCoDev
 *-------------------------------------------
 **/

class DomGrid
{
    constructor (config)
    {
        this.config = config;
        this.container = document.getElementById(config.containerId);
        this.nameSpaces = [];
        this.components = [];
        this.modal = new GridModal();
        this.registeredScripts = [];
        this.error = [];
        this.env = [
            {"path": "component", "dataKey": "gridComponent", "selector" : "data-grid-component", "elements" : []},
            {"path": "element", "dataKey": "gridElement", "selector" : "data-grid-element", "elements" : []},
            {"path": "component", "dataKey": "gridRequired", "selector" : "data-grid-required", "elements" : []},
            {"path": "module", "dataKey": "gridModule", "selector" : "data-grid-module", "elements" : []},
            {"path": "route", "dataKey": "gridRoute", "selector" : "data-grid-route", "elements" : []},
        ];
        this.GridWatcher = new GridWatcher();
        // Load required js
        if (this.initRegisteredScripts()) {this.loadScript(0);}

        // Set ajax polyfill status
        GridAjax.setUsePolyFill();
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
                ? GridUi.dataSetValue(GridUi.closest('[data-grid-name-space]', $e), "gridNameSpace")
                : GridUi.dataSetValue($e, "gridNameSpace");
            const component = eval($e.dataset.gridComponent);
            if (typeof this.nameSpaces[nameSpace] === 'undefined') {
                this.nameSpaces[nameSpace] = {components: []};
            }
            if (typeof component !== undefined) {
                const newInstance = new component($e, nameSpace);
                const id = (GridUi.dataSetValue($e, 'gridComponentId')) ? GridUi.dataSetValue($e, 'gridComponentId') : $e.dataset.gridComponent;
                this.nameSpaces[nameSpace].components[id] = newInstance;
                if ($e.querySelectorAll("[data-grid-element]").length) {
                    this.initElements (newInstance, $e, nameSpace);
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
                    if (eval("typeof " + obj.dataset.gridElement) !== 'undefined') {
                        // Create object instance
                        if (typeof this.nameSpaces[parentNameSpace].elements === 'undefined') {
                            this.nameSpaces[parentNameSpace].elements = {};
                        }
                        const componentId = (GridUi.dataSetValue(component, 'gridComponentId')) ? GridUi.dataSetValue(component, 'gridComponentId') : component.dataset.gridComponent;
                        const element = eval(obj.dataset.gridElement);
                        const newInstance = new element(obj, {componentInstance : componentInstance, nameSpace : parentNameSpace, componentId : componentId});
                        const id = (GridUi.dataSetValue(obj, 'gridElementId')) ? GridUi.dataSetValue(obj, 'gridElementId') : obj.dataset.gridElement;
                        this.nameSpaces[parentNameSpace].elements[id] = newInstance;
                    }
                }
            });
        } 
    }

    initNameSpaceElement (componentInstance, listElements)
    {
        try {
            const nameSpace = componentInstance?.nameSpace;
            const componentId = componentInstance?.componentId;
            const env = this.getEnv('gridElement');
            if (nameSpace && componentId && listElements.length) {
                if (typeof this.nameSpaces[nameSpace].elements === 'undefined') {
                    this.nameSpaces[nameSpace].elements = {};
                }

                [...listElements].map(element => {
                    const gridElementId = element?.dataset?.gridElementId;
                    const gridElement = element?.dataset?.gridElement;
                    if (gridElementId && gridElement) {
                        if (eval("typeof " + gridElement) === 'undefined') {
                            const scriptFile = env["path"] + "/" + gridElement;
                            const callBack = {obj:this, method: "initElementInstance", params: [element, gridElement, gridElementId, componentInstance]};
                            this.addScript(scriptFile, callBack);
                        } else {
                            this.initElementInstance(element, gridElement, gridElementId, componentInstance);
                        }
                    }
                });
            }
        } catch (error) {
            console.error("DomGrid.initNameSpaceElement",  error.message);
        }
    }

    initElementInstance (element, gridElement, gridElementId, componentInstance)
    {
        try {
            const ElementClass = eval(gridElement);
            if (ElementClass) {
                this.nameSpaces[componentInstance?.nameSpace].elements[gridElementId] = new ElementClass(element, {
                    componentInstance: componentInstance,
                    nameSpace: componentInstance?.nameSpace,
                    componentId: componentInstance?.componentId
                });
            }
        } catch (error) {console.error("DomGrid.initElementInstance",  error.message);}
    }

    resetElements (namespace, listElements)
    {
        try {
            if (listElements.length && this.nameSpaces?.[namespace]) {
                [...listElements].map(element => {
                    const elementId = element?.dataset?.gridElementId;
                    if (elementId) {
                        delete this.nameSpaces[namespace].elements[elementId];
                        GridStage.GridWatcher.deleteWatcher(elementId);
                    }
                });
            }
        } catch (error) {console.error("DomGrid.resetElements",  error.message);}
    }

    addScript (file, callBack = {})
    {
        const script = document.createElement('script');
        script.onload = function () {
            if (callBack?.obj) {
                (callBack?.params) ? callBack.obj[callBack.method](...callBack.params) : callBack.obj[callBack.method]();
            }
        };
        script.onerror = function () {
            GridStage.setError("JS-Script kann nicht geladen werden: " + script.src);
        };
        script.src = this.config.scriptPath + file + ".js?" + Date.now();
        document.querySelector("head").appendChild(script);
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
        try {
            if (this.nameSpaces?.[nameSpaceId]) {
                let component = undefined;
                if (this.nameSpaces[nameSpaceId]?.components
                    && this.nameSpaces[nameSpaceId].components?.[componentId]
                ) {
                    component = this.nameSpaces[nameSpaceId].components[componentId];
                } else if (this.nameSpaces[nameSpaceId]?.elements
                    && this.nameSpaces[nameSpaceId].elements?.[componentId]
                ) {
                    component = this.nameSpaces[nameSpaceId].elements[componentId];
                }
                if (component && typeof component[method] === 'function') {
                    if (arguments.length > 3) {
                        if (arguments[3]?.length) {
                            component[method](...arguments[3]);
                        } else {
                            component[method](arguments[3]);
                        }
                    } else {
                        component[method]();
                    }
                }
            }
        } catch (error) {console.error("DomGrid.setNameSpaceComponentAction",  error.message, arguments);}
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
        if (this.nameSpaces.hasOwnProperty(nameSpaceId)
            && this.nameSpaces[nameSpaceId].components.hasOwnProperty(componentId)
        ) {
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
