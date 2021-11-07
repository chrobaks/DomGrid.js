class GridLinkElement extends GridElement
{
    action;

    constructor (container, parent)
    {
        super(container, parent);
        // Link action method name
        this.action = GridUi.dataSetValue(this.container, 'action');
        // Click event
        this.container.onclick = () => { if (this.action && typeof this[this.action] !== 'undefined') {
            this[this.action]();
        } };
    }

    replaceUrl ()
    {
        const path = GridUi.dataSetValue(this.container, 'requestUrl');
        const param = GridUi.dataSetValue(this.container, 'requestParam');
        // Call new href
        if (path) {
            this.container.href = path.replace('0', param);
        }
    }
}