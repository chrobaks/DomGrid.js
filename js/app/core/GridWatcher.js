/**
 *-------------------------------------------
 * Class GridWatcher
 *-------------------------------------------
 * @version 1.0
 * @createAt 17.06.2020 17:30
 * @updatedAt 01.03.2022 14:52
 * @author NetCoDev
 *-------------------------------------------
 **/
class GridWatcher
{
    watchList;

    constructor ()
    {
        this.watchList = undefined
    }

    setWatcher (watchId, action)
    {
        if(typeof this.watchList === 'undefined') {
            this.watchList = {}
            this.watchList[watchId] = [action];
        } else {
            if (this.watchList?.[watchId] && this.checkActionIsUnique(this.watchList[watchId], action)) {
                this.watchList[watchId].push(action);
            } else {
                this.watchList[watchId] = [action];
            }
        }
    }

    getWatcher ()
    {
        return this.watchList;
    }

    runWatcher (watchId, params = [])
    {
        if (watchId && this.watchList?.[watchId] ) {
            this.watchList[watchId].map(action => {
                const actionParam = (params.length) ? [...action.meth, params] : [...action.meth];
                GridStage.setNameSpaceComponentAction(...actionParam);
            });
        }
    }

    deleteWatcher (watchId)
    {
        if (watchId && this.watchList?.[watchId])
        {
            delete this.watchList[watchId];
        }
    }

    checkActionIsUnique (list, action)
    {
        let result = true;
        list.find(argsAction => {if (argsAction.meth.toString() === action.meth.toString()) {result = false;}});

        return result;
    }
}