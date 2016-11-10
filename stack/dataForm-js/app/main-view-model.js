var Value = (function() {
    function Value(text, value) {
        this.text  = text;
        this.value = value;
    }
    return Value;
})();

var ValueModel = (function() {
    function ValueModel() {}

    Object.defineProperty(ValueModel.prototype, "model", {
        get: function () {
            if (!this._model) {
                this._model = new Value("This is a text", "VALUE 1");
            }
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    return ValueModel;
})();

exports.Value = Value;
exports.ValueModel = ValueModel;