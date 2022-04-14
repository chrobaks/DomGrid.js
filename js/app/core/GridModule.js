class GridModule
{
    eventConfig;

    setEvents ()
    {
        const eventList = (!arguments.length) ? [...this.eventConfig] : [...arguments[0]];

        eventList.map((conf) =>
        {
            const list = (conf.selector !== '')
                ? conf.container.querySelectorAll(conf.selector)
                : [conf.container];
            if (list && list.length) {
                [...list].map((obj) => {
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

    setModuleRequest (requestAct, request)
    {
        request.component = this;

        GridAjax[requestAct](request);
    }
}