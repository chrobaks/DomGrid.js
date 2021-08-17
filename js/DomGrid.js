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

        // Load required js
        if (this.initScriptLoader()) {this.loadScript(0);}
    }

    initScriptLoader ()
    {
        const list = [...this.container.querySelectorAll("[data-grid-component]"), ...this.container.querySelectorAll("[data-grid-element]")];
        const listRequired = [...this.container.querySelectorAll("[data-grid-required]")];

        if (listRequired.length) {
            listRequired.map((obj) => {

                const scriptName = "component/" + GridUi.dataSetValue(obj, "gridRequired");

                if (!this.registeredScripts.includes(scriptName)) { this.registeredScripts.push(scriptName); }
            });
        }

        list.map((obj) => {
            const scriptName = (GridUi.dataSetValue(obj, "gridComponent") !== "")
                ? "component/" + GridUi.dataSetValue(obj, "gridComponent")
                : "element/" + GridUi.dataSetValue(obj, "gridElement");

            if (!this.registeredScripts.includes(scriptName)) { this.registeredScripts.push(scriptName);}
            
        });

        return !!(this.registeredScripts.length);
    }

    initNameSpaces ()
    {
        const list = document.querySelectorAll("[data-grid-name-space]");

        if (list.length) {
            [...list].map((obj) => { this.nameSpaces[obj.dataset.gridNameSpace] = {components : this.initComponents(obj)}; });
        }
    }

    initComponents (space)
    {
        
        const list = (GridUi.dataSetValue(space, "gridComponent") === "" ) ? space.querySelectorAll("[data-grid-component]") : [space];
        const result = [];
        
        if (list.length) {
            
            [...list].map((obj) => { 
                if (typeof eval(obj.dataset.gridComponent) !== undefined) {

                    const component = eval(obj.dataset.gridComponent);
                    const componentInstance = new component(obj, space.dataset.gridNameSpace);
                    const id = (GridUi.dataSetValue(obj, 'gridComponentId')) ? GridUi.dataSetValue(obj, 'gridComponentId') : obj.dataset.gridComponent;
                    
                    result[id] = componentInstance;

                    if (obj.querySelectorAll("[data-grid-element]").length) {
                        
                        this.initElements (componentInstance, obj, space.dataset.gridNameSpace);
                    }
                }
            });
        } 

        return result;
    }

    initElements (componentInstance, component, parentNameSpace)
    {
        // Element list with attribute data-grid-element
        const list = component.querySelectorAll("[data-grid-element]");

        if (list.length) {
            [...list].map((obj) => { 
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
                    alert(GridStage.error.join("\n"));
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

    postRequest (request)
    {
        const xhttp = new XMLHttpRequest();
        const _this = this;
        xhttp.open("POST", request.url, true);
        xhttp.send(request.formData);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                const responseData = JSON.parse(this.responseText);

                const status = (responseData.hasOwnProperty('status')) ? responseData.status : '';

                if (request.hasOwnProperty('response')) {
                    request.component[request.response](responseData);
                }
            }
        };
    }

    tplRequest (request)
    {
        const _this = this;
        const xhttp = new XMLHttpRequest();

        xhttp.open("GET", request.url, true);
        xhttp.onreadystatechange = function() { 
            if (this.readyState == 4 && this.status == 200) {

                const status = GridUi.getJsonFromStr('status', this.responseText);

                if (request.hasOwnProperty('response')) {
                    request.component[request.response](this.responseText);
                }
            } 
        };
        
        xhttp.send(); 
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