class GridContentApi extends GridComponent
{

    constructor (obj, nameSpace)
    {
        super(obj, nameSpace);

        this.setRequest();
    }

    setRequest ()
    {
        const url = GridUi.dataSetValue(this.container, 'requestUrl');
        const contentId = GridUi.dataSetValue(this.container, 'contentId');

        console.log("setRequest",url, contentId)
        if (url && contentId) {
            // Send post request
            this.setComponentRequest("postRequest", {url : url, formData :GridUi.formData({"contentId": contentId}) , response : "setResponse"});
        }
    }

    setResponse (response)
    {
        console.log("setResponse", response)
    }
}