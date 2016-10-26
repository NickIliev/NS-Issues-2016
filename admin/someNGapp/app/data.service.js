"use strict";
var core_1 = require('@angular/core');
var Country = (function () {
    function Country(Country, Amount, SecondVal, ThirdVal, Impact, Year) {
        this.Country = Country;
        this.Amount = Amount;
        this.SecondVal = SecondVal;
        this.ThirdVal = ThirdVal;
        this.Impact = Impact;
        this.Year = Year;
    }
    return Country;
}());
exports.Country = Country;
var DataService = (function () {
    function DataService() {
    }
    DataService.prototype.getCategoricalSource = function () {
        return [
            { Country: "Germany", Amount: 15, SecondVal: 14, ThirdVal: 24, Impact: 24, Year: 0 },
            { Country: "France", Amount: 13, SecondVal: 23, ThirdVal: 25, Impact: 48, Year: 0 },
            { Country: "Bulgaria", Amount: 24, SecondVal: 17, ThirdVal: 23, Impact: 15, Year: 0 },
            { Country: "Spain", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 6, Year: 0 },
            { Country: "USA", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 18, Year: 0 }
        ];
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map