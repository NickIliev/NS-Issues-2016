import observable = require("data/observable");

export class HelloWorldModel extends observable.Observable {

    get categoricalSource() {
        return [
            { Country: "Germany", Amount: 0, SecondVal: 14, ThirdVal: 24 },
            { Country: "France", Amount:0, SecondVal: 23, ThirdVal: 25 },
            { Country: "Bulgaria", Amount: 0, SecondVal: 17, ThirdVal: 23 },
            { Country: "Spain", Amount: 0, SecondVal: 19, ThirdVal: 24 },
            { Country: "USA", Amount: 60, SecondVal: 8, ThirdVal: 21 }
        ]
    }
}