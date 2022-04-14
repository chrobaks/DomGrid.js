class GridForm extends GridComponent
{
    constructor (obj, nameSpace) 
    { 
        super(obj, nameSpace); 

        this.eventConfig = [
            {selector : "button.btn-primary", action : "click", callBack : "setRequest"},
        ];

        this.setEvents();
    }

    setRequest (obj)
    {
        // Set formList
        const formList = [...this.container.querySelectorAll("input"), ...this.container.querySelectorAll("select"), ...this.container.querySelectorAll("textarea")];

        // Get form validation
        const error = GridUi.checkFormValidation(formList);

        // If empty required fields exists
        if (error.length) {
            alert("Folgende Felder benötigen einen Eintrag: " + error.join(", "));
            return false;
        }

        if (this.container.querySelectorAll("form").length) { // If found form
            // Submit form
            this.container.querySelectorAll("form")[0].submit();
            return false;
        } else { // Send Ajax Request
            // Set formData
            const formResults = GridUi.formListToData(formList);

            // Set request message
            this.setMessage("Die Daten werden gespeichert, bitte warten ..");

            // Send post request
            this.setComponentRequest(
                "postRequest",
                {
                    url : GridUi.dataSetValue(obj, "requestUrl"),
                    formData : formResults.formData,
                    response : "setResponse"
                });
        }
    }
} 