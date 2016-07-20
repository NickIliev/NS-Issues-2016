import observable = require("data/observable");

export class MyViewModel extends observable.Observable {


    constructor() {
        super();

    }

    get firstSeries() {
        return [
            {"name":"April","Dresses":100000},
            {"name":"May","Top":30000,"Skirts":400000,"Jackets":500000},
            {"name":"June","Top":255500,"Skirts":35000,"Jackets":254000},
            {"name":"July","Dresses":258361,"Pants":20000,"Top":300000,"Skirts":25000,"Jackets":35620}
        ]
    }

    get secondSeries() {
        return [
            {"name":"April","Dresses":100000},
            {"name":"May","Skirts":400000,"Jackets":500000},
            {"name":"June","Top":255500,"Skirts":35000},
            {"name":"July","Top":300000,"Skirts":25000,"Jackets":35620}
        ]
    }
}