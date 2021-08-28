import {Ui} from "../Ui/GridUi";

/**
 * @property ui {Ui}
 * @property config {Config}
 */
export class Loader {

    constructor(config) {
        this.config = config;
        this.ui = this.config.service.ui;

        this.namespaces = {};
        this.loaders = {};
        this.loadingLoaders = 0;
        // das Nachladen von Javascripts macht eigendlich keinen Sinn dank Webpack
        // this.startLoaders();
        if (this.loadingLoaders === 0) {
            this.eventAllLoadersReady();
        }
    }

    startLoaders() {
        const groups = [
            'namespace',
            'service',
            'element',
            'component'
        ];
        let $header = this.config.$container.find("header");
        groups.map((group) => {
            let $nodes = this.config.$container.find("[data-domgrid-" + group + "]");
            $nodes.map(($node) => {
                let scriptName = $node.data('domgrid-' + group);
                if (scriptName === undefined) return;
                let uri = this.config.getScriptUri(scriptName, group);
                if (!this.loaders.includes(uri)) {
                    this.loaders.push(uri);
                    this.loadingLoaders++;
                    let $script = $header.create('script');
                    $script.attr("src", uri);
                    $script.bind("load", this.eventLoaderLoaded);
                    $script.appendTo($header);
                }
            });
        })
    }

    eventLoaderLoaded() {
        this.loadingLoaders--;
        if (this.loadingLoaders === 0) {
            this.eventAllLoadersReady();
        }
    }

    eventAllLoadersReady() {
        this.namespaces = this.initNamespaces();
    }

    initNamespaces() {
        const $namespaces = this.config.$container.find("[data-domgrid-namespace]");
        const namespaces = [];

        if ($namespaces.length === 0) {
            this.initNamespace(this.config.$container, 'GlobalNamespace');
        }

        $namespaces.map(($namespace) => {
            let namespace = $namespace.data("domgrid-namespace");
            if (namespace !== undefined) {
                namespaces.push(this.initNamespace($namespace, namespace)); // ja, wir pushen, ggf nicht unique
            }
        });

        return namespaces;
    }

    initNamespace($namespace, namespace) {
        if (!this.config.namespaces.hasOwnProperty(namespace)) {
            return this.error(['undefined namespace', namespace]);
        }
        let instance = new this.config.namespaces[namespace]($namespace);
        instance.components = this.initComponents($namespace);
        return instance;
    }

    initComponents($namespace) {
        const $components = $namespace.find("[data-domgrid-component]");

        const components = [];

        $components.map(($component) => {
            let component = $component.data("domgrid-component");
            if (component !== undefined) {
                components.push(this.initComponent($component, component)); // ja, wir pushen, ggf nicht unique
            }
        });

        return components;
    }

    initComponent($component, component) {
        if (!this.config.components.hasOwnProperty(component)) {
            return this.error(['undefined component', component]);
        }
        let instance = new this.config.components[component]($component);
        instance.elements = this.initElements($component);
        return instance;
    }

    initElements($component) {
        const $elements = $component.find("[data-domgrid-element]");

        const elements = [];

        $elements.map(($element) => {
            let element = $element.data("domgrid-component");
            if (element !== undefined) elements.push(this.initElement($element, element));
        });

        return elements;
    }

    initElement($element, element) {
        if (!this.config.elements.hasOwnProperty(element)) {
            return this.error(['undefined element', element]);
        }

        let instance = new this.config.elements[element]($element);
        return instance;
    }

    // Das gehört hier nicht mehr hin:

    postRequest(request) {
        const xhttp = new XMLHttpRequest();
        const _this = this;
        xhttp.open("POST", request.url, true);
        xhttp.send(request.formData);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                const responseData = JSON.parse(this.responseText);

                const status = (responseData.hasOwnProperty('status')) ? responseData.status : '';

                if (request.hasOwnProperty('response')) {
                    request.component[request.response](responseData);
                }
            }
        };
    }

    tplRequest(request) {
        const _this = this;
        const xhttp = new XMLHttpRequest();

        xhttp.open("GET", request.url, true);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                const status = Ui.getJsonFromStr('status', this.responseText);

                if (request.hasOwnProperty('response')) {
                    request.component[request.response](this.responseText);
                }
            }
        };

        xhttp.send();
    }

    setNameSpaceComponentAction(nameSpaceId, componentId, method) {
        if (this.namespaces.hasOwnProperty(nameSpaceId) && this.namespaces[nameSpaceId].components.hasOwnProperty(componentId)) {

            const component = this.namespaces[nameSpaceId].components[componentId];

            if (typeof component[method] === 'function') {
                if (arguments.length > 3) {
                    component[method](arguments[3]);
                } else {
                    component[method]();
                }
            }
        }
    }

    setError(error) {
        this.error.push(error);
    }

    getError() {
        return this.error;
    }

    getNameSpaceComponentAction(nameSpaceId, componentId, method) {
        let result = null;

        if (this.namespaces.hasOwnProperty(nameSpaceId) && this.namespaces[nameSpaceId].components.hasOwnProperty(componentId)) {

            const component = this.namespaces[nameSpaceId].components[componentId];

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

    error(args) {
        console.error(args);
        return null;
    }
}