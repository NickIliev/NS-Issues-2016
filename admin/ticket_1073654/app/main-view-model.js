"use strict";
var TicketViewModel = (function () {
    function TicketViewModel() {
    }
    Object.defineProperty(TicketViewModel.prototype, "ticketOrder", {
        get: function () {
            if (!this._ticketOrder) {
                this._ticketOrder = new TicketOrder();
            }
            return this._ticketOrder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TicketViewModel.prototype, "movies", {
        get: function () {
            if (!this._items) {
                this._items = new Array();
                this._items.push("Zootopia");
                this._items.push("Captain America");
                this._items.push("The Jungle Book");
            }
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    return TicketViewModel;
}());
exports.TicketViewModel = TicketViewModel;
var TicketOrder = (function () {
    function TicketOrder() {
        this.movie = "Zootopia";
        this.date = "2016-04-06";
        this.time = "20:00";
        this.type = "2D";
        this.price = 9.50;
        this.numberOfTickets = 2;
        this.contactName = null;
        this.contactPhone = null;
        this.contactEmail = null;
        this.agreeTerms = false;
        this.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    }
    return TicketOrder;
}());
exports.TicketOrder = TicketOrder;
//# sourceMappingURL=main-view-model.js.map