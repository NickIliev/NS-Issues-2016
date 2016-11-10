var commonModule = require("./dataform-common");
var color_1 = require("color");
var observableModule = require("data/observable");
require("utils/module-merge").merge(commonModule, exports);
//////////////////////////////////////////////
var TKDataFormDelegateImplementation = (function (_super) {
    __extends(TKDataFormDelegateImplementation, _super);
    function TKDataFormDelegateImplementation() {
        _super.apply(this, arguments);
    }
    TKDataFormDelegateImplementation.new = function () {
        return _super.new.call(this);
    };
    TKDataFormDelegateImplementation.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    /**
     * Called when a row with the corresponding property is selected.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidSelectEditorForProperty = function (dataForm, editor, property) {
        var args = {
            eventName: commonModule.RadDataForm.editorSelectedEvent,
            object: this._owner,
            editor: editor,
            entityProperty: property,
            propertyName: property.name,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * Called when a row with the corresponding property is deselected.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidDeselectEditorForProperty = function (dataForm, editor, property) {
        var args = {
            eventName: commonModule.RadDataForm.editorDeselectedEvent,
            object: this._owner,
            editor: editor,
            entityProperty: property,
            propertyName: property.name,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * Called after a property is edited.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidEditProperty = function (dataForm, property) {
        var args = {
            eventName: commonModule.RadDataForm.propertyEditedEvent,
            object: this._owner,
            editor: null,
            entityProperty: property,
            propertyName: property.name,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * Called after a property is validated.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidValidatePropertyEditor = function (dataForm, property, editor) {
        var args = {
            eventName: commonModule.RadDataForm.propertyValidatedEvent,
            object: this._owner,
            editor: editor,
            entityProperty: property,
            propertyName: property.name,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * Called when a property has to be validated.
     */
    TKDataFormDelegateImplementation.prototype.dataFormValidatePropertyEditor = function (dataForm, property, editor) {
        var args = {
            eventName: commonModule.RadDataForm.propertyValidateEvent,
            object: this._owner,
            editor: editor,
            entityProperty: property,
            propertyName: property.name,
            returnValue: true
        };
        this._owner.notify(args);
        return args.returnValue;
    };
    /**
     *  Called once when the data form creates its ediors. This method lets you to set properties that are not going to be changed.
     */
    TKDataFormDelegateImplementation.prototype.dataFormSetupEditorForProperty = function (dataForm, editor, property) {
        var entityProperty = this._owner.getPropertyByName(property.name);
        if (!entityProperty) {
            entityProperty = this._owner._createPropertyFromNative(property);
            if (!this._owner.properties) {
                this._owner.properties = new Array();
            }
            this._owner.properties.push(entityProperty);
        }
        this._owner._attachPropertyChangeListener(entityProperty);
        entityProperty._updateNativeEditor(editor);
        var args = {
            eventName: commonModule.RadDataForm.editorSetupEvent,
            object: this._owner,
            editor: editor,
            entityProperty: property,
            propertyName: property.name,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * Called before an editor is desplayed to the screen or after validation. This method lets you change the visual styles and setting of TKDataFormEditor object.
     */
    TKDataFormDelegateImplementation.prototype.dataFormUpdateEditorForProperty = function (dataForm, editor, property) {
        var entityProperty = this._owner.getPropertyByName(property.name);
        entityProperty.editor.applyStyle();
        var args = {
            eventName: commonModule.RadDataForm.editorUpdateEvent,
            object: this._owner,
            editor: editor,
            entityProperty: property,
            propertyName: property.name,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * This method lets you change the visual styles and setting of TKEntityPropertyGroupView object.
     */
    TKDataFormDelegateImplementation.prototype.dataFormUpdateGroupViewForGroupAtIndex = function (dataForm, groupView, groupIndex) {
        //apply style customizations for defined in xml groups only and escape the default group with fields not included in xml 
        if (!this._owner.groups) {
            groupView.titleView.hidden = true;
            return;
        }
        if (groupIndex < this._owner.groups.length) {
            var group = this._owner.groups[groupIndex];
            groupView.collapsible = group.collapsible;
            groupView.hidden = group.hidden;
            if (!group.titleStyle) {
                group.titleStyle = new commonModule.GroupTitleStyle();
            }
            this._owner._applyGroupTitleStyle(groupView, group.titleStyle);
            this._owner._attachGroupChangeListener(group);
        }
        //throw event for additional customizations
        var groupName = groupView != null && groupView.group != null ? groupView.group.name : null;
        var args = {
            eventName: commonModule.RadDataForm.groupUpdateEvent,
            object: this._owner,
            group: groupView,
            groupName: groupName,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * Called just before a property value will be committed to the business object.
     */
    TKDataFormDelegateImplementation.prototype.dataFormWillCommitProperty = function (dataForm, property) {
        var args = {
            eventName: commonModule.RadDataForm.propertyCommitEvent,
            object: this._owner,
            entityProperty: property,
            propertyName: property.name,
            returnValue: true
        };
        this._owner.notify(args);
        return args.returnValue;
    };
    /**
     * Called after a property value is committed to the business object.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidCommitProperty = function (dataForm, property) {
        var args = {
            eventName: commonModule.RadDataForm.propertyCommittedEvent,
            object: this._owner,
            entityProperty: property,
            propertyName: property.name,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * Called after a group is collapsed.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidCollapseGroupView = function (dataForm, groupView) {
        var groupName = groupView != null && groupView.group != null ? groupView.group.name : null;
        var args = {
            eventName: commonModule.RadDataForm.groupCollapsedEvent,
            object: this._owner,
            group: groupView,
            groupName: groupName,
            returnValue: true
        };
        this._owner.notify(args);
    };
    /**
     * Called after a group is expanded.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidExpandGroupView = function (dataForm, groupView) {
        var groupName = groupView != null && groupView.group != null ? groupView.group.name : null;
        var args = {
            eventName: commonModule.RadDataForm.groupExpandedEvent,
            object: this._owner,
            group: groupView,
            groupName: groupName,
            returnValue: true
        };
        this._owner.notify(args);
    };
    TKDataFormDelegateImplementation.ObjCProtocols = [TKDataFormDelegate];
    return TKDataFormDelegateImplementation;
})(NSObject);
////////////////////////////////////////////////////////////////////////////
var RadDataForm = (function (_super) {
    __extends(RadDataForm, _super);
    function RadDataForm() {
        _super.call(this);
        this._initialized = false;
        this._ios = TKDataForm.new();
        this._nativeDelegate = TKDataFormDelegateImplementation.new().initWithOwner(this);
    }
    Object.defineProperty(RadDataForm.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RadDataForm.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        this._ios.delegate = this._nativeDelegate;
    };
    RadDataForm.prototype.onUnloaded = function () {
        this._ios.delegate = null;
    };
    Object.defineProperty(RadDataForm.prototype, "editedObject", {
        get: function () {
            var result = this._ios.dataSource.writeJSONToString();
            var parsedResult = JSON.parse(result);
            var finalResult = JSON.stringify(parsedResult);
            return finalResult;
        },
        enumerable: true,
        configurable: true
    });
    RadDataForm.prototype._reset = function () {
        this._dataSource.removeAllGroups();
        this._initDataForm();
    };
    RadDataForm.prototype._applyGroupTitleStyle = function (groupView, titleStyle) {
        if (titleStyle.fillColor) {
            groupView.titleView.style.fill = TKSolidFill.solidFillWithColor((new color_1.Color(titleStyle.fillColor)).ios);
        }
        if (titleStyle.strokeColor || titleStyle.strokeWidth) {
            var stroke = TKStroke.new();
            if (titleStyle.strokeWidth) {
                stroke.width = titleStyle.strokeWidth;
            }
            if (titleStyle.strokeColor) {
                stroke.color = (new color_1.Color(titleStyle.strokeColor)).ios;
            }
            groupView.titleView.style.stroke = stroke;
        }
        if (titleStyle.separatorColor) {
            groupView.titleView.style.separatorColor = TKSolidFill.solidFillWithColor((new color_1.Color(titleStyle.separatorColor)).ios);
        }
        if (titleStyle.labelTextColor) {
            groupView.titleView.titleLabel.textColor = (new color_1.Color(titleStyle.labelTextColor)).ios;
        }
        if (titleStyle.labelFontName || titleStyle.labelTextSize || titleStyle.labelFontStyle) {
            groupView.titleView.titleLabel.font = RadDataForm.getFontWithProperties(titleStyle.labelFontName, titleStyle.labelTextSize, titleStyle.labelFontStyle);
        }
    };
    RadDataForm.prototype.onGroupPropertyChanged = function (data) {
        if (!this._ios || !this._initialized) {
            return;
        }
        switch (data.propertyName) {
            case "hidden":
            case "collapsible":
            case "titleStyle":
                this.reload();
                break;
            case "name":
                this._reset();
                break;
        }
    };
    RadDataForm.prototype.onGroupTitleStylePropertyChanged = function (data) {
        if (!this._ios || !this._initialized) {
            return;
        }
        this.reload();
    };
    RadDataForm.prototype.onPropertyPropertyChanged = function (data) {
        if (!this._ios || !this._initialized) {
            return;
        }
        if (!data.object || !data.object.ios) {
            this.reload();
            return;
        }
        var nativeProperty = data.object.ios;
        switch (data.propertyName) {
            case "readOnly":
                this.ios.updateEditorForProperty(nativeProperty);
                break;
            case "hintText":
            case "hidden":
            case "index":
            case "displayName":
            case "valuesProvider":
            case "editor":
                this.reload();
                break;
        }
    };
    RadDataForm.prototype._initDataForm = function () {
        if (!this.source || !this._dataSource) {
            console.log("WARNING: No source defined");
            return;
        }
        //go through all groups / entity properties
        if (this.groups) {
            for (var i = 0; i < this.groups.length; ++i) {
                var propertyNames = NSMutableArray.alloc().initWithCapacity(this.groups[i].properties.length);
                for (var j = 0; j < this.groups[i].properties.length; ++j) {
                    var entityProperty = this.groups[i].properties[j];
                    propertyNames.addObject(entityProperty.name);
                    this._updateNativeProperty(entityProperty);
                }
                this._dataSource.addGroupWithNamePropertyNames(this.groups[i].name, propertyNames);
                ;
            }
        }
        if (this.properties) {
            for (var i = 0; i < this.properties.length; ++i) {
                var entityProperty = this.properties[i];
                this._updateNativeProperty(entityProperty);
            }
        }
        this._ios.dataSource = this._dataSource;
        this._initialized = true;
    };
    RadDataForm.prototype._attachPropertyChangeListener = function (property) {
        var that = new WeakRef(this);
        property.off(observableModule.Observable.propertyChangeEvent);
        property.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {
            that.get().onPropertyPropertyChanged(propertyChangeData);
        });
    };
    RadDataForm.prototype._attachGroupChangeListener = function (group) {
        var that = new WeakRef(this);
        group.off(observableModule.Observable.propertyChangeEvent);
        group.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {
            that.get().onGroupPropertyChanged(propertyChangeData);
        });
        group.titleStyle.off(observableModule.Observable.propertyChangeEvent);
        group.titleStyle.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {
            that.get().onGroupTitleStylePropertyChanged(propertyChangeData);
        });
    };
    RadDataForm.prototype._createPropertyFromNative = function (nativeProperty) {
        var entityProperty = new EntityProperty();
        entityProperty.name = nativeProperty.name;
        entityProperty._linkPropertyWithNative(nativeProperty);
        return entityProperty;
    };
    RadDataForm.prototype._updateNativeProperty = function (entityProperty) {
        var nativeProperty = this._dataSource.propertyWithName(entityProperty.name);
        entityProperty._linkPropertyWithNative(nativeProperty);
    };
    RadDataForm.prototype._onSourcePropertyChanged = function (eventData) {
        if (eventData.newValue) {
            var objJSON = JSON.stringify(eventData.newValue);
            this._dataSource = TKDataFormEntityDataSource.alloc().initWithJSONStringRootItemKeyPath(objJSON, null);
            this._initDataForm();
        }
    };
    RadDataForm.prototype._onIsReadOnlyPropertyChanged = function (data) {
        this._ios.readOnly = data.newValue;
    };
    RadDataForm.prototype._onCommitModePropertyChanged = function (data) {
        if (data.newValue) {
            switch (commonModule.CommitMode[data.newValue]) {
                case commonModule.CommitMode.Immediate:
                    this._ios.commitMode = 0 /* Immediate */; //TKDataFormCommitMode
                    break;
                case commonModule.CommitMode.Manual:
                    this._ios.commitMode = 2 /* Manual */; //TKDataFormCommitMode
                    break;
                case commonModule.CommitMode.OnLostFocus:
                    this._ios.commitMode = 1 /* OnLostFocus */; //TKDataFormCommitMode
                    break;
            }
        }
    };
    RadDataForm.prototype._onValidationModePropertyChanged = function (data) {
        if (data.newValue) {
            switch (commonModule.ValidationMode[data.newValue]) {
                case commonModule.ValidationMode.Immediate:
                    this._ios.validationMode = 0 /* Immediate */; //TKDataFormValidationMode
                    break;
                case commonModule.ValidationMode.Manual:
                    this._ios.validationMode = 2 /* Manual */; //TKDataFormValidationMode
                    break;
                case commonModule.ValidationMode.OnLostFocus:
                    this._ios.validationMode = 1 /* OnLostFocus */; //TKDataFormValidationMode
                    break;
            }
        }
    };
    RadDataForm.prototype._onGroupsPropertyChanged = function (eventData) {
    };
    RadDataForm.prototype.commitAll = function () {
        if (this._ios) {
            this._ios.commit();
        }
    };
    RadDataForm.prototype.reload = function () {
        if (this._ios) {
            this._ios.reloadData();
        }
    };
    ////////////////////////////////////////////////////////////////////////////
    // Helpers
    RadDataForm.getFontWithProperties = function (fontName, size, style) {
        var font = null;
        var fontSize = !isNaN(+size) ? size : 17;
        if (fontName) {
            font = UIFont.fontWithNameSize(fontName, fontSize);
            if (!font) {
                console.log("WARNING: Cannot create font with given name: " + fontSize);
                return;
            }
        }
        if (!font && !isNaN(+size)) {
            font = UIFont.systemFontOfSize(fontSize);
        }
        if (style) {
            var traits = UIFontDescriptorSymbolicTraits.UIFontDescriptorClassUnknown;
            switch (commonModule.FontStyles[style]) {
                case commonModule.FontStyles.Bold:
                    traits = UIFontDescriptorSymbolicTraits.UIFontDescriptorTraitBold;
                    break;
                case commonModule.FontStyles.Italic:
                    traits = UIFontDescriptorSymbolicTraits.UIFontDescriptorTraitItalic;
                    break;
                case commonModule.FontStyles.BoldItalic:
                    traits = UIFontDescriptorSymbolicTraits.UIFontDescriptorTraitBold | UIFontDescriptorSymbolicTraits.UIFontDescriptorTraitItalic;
                    break;
            }
            if (!font) {
                font = UIFont.systemFontOfSize(fontSize);
            }
            var newFont = UIFont.fontWithDescriptorSize(font.fontDescriptor().fontDescriptorWithSymbolicTraits(traits), fontSize);
            if (newFont) {
                font = newFont;
            }
        }
        return font;
    };
    return RadDataForm;
})(commonModule.RadDataForm);
exports.RadDataForm = RadDataForm;
///////////////////////////////////////////////
var PropertyGroup = (function (_super) {
    __extends(PropertyGroup, _super);
    function PropertyGroup() {
        _super.call(this);
    }
    //todo: consider if these properties need handles at all    
    PropertyGroup.prototype.onNameChanged = function (data) {
    };
    PropertyGroup.prototype.onHiddenChanged = function (data) {
    };
    PropertyGroup.prototype.onCollapsibleChanged = function (data) {
    };
    PropertyGroup.prototype.onTitleStyleChanged = function (data) {
    };
    PropertyGroup.prototype.onPropertiesChanged = function (data) {
    };
    return PropertyGroup;
})(commonModule.PropertyGroup);
exports.PropertyGroup = PropertyGroup;
var EntityProperty = (function (_super) {
    __extends(EntityProperty, _super);
    function EntityProperty() {
        _super.call(this);
        this._shouldSkipEditorUpdate = false;
    }
    Object.defineProperty(EntityProperty.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    EntityProperty.prototype._linkPropertyWithNative = function (value) {
        this._ios = value;
        this._onNativeSet();
    };
    EntityProperty.prototype._updateNativeEditor = function (nativeEditor) {
        if (!this.editor) {
            this._createEditorFromNative(nativeEditor);
        }
        else {
            this.editor._linkEditorWithNative(nativeEditor);
        }
    };
    EntityProperty.prototype._createEditorFromNative = function (nativeEditor) {
        var type = PropertyEditor._getNativeEditorType(nativeEditor);
        this._shouldSkipEditorUpdate = true;
        var propertyEditor = new PropertyEditor();
        propertyEditor.type = type;
        propertyEditor._linkEditorWithNative(nativeEditor);
        this.editor = propertyEditor;
        this._shouldSkipEditorUpdate = false;
    };
    EntityProperty.prototype._onNativeSet = function () {
        this.updateNativeEditor(this.editor);
        this.updateNativeValidators(this.validators);
        this.updateNativeValuesProvider(this.valuesProvider);
        this.updateNativeDisplayName(this.displayName);
        this.updateNativeIndex(this.index);
        this.updateNativeHidden(this.hidden);
        this.updateNativeReadOnly(this.readOnly);
        this.updateNativeRequired(this.required);
        this.updateNativeHintText(this.hintText);
    };
    EntityProperty.prototype.onEditorTypeChanged = function () {
        var newEditor = new PropertyEditor();
        newEditor.type = this.editor.type;
        newEditor.style = this.editor.style;
        newEditor.params = this.editor.params;
        this.editor = newEditor;
    };
    EntityProperty.prototype.updateNativeEditor = function (value) {
        if (!this._ios || !value) {
            return;
        }
        if (value.type == commonModule.EditorType.DatePicker) {
            this._ios.converter = new StringToDateConverter().ios;
        }
        else if (value.type == commonModule.EditorType.TimePicker) {
            this._ios.converter = new StringToTimeConverter().ios;
        }
        this._ios.editorClass = value.editorClass;
    };
    EntityProperty.prototype.updateNativeValidators = function (value) {
        if (!this._ios || !value) {
            return;
        }
        var validatorSet = NSMutableArray.new();
        for (var k = 0; k < value.length; k++) {
            var validatorBase = value[k];
            var aValidator = validatorBase.ios;
            validatorSet.addObject(aValidator);
        }
        this._ios.validators = validatorSet;
    };
    EntityProperty.prototype.updateNativeValuesProvider = function (value) {
        if (!this._ios || !value) {
            return;
        }
        if (!(value instanceof Array)) {
            value = value.split(',');
        }
        var nativeSource = NSMutableArray.new();
        for (var i = 0; i < value.length; i++) {
            nativeSource.addObject(value[i]);
        }
        this._ios.valuesProvider = nativeSource;
    };
    EntityProperty.prototype.updateNativeDisplayName = function (value) {
        if (!this._ios || !value) {
            return;
        }
        this._ios.displayName = value;
    };
    EntityProperty.prototype.updateNativeIndex = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.layoutInfo.row = value;
        this._ios.index = value;
    };
    EntityProperty.prototype.updateNativeHidden = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.hidden = value;
    };
    EntityProperty.prototype.updateNativeReadOnly = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.readOnly = value;
    };
    EntityProperty.prototype.updateNativeRequired = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.required = value;
    };
    EntityProperty.prototype.updateNativeHintText = function (value) {
        if (!this._ios || !value) {
            return;
        }
        this._ios.hintText = value;
    };
    return EntityProperty;
})(commonModule.EntityProperty);
exports.EntityProperty = EntityProperty;
//NOTE: currently we don't have specific class for every one of the editors since they don't have specific properties, with small exceptions
var PropertyEditor = (function (_super) {
    __extends(PropertyEditor, _super);
    function PropertyEditor() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PropertyEditor.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditor.prototype, "editorClass", {
        get: function () {
            return this._editorClass;
        },
        enumerable: true,
        configurable: true
    });
    PropertyEditor.prototype.onTypeChanged = function (data) {
        if (data.newValue) {
            switch (commonModule.EditorType[data.newValue]) {
                case commonModule.EditorType.Text:
                    this._editorClass = TKDataFormTextFieldEditor.class();
                    break;
                case commonModule.EditorType.MultilineText:
                    this._editorClass = TKDataFormMultilineTextEditor.class();
                    break;
                case commonModule.EditorType.Email:
                    this._editorClass = TKDataFormEmailEditor.class();
                    break;
                case commonModule.EditorType.Password:
                    this._editorClass = TKDataFormPasswordEditor.class();
                    break;
                case commonModule.EditorType.Phone:
                    this._editorClass = TKDataFormNamePhoneEditor.class();
                    break;
                case commonModule.EditorType.Decimal:
                    this._editorClass = TKDataFormDecimalEditor.class();
                    break;
                case commonModule.EditorType.Number:
                    this._editorClass = TKDataFormNumberEditor.class();
                    break;
                case commonModule.EditorType.Switch:
                    this._editorClass = TKDataFormSwitchEditor.class();
                    break;
                case commonModule.EditorType.Stepper:
                    this._editorClass = TKDataFormStepperEditor.class();
                    break;
                case commonModule.EditorType.Slider:
                    this._editorClass = TKDataFormSliderEditor.class();
                    break;
                case commonModule.EditorType.SegmentedEditor:
                    this._editorClass = TKDataFormSegmentedEditor.class();
                    break;
                case commonModule.EditorType.DatePicker:
                    this._editorClass = TKDataFormDatePickerEditor.class();
                    break;
                case commonModule.EditorType.TimePicker:
                    this._editorClass = TKDataFormTimePickerEditor.class();
                    break;
                case commonModule.EditorType.Picker:
                    this._editorClass = TKDataFormPickerViewEditor.class();
                    break;
                case commonModule.EditorType.List:
                    this._editorClass = TKDataFormOptionsEditor.class();
                    break;
                default:
                    console.log("WARNING:Unsupported editor type: " + data.newValue);
            }
        }
    };
    PropertyEditor._getNativeEditorType = function (nativeEditor) {
        if (nativeEditor instanceof TKDataFormMultilineTextEditor) {
            return commonModule.EditorType.MultilineText;
        }
        if (nativeEditor instanceof TKDataFormEmailEditor) {
            return commonModule.EditorType.Email;
        }
        if (nativeEditor instanceof TKDataFormPasswordEditor) {
            return commonModule.EditorType.Password;
        }
        if (nativeEditor instanceof TKDataFormNamePhoneEditor) {
            return commonModule.EditorType.Phone;
        }
        if (nativeEditor instanceof TKDataFormDecimalEditor) {
            return commonModule.EditorType.Decimal;
        }
        if (nativeEditor instanceof TKDataFormNumberEditor) {
            return commonModule.EditorType.Number;
        }
        if (nativeEditor instanceof TKDataFormSwitchEditor) {
            return commonModule.EditorType.Switch;
        }
        if (nativeEditor instanceof TKDataFormStepperEditor) {
            return commonModule.EditorType.Stepper;
        }
        if (nativeEditor instanceof TKDataFormSliderEditor) {
            return commonModule.EditorType.Slider;
        }
        if (nativeEditor instanceof TKDataFormSegmentedEditor) {
            return commonModule.EditorType.SegmentedEditor;
        }
        if (nativeEditor instanceof TKDataFormDatePickerEditor) {
            return commonModule.EditorType.DatePicker;
        }
        if (nativeEditor instanceof TKDataFormTimePickerEditor) {
            return commonModule.EditorType.TimePicker;
        }
        if (nativeEditor instanceof TKDataFormPickerViewEditor) {
            return commonModule.EditorType.Picker;
        }
        if (nativeEditor instanceof TKDataFormOptionsEditor) {
            return commonModule.EditorType.List;
        }
        return commonModule.EditorType.Text;
    };
    PropertyEditor.prototype.onPropertyStyleChanged = function (propertyName) {
        this.applyStyleForProperty(propertyName);
    };
    PropertyEditor.prototype.onPropertyParamsChanged = function (propertyName) {
        //this.applyStyleForProperty(propertyName);
    };
    PropertyEditor.prototype._updateLabelTextColor = function (labelTextColor) {
        if (!this._ios || !labelTextColor) {
            return;
        }
        this._ios.textLabel.textColor = (new color_1.Color(labelTextColor)).ios;
    };
    PropertyEditor.prototype._updateLabelFont = function (labelFontName, labelTextSize, labelFontStyle) {
        if (!this._ios || (!labelFontName && !labelFontStyle && !labelTextSize)) {
            return;
        }
        this._ios.textLabel.font = RadDataForm.getFontWithProperties(labelFontName, labelTextSize, labelFontStyle);
    };
    PropertyEditor.prototype._updateLabelOffset = function (labelHorizontalOffset, labelVerticalOffset) {
        if (!this._ios || (!labelHorizontalOffset && !labelVerticalOffset)) {
            return;
        }
        this._ios.style.textLabelOffset = {
            horizontal: (isNaN(labelHorizontalOffset)) ? 0 : labelHorizontalOffset,
            vertical: (isNaN(labelVerticalOffset)) ? 0 : labelVerticalOffset
        };
    };
    PropertyEditor.prototype._updateEditorOffset = function (editorHorizontalOffset, editorVerticalOffset) {
        if (!this._ios || (!editorHorizontalOffset && !editorVerticalOffset)) {
            return;
        }
        this._ios.style.editorOffset = {
            horizontal: (isNaN(editorHorizontalOffset)) ? 0 : editorHorizontalOffset,
            vertical: (isNaN(editorVerticalOffset)) ? 0 : editorVerticalOffset
        };
    };
    PropertyEditor.prototype._updateEditorFillColor = function (editorFillColor) {
        if (!this._ios || !editorFillColor) {
            return;
        }
        this._ios.style.fill = TKSolidFill.solidFillWithColor((new color_1.Color(editorFillColor)).ios);
    };
    PropertyEditor.prototype._updateEditorStroke = function (editorStrokeColor, editorStrokeWidth) {
        if (!this._ios || (!editorStrokeColor && !editorStrokeWidth)) {
            return;
        }
        var stroke = TKStroke.new();
        if (editorStrokeWidth) {
            stroke.width = editorStrokeWidth;
        }
        if (editorStrokeColor) {
            stroke.color = (new color_1.Color(editorStrokeColor)).ios;
        }
        this._ios.style.stroke = stroke;
    };
    PropertyEditor.prototype._updateLabelHidden = function (labelHidden) {
        if (!this._ios || labelHidden == null) {
            return;
        }
        this._ios.style.textLabelDisplayMode = labelHidden ? 1 /* Hidden */ : 0 /* Show */;
    };
    PropertyEditor.prototype._updateSeparatorColor = function (separatorColor) {
        if (!this._ios || !separatorColor) {
            return;
        }
        this._ios.style.separatorColor = TKSolidFill.solidFillWithColor((new color_1.Color(separatorColor)).ios);
        this._ios.setNeedsDisplay();
    };
    PropertyEditor.prototype.applyStyle = function () {
        if (!this.style || !this._ios) {
            return;
        }
        this._updateLabelTextColor(this.style.labelTextColor);
        this._updateLabelFont(this.style.labelFontName, this.style.labelTextSize, this.style.labelFontStyle);
        this._updateLabelOffset(this.style.labelHorizontalOffset, this.style.labelVerticalOffset);
        this._updateEditorOffset(this.style.editorHorizontalOffset, this.style.editorVerticalOffset);
        this._updateEditorFillColor(this.style.fillColor);
        this._updateEditorStroke(this.style.strokeColor, this.style.strokeWidth);
        this._updateLabelHidden(this.style.labelHidden);
        this._updateSeparatorColor(this.style.separatorColor);
        this._ios.setNeedsLayout();
        this._ios.setNeedsDisplay();
    };
    PropertyEditor.prototype.applyStyleForProperty = function (propertyName) {
        if (!this.style || !this._ios) {
            return;
        }
        switch (propertyName) {
            case "labelTextColor":
                this._updateLabelTextColor(this.style.labelTextColor);
                break;
            case "labelFontName":
            case "labelFontStyle":
            case "labelTextSize":
                this._updateLabelFont(this.style.labelFontName, this.style.labelTextSize, this.style.labelFontStyle);
                break;
            case "labelHorizontalOffset":
            case "labelVerticalOffset":
                this._updateLabelOffset(this.style.labelHorizontalOffset, this.style.labelVerticalOffset);
                this._ios.setNeedsLayout();
                break;
            case "editorHorizontalOffset":
            case "editorVerticalOffset":
                this._updateEditorOffset(this.style.editorHorizontalOffset, this.style.editorVerticalOffset);
                this._ios.setNeedsLayout();
                break;
            case "fillColor":
                this._updateEditorFillColor(this.style.fillColor);
                this._ios.setNeedsDisplay();
                break;
            case "strokeColor":
            case "strokeWidth":
                this._updateEditorStroke(this.style.strokeColor, this.style.strokeWidth);
                this._ios.setNeedsDisplay();
                break;
            case "labelHidden":
                this._updateLabelHidden(this.style.labelHidden);
                this._ios.setNeedsLayout();
                break;
            case "separatorColor":
                this._updateSeparatorColor(this.style.separatorColor);
                this._ios.setNeedsDisplay();
                break;
        }
    };
    PropertyEditor.prototype._linkEditorWithNative = function (value) {
        if (!this.style) {
            this.style = new commonModule.PropertyEditorStyle();
        }
        if (!this.params) {
            this.params = new commonModule.PropertyEditorParams();
        }
        if (this._ios == value) {
            return;
        }
        this._ios = value;
        this._onNativeSet();
    };
    PropertyEditor.prototype._onNativeSet = function () {
        if (!this.type) {
            this.type = PropertyEditor._getNativeEditorType(this._ios);
        }
    };
    return PropertyEditor;
})(commonModule.PropertyEditor);
exports.PropertyEditor = PropertyEditor;
//////////////////////////////////////////////////////////////////////////////////////////////
// Validators
var MinimumLengthValidator = (function (_super) {
    __extends(MinimumLengthValidator, _super);
    function MinimumLengthValidator() {
        _super.call(this);
        this._ios = TKDataFormMinimumLengthValidator.new();
    }
    Object.defineProperty(MinimumLengthValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    MinimumLengthValidator.prototype.onLengthChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this.ios.minimumLength = data.newValue;
        }
    };
    return MinimumLengthValidator;
})(commonModule.MinimumLengthValidator);
exports.MinimumLengthValidator = MinimumLengthValidator;
var MaximumLengthValidator = (function (_super) {
    __extends(MaximumLengthValidator, _super);
    function MaximumLengthValidator() {
        _super.call(this);
        this._ios = TKDataFormMaximumLengthValidator.new();
    }
    Object.defineProperty(MaximumLengthValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    MaximumLengthValidator.prototype.onLengthChanged = function (data) {
        if (!isNaN(data.newValue)) {
            this.ios.maximumLegth = data.newValue;
        }
    };
    return MaximumLengthValidator;
})(commonModule.MaximumLengthValidator);
exports.MaximumLengthValidator = MaximumLengthValidator;
var EmailValidator = (function (_super) {
    __extends(EmailValidator, _super);
    function EmailValidator() {
        _super.call(this);
        this._ios = TKDataFormEmailValidator.new();
    }
    Object.defineProperty(EmailValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return EmailValidator;
})(commonModule.EmailValidator);
exports.EmailValidator = EmailValidator;
var NonEmptyValidator = (function (_super) {
    __extends(NonEmptyValidator, _super);
    function NonEmptyValidator() {
        _super.call(this);
        this._ios = TKDataFormNonEmptyValidator.new();
    }
    Object.defineProperty(NonEmptyValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return NonEmptyValidator;
})(commonModule.NonEmptyValidator);
exports.NonEmptyValidator = NonEmptyValidator;
var RangeValidator = (function (_super) {
    __extends(RangeValidator, _super);
    function RangeValidator() {
        _super.call(this);
        this._ios = TKDataFormRangeValidator.new();
    }
    Object.defineProperty(RangeValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RangeValidator.prototype.onMinimumChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            if (this.ios.range) {
                this.ios.range.minimum = data.newValue;
            }
            else {
                this.ios.range = TKRange.rangeWithMinimumAndMaximum(data.newValue, data.newValue * 2);
            }
        }
    };
    RangeValidator.prototype.onMaximumChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            if (this.ios.range) {
                this.ios.range.maximum = data.newValue;
            }
            else {
                this.ios.range = TKRange.rangeWithMinimumAndMaximum(data.newValue / 2, data.newValue);
            }
        }
    };
    return RangeValidator;
})(commonModule.RangeValidator);
exports.RangeValidator = RangeValidator;
var PhoneValidator = (function (_super) {
    __extends(PhoneValidator, _super);
    function PhoneValidator() {
        _super.call(this);
        this._ios = TKDataFormPhoneValidator.new();
    }
    Object.defineProperty(PhoneValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return PhoneValidator;
})(commonModule.PhoneValidator);
exports.PhoneValidator = PhoneValidator;
//////////////////////////////////////////////////////////////////////////////////////////////
// Converters
var PropertyConverter = (function (_super) {
    __extends(PropertyConverter, _super);
    function PropertyConverter() {
        _super.apply(this, arguments);
    }
    return PropertyConverter;
})(commonModule.PropertyConverter);
exports.PropertyConverter = PropertyConverter;
var StringToDateConverter = (function (_super) {
    __extends(StringToDateConverter, _super);
    function StringToDateConverter() {
        _super.call(this);
        this._ios = TKDataFormStringToDateConverter.new();
    }
    Object.defineProperty(StringToDateConverter.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return StringToDateConverter;
})(commonModule.StringToDateConverter);
exports.StringToDateConverter = StringToDateConverter;
var StringToTimeConverter = (function (_super) {
    __extends(StringToTimeConverter, _super);
    function StringToTimeConverter() {
        _super.call(this);
        this._ios = TKDataFormStringToTimeConverter.new();
    }
    Object.defineProperty(StringToTimeConverter.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return StringToTimeConverter;
})(commonModule.StringToTimeConverter);
exports.StringToTimeConverter = StringToTimeConverter;
