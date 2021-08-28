export class DataTableUtile {
    static getStrNumber(i, str) {
        let res = "";
        let nextChar = null;
        let doIt = true;
        while (doIt) {
            res += "" + str[i];
            if (i + 1 < str.length && /^[\d]$/.test(str[i + 1])) {
                i++;
            } else {
                if (i + 1 < str.length) {
                    nextChar = str[i + 1];
                }
                doIt = false;
            }
        }

        return {res: res, nextChar: nextChar};
    }

    static getSortRes(a, b, orderAsc) {
        if (a < b) return ((orderAsc) ? 1 : -1);
        if (a > b) return ((orderAsc) ? -1 : 1);
        return 0;
    }

    static getSort(arr, orderAsc, config) {
        let res = arr;
        res.sort(function (a, b) {
            return DataTableUtile.getSortRes(a[1], b[1], orderAsc)
        });

        return res.sort(function (a, b) {
            if (/^[\d]{2}\.[\d]{2}\.[\d]{4}$/.test(a[1]) && /^[\d]{2}\.[\d]{2}\.[\d]{4}$/.test(b[1])) {
                return DataTableUtile.sortDate(a[1], b[1], orderAsc, config.dateLang);
            } else {
                return DataTableUtile.sortString(a, b, orderAsc);
            }
        });
    }

    static getLangDate(date, lang) {
        date = date.split('.');
        const res = (lang === 'de') ? new Date(date[2] * 1, date[1] * 1 - 1, date[0] * 1).getTime() : new Date(date[2] * 1, date[0] * 1 - 1, date[1] * 1).getTime();

        return res;
    }

    static sortDate(a, b, orderAsc, dateLang) {
        const dateA = DataTableUtile.getLangDate(a, dateLang);
        const dateB = DataTableUtile.getLangDate(b, dateLang);

        return DataTableUtile.getSortRes(dateA, dateB, orderAsc);
    }

    static getValidInpt(obj) {
        let intVal = obj.inpt.value.trim();
        let res = null;

        if (/^[\d]+$/.test(intVal) && intVal) {
            if (obj.max < intVal * 1) {
                intVal = obj.max;
                obj.inpt.value = intVal;
            }
            res = intVal * 1;
        } else {
            obj.inpt.value = obj.default;
        }

        return res;
    }

    static sortString(a, b, orderAsc) {
        const arr0 = (a[1]) ? a[1].toLowerCase().match(/[^\W*]/g) : "";
        const arr1 = (b[1]) ? b[1].toLowerCase().match(/[^\W*]/g) : "";
        let res0 = "";
        let res1 = "";

        for (let i = 0; i < arr0.length; i++) {
            if (/^[\d]$/.test(arr0[i]) && /^[\d]$/.test(arr1[i])) {
                const objNr0 = this.getStrNumber(i, arr0);
                const objNr1 = this.getStrNumber(i, arr1);
                let n0 = objNr0.res * 1;
                let n1 = objNr1.res * 1;

                if (n0 === n1) {
                    if (objNr0.nextChar !== null && objNr1.nextChar === null) {
                        n0 = 1;
                        n1 = 0;
                    } else if (objNr1.nextChar !== null && objNr0.nextChar === null) {
                        n0 = 0;
                        n1 = 1;
                    }
                }
                return DataTableUtile.getSortRes(n0, n1, orderAsc);
            }
            if (arr1.length <= i && res0 === res1 || arr0[i] != arr1[i] && /^[\d]$/.test(arr1[i])) {
                return (!orderAsc) ? 1 > 0 : 1 < 0;
            } else {
                res0 = arr0[i];
                res1 = arr1[i];
                if (arr0[i] != arr1[i]) {
                    return DataTableUtile.getSortRes(arr0[i], arr1[i], orderAsc);
                }
            }
        }

        return DataTableUtile.getSortRes(res1, res0, orderAsc);
    }
}
