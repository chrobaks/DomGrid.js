/**
 *-------------------------------------------
 * Class GridAjax
 *-------------------------------------------
 * @version 1.0.5
 * @createAt 15.06.2019 14:45
 * @updatedAt 13.04.2022 14:52
 * @author NetCoDev
 *-------------------------------------------
 **/

class GridAjax
{
    static usePolyFill;

    /**
     * @return void
     */
    static setUsePolyFill ()
    {
        this.usePolyFill = (typeof fetch === 'undefined');
    }

    /**
     *
     * @param request object
     * @return void
     */
    static postRequest (request)
    {
        if (this.usePolyFill) {
            this.xhttpRequest(request,'POST', 'json', {
                obj: request.component,
                func: request.response,
            });
        } else {
            const REQUEST_CONTENT_TYPE = (request?.contentType) ? request.contentType : 'application/json';
            this.fetchRequest(
                request.url,
                {
                    method : 'post',
                    mode:    'cors',
                    headers: {'Content-Type': REQUEST_CONTENT_TYPE, 'Accept': REQUEST_CONTENT_TYPE},
                    body: JSON.stringify(request.formData)
                }, "json",
                {
                    obj: request.component,
                    func: request.response,
                });
        }
    }

    /**
     *
     * @param request object
     * @return void
     */
    static tplRequest (request)
    {
        if (this.usePolyFill) {
            this.xhttpRequest(request,'GET', 'text', {
                obj: request.component,
                func: request.response,
            });
        } else {
            this.fetchRequest(
                request.url, {method: 'get', mode: 'cors',}, "text",
                {
                    obj: request.component,
                    func: request.response,
                });
        }
    }

    /**
     *
     * @param request object
     * @param obj object
     * @return void
     */
    static modalRequest (request, obj = {})
    {
        if (this.usePolyFill) {
            this.xhttpRequest(request,'GET', 'text', {
                obj: GridStage.modal,
                func: 'modalResponse',
                param: {obj: obj},
            });
        } else {
            this.fetchRequest(
                request.url, {method: 'get', mode: 'cors',}, "text",
        {
                    obj: GridStage.modal,
                    func: 'modalResponse',
                    param: {obj: obj},
                });
        }
    }

    /**
     *
     * @param request object
     * @param method string
     * @param type string
     * @param callBack object
     * @constructor
     * @return void
     */
    static xhttpRequest (request, method, type, callBack)
    {
        try {
            const XHTTP = new XMLHttpRequest();
            XHTTP.open(method, request.url, true);
            if (request?.formData) {
                XHTTP.send(request.formData);
            } else {
                XHTTP.send();
            }
            XHTTP.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    const responseTypeData = (type === 'text') ? this.responseText : JSON.parse(this.responseText);
                    const PARAM = (callBack?.param?.obj) ? [callBack.param.obj, responseTypeData] : [responseTypeData]
                    callBack.obj[callBack.func](...PARAM);
                }
            };
        } catch (error) {console.error("XHTTP Error",  error.message);}
    }

    /**
     *
     * @param url string
     * @param options object
     * @param type string
     * @param callBack object
     * @return void
     */
    static fetchRequest (url, options, type, callBack)
    {
        fetch(url, options)
            .then(response => {
                const CONTENT_TYPE = response.headers.get('content-type');
                const CONTENT_CHECK = this.checkContentType(type, CONTENT_TYPE)
                if (!response.ok || !response?.[type] || !CONTENT_CHECK) {
                    if (!response.ok) {
                        return null;
                    } else if (!CONTENT_CHECK) {
                        throw new TypeError(`Expected ${type}, got ${CONTENT_TYPE}.`);
                    }
                    throw new TypeError(`Wrong content-type, ${type} is undefined..`);
                }
                return response[type]();
            })
            .then(data => {
                const PARAM = (callBack?.param?.obj) ? [callBack.param.obj, data] : [data]
                callBack.obj[callBack.func](...PARAM);
            })
            .catch(error => {
                if  (error instanceof TypeError) {
                    console.error("TypeError found" , error.message);
                } else {
                    console.error("Error found" , error.message);
                }
            });
    }

    /**
     *
     * @param typeKey string
     * @param CONTENT_TYPE string
     * @return {*|boolean}
     */
    static checkContentType (typeKey, CONTENT_TYPE)
    {
        const TYPEREGEX = {
            text: /^text/i,
            json: /^application\/json/i
        };

        return (TYPEREGEX?.[typeKey] && TYPEREGEX[typeKey].test(CONTENT_TYPE));
    }
}
