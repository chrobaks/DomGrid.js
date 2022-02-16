class GridAjax
{
    static usePolyFill;

    /**
     *
     * @param status boolean
     */
    static setUsePolyFill (status)
    {
        this.usePolyFill = status;
    }

    /**
     *
     * @param request object
     */
    static postRequest (request)
    {
        if (this.usePolyFill) {
            const xhttp = new XMLHttpRequest();
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
        } else {
            console.log("use fetch")
            const contentType = (request.hasOwnProperty('contentType')) ? request.contentType : 'application/json';
            fetch(request.url, {
                method : 'post',
                mode:    'cors',
                headers: {'Content-Type': contentType, 'Accept': 'application/json'},
                body: JSON.stringify(request.formData)
            })
                .then((res) => res.json())
                .then((data) => {
                    request.component[request.response](data);
                })
                .catch((error) => console.error(error));
        }
    }

    /**
     *
     * @param request object
     */
    static tplRequest (request)
    {
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

    /**
     *
     * @param request object
     */
    static modalRequest (request, obj)
    {
        if (this.usePolyFill) {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    GridStage.modal.modalResponse(obj, this.responseText);
                }
            };
            xhttp.open("GET", request.url, true);
            xhttp.send();
        } else {
            fetch(request.url, {
                method : 'get',
                mode:    'cors',
            })
                .then((res) => res.text())
                .then((data) => {
                    GridStage.modal.modalResponse(obj, data);
                })
                .catch((error) => console.error(error));
        }
    }
}