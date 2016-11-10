var commonModule = require("./dataform-common");
var color_1 = require("color");
var utilsModule = require("utils/utils");
var observableModule = require("data/observable");
require("utils/module-merge").merge(commonModule, exports);
var RadDataForm = (function (_super) {
    __extends(RadDataForm, _super);
    function RadDataForm() {
        _super.call(this);
        this._loaded = false;
    }
    RadDataForm.prototype._createUI = function () {
        if (!this._android) {
            this._android = new com.telerik.widget.dataform.visualization.RadDataForm(this._context);
            this._layoutManager = new com.telerik.widget.dataform.visualization.DataFormGroupLayoutManager(this._context);
            this._android.setLayoutManager(this._layoutManager);
        }
        this._setupGroups();
        this._updateEditorStyles();
        this._updateGroupStyles();
        this._updateSource();
        this._addCommitListener();
        this._loaded = true;
    };
    RadDataForm.prototype._setupGroups = function () {
        var that = new WeakRef(this);
        this._layoutManager.setCreateGroup(new com.telerik.android.common.Function2({
            apply: function (context, name) {
                if (that.get().groups) {
                    for (var i = 0; i < that.get().groups.length; i++) {
                        var propertyGroup = that.get().groups[i];
                        if (propertyGroup.name === name) {
                            var group_1 = void 0;
                            if (propertyGroup.collapsible) {
                                group_1 = new com.telerik.widget.dataform.visualization.ExpandableEditorGroup(context, name);
                                that.get()._addIsExpandedChangedListener(group_1);
                            }
                            else {
                                group_1 = new com.telerik.widget.dataform.visualization.EditorGroup(context, name);
                            }
                            if (propertyGroup.hidden) {
                                group_1.rootLayout().setVisibility(android.view.View.GONE);
                            }
                            if (!propertyGroup.titleStyle) {
                                propertyGroup.titleStyle = new commonModule.GroupTitleStyle();
                            }
                            that.get()._attachGroupChangeListener(propertyGroup);
                            return group_1;
                        }
                    }
                }
                var group = new com.telerik.widget.dataform.visualization.EditorGroup(context, name);
                if (group.getHeaderView()) {
                    group.getHeaderView().setVisibility(android.view.View.GONE);
                }
                return group;
            }
        }));
        this.android.arrangeEditors();
    };
    RadDataForm.prototype._updateSource = function () {
        if (!this._android || !this.source) {
            return;
        }
        this._android.setReloadSuspended(true);
        var objJSON = JSON.stringify(this.source);
        var jsonObject = new org.json.JSONObject(objJSON);
        this._android.setEntity(jsonObject);
        this._syncPropertiesWithNativeProperties();
        this._updateNativeGroups();
        this._android.setReloadSuspended(false);
        this.reload();
    };
    RadDataForm.prototype._syncPropertiesWithNativeProperties = function () {
        var nativeEntity = this._android.getEntity();
        var nativeProperties = nativeEntity.properties();
        var length = nativeProperties.size();
        for (var i = 0; i < length; i++) {
            var nativeProperty = nativeProperties.get(i);
            var property = this.getPropertyByName(nativeProperty.name());
            if (property == null) {
                var property = this._createPropertyFromNative(nativeProperty);
                if (!this.properties) {
                    this.properties = new Array();
                }
                this.properties.push(property);
            }
            else {
                property._linkPropertyWithNative(nativeProperty);
            }
            this._attachEntityPropertyPropertyChangeListener(property);
        }
    };
    RadDataForm.prototype._updateNativeGroups = function () {
        if (!this.source) {
            console.log("WARNING: No source defined");
            return;
        }
        //go through all groups / entity properties
        if (this.groups) {
            for (var i = 0; i < this.groups.length; i++) {
                for (var j = 0; j < this.groups[i].properties.length; j++) {
                    var entityProperty = this.groups[i].properties[j];
                    if (entityProperty.android) {
                        entityProperty.android.setGroupName(this.groups[i].name);
                    }
                }
            }
        }
    };
    RadDataForm.prototype._updateEditorStyles = function () {
        var that = new WeakRef(this);
        this._android.setEditorCustomizations(new com.telerik.android.common.Procedure({
            apply: function (editor) {
                var property = that.get().getPropertyByName(editor.property().name());
                if (property.editor) {
                    property.editor.applyStyle();
                }
                var args = {
                    eventName: commonModule.RadDataForm.editorUpdateEvent,
                    object: that.get(),
                    editor: editor,
                    entityProperty: property.android,
                    propertyName: property.name,
                    returnValue: true
                };
                that.get().notify(args);
            }
        }));
    };
    RadDataForm.prototype._updateGroupStyles = function () {
        var that = new WeakRef(this);
        this._layoutManager.setEditorGroupCustomizations(new com.telerik.android.common.Procedure({
            apply: function (editorGroup) {
                var group = that.get().getGroupByName(editorGroup.name());
                if (group == null || group.titleStyle == null) {
                    return;
                }
                that.get()._applyGroupTitleStyle(editorGroup, group.titleStyle);
                //throw event for additional customizations
                var groupName = editorGroup.name();
                var args = {
                    eventName: commonModule.RadDataForm.groupUpdateEvent,
                    object: this._owner,
                    group: editorGroup,
                    groupName: groupName,
                    returnValue: true
                };
                that.get().notify(args);
            }
        }));
    };
    RadDataForm.prototype._attachEntityPropertyPropertyChangeListener = function (property) {
        var that = new WeakRef(this);
        property.off(observableModule.Observable.propertyChangeEvent);
        property.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {
            if (!property._shouldSkipEditorUpdate || propertyChangeData.propertyName != "editor") {
                that.get()._onEntityPropertyPropertyChanged(propertyChangeData);
            }
        });
    };
    RadDataForm.prototype._attachGroupChangeListener = function (group) {
        var that = new WeakRef(this);
        group.off(observableModule.Observable.propertyChangeEvent);
        group.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {
            that.get()._onGroupPropertyChanged(propertyChangeData);
        });
        group.titleStyle.off(observableModule.Observable.propertyChangeEvent);
        group.titleStyle.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {
            that.get()._onGroupTitleStylePropertyChanged(propertyChangeData);
        });
    };
    RadDataForm.prototype._createPropertyFromNative = function (nativeProperty) {
        var entityProperty = new EntityProperty();
        entityProperty.name = nativeProperty.name();
        entityProperty._linkPropertyWithNative(nativeProperty);
        return entityProperty;
    };
    RadDataForm.prototype._addCommitListener = function () {
        var that = new WeakRef(this);
        this._android.addCommitListener(new com.telerik.widget.dataform.engine.EntityPropertyCommitListener({
            onBeforeCommit: function (property) {
                var args = {
                    eventName: commonModule.RadDataForm.propertyCommitEvent,
                    object: that.get(),
                    entityProperty: property,
                    propertyName: property.name(),
                    returnValue: true
                };
                that.get().notify(args);
                return !args.returnValue;
            },
            onAfterCommit: function (property) {
                if (that.get().source.hasOwnProperty(property.name())) {
                    that.get().source[property.name()] = property.getValue();
                    var args = {
                        eventName: commonModule.RadDataForm.propertyCommittedEvent,
                        object: that.get(),
                        entityProperty: property,
                        propertyName: property.name(),
                        returnValue: true
                    };
                    that.get().notify(args);
                }
            }
        }));
    };
    RadDataForm.prototype._addIsExpandedChangedListener = function (group) {
        var that = new WeakRef(this);
        group.addIsExpandedChangedListener(new com.telerik.widget.dataform.visualization.ExpandableEditorGroup.IsExpandedChangedListener({
            onChanged: function (isExpanded) {
                var name = isExpanded ?
                    commonModule.RadDataForm.groupExpandedEvent :
                    commonModule.RadDataForm.groupCollapsedEvent;
                var args = {
                    eventName: name,
                    object: that.get(),
                    group: group,
                    groupName: group.name(),
                    returnValue: true
                };
                that.get().notify(args);
            }
        }));
    };
    RadDataForm.prototype._onGroupPropertyChanged = function (data) {
        if (!this._android || !this._loaded) {
            return;
        }
        switch (data.propertyName) {
            case "hidden":
            case "collapsible":
                this._android.arrangeEditors();
                break;
            case "titleStyle":
                this._layoutManager.applyEditorGroupCustomizations();
                break;
            case "name":
                var group = data.object;
                for (var i = 0; i < group.properties.length; i++) {
                    var property = group.properties[i];
                    if (property.android) {
                        property.android.setGroupName(group.name);
                    }
                }
                this.reload();
                break;
        }
    };
    RadDataForm.prototype._onGroupTitleStylePropertyChanged = function (data) {
        if (!this._android || !this._loaded) {
            return;
        }
        this._layoutManager.applyEditorGroupCustomizations();
    };
    RadDataForm.prototype._applyGroupTitleStyle = function (nativeGroup, titleStyle) {
        if (titleStyle.fillColor) {
            nativeGroup.getHeaderContainer().setBackgroundColor(RadDataForm._makeAndroidColor(titleStyle.fillColor));
        }
        if (titleStyle.strokeColor || titleStyle.strokeWidth) {
            var drawable = new android.graphics.drawable.GradientDrawable();
            var strokeWidthDips = titleStyle.strokeWidth ? titleStyle.strokeWidth : 2;
            var strokeWidth = strokeWidthDips * utilsModule.layout.getDisplayDensity();
            var strokeColor = titleStyle.strokeColor ?
                RadDataForm._makeAndroidColor(titleStyle.strokeColor) :
                android.graphics.Color.BLACK;
            var fillColor = titleStyle.fillColor ?
                RadDataForm._makeAndroidColor(titleStyle.fillColor) :
                android.graphics.Color.TRANSPARENT;
            drawable.setStroke(strokeWidth, strokeColor);
            drawable.setColor(fillColor);
            nativeGroup.getHeaderContainer().setBackgroundDrawable(drawable);
        }
        if (titleStyle.labelTextColor) {
            nativeGroup.getHeaderView().setTextColor(RadDataForm._makeAndroidColor(titleStyle.labelTextColor));
        }
        if (titleStyle.labelFontName || titleStyle.labelFontStyle) {
            var editorTypeface = RadDataForm._makeTypeface(titleStyle.labelFontName, titleStyle.labelFontStyle);
            nativeGroup.getHeaderView().setTypeface(editorTypeface);
        }
        if (titleStyle.labelTextSize) {
            nativeGroup.getHeaderView().setTextSize(titleStyle.labelTextSize);
        }
    };
    Object.defineProperty(RadDataForm.prototype, "editedObject", {
        get: function () {
            return this._android.getEditedObject().toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadDataForm.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RadDataForm.prototype._onIsReadOnlyPropertyChanged = function (data) {
        this._updateIsReadOnly();
    };
    RadDataForm.prototype._onCommitModePropertyChanged = function (data) {
        this._updateCommitMode();
    };
    RadDataForm.prototype._onValidationModePropertyChanged = function (data) {
        this._updateValidationMode();
    };
    RadDataForm.prototype._updateIsReadOnly = function () {
        if (!this._android) {
            return;
        }
        this._android.setIsReadOnly(this.isReadOnly);
    };
    RadDataForm.prototype._updateCommitMode = function () {
        if (!this._android) {
            return;
        }
        switch (this.commitMode) {
            case commonModule.CommitMode.Immediate:
                this._android.setCommitMode(com.telerik.widget.dataform.visualization.core.CommitMode.IMMEDIATE);
                break;
            case commonModule.CommitMode.Manual:
                this._android.setCommitMode(com.telerik.widget.dataform.visualization.core.CommitMode.MANUAL);
                break;
            case commonModule.CommitMode.OnLostFocus:
                this._android.setCommitMode(com.telerik.widget.dataform.visualization.core.CommitMode.ON_LOST_FOCUS);
                break;
        }
    };
    RadDataForm.prototype._updateValidationMode = function () {
        if (!this._android) {
            return;
        }
        switch (this.validationMode) {
            case commonModule.ValidationMode.Immediate:
                this._android.setValidationMode(com.telerik.widget.dataform.visualization.core.ValidationMode.IMMEDIATE);
                break;
            case commonModule.ValidationMode.Manual:
                this._android.setValidationMode(com.telerik.widget.dataform.visualization.core.ValidationMode.MANUAL);
                break;
            case commonModule.ValidationMode.OnLostFocus:
                this._android.setValidationMode(com.telerik.widget.dataform.visualization.core.ValidationMode.ON_LOST_FOCUS);
                break;
        }
    };
    RadDataForm.prototype.reload = function () {
        if (this._android) {
            this._android.reload();
            if (!this._android.isReloadSuspended()) {
                this._syncEditorsWithNativeEditors();
            }
        }
    };
    RadDataForm.prototype.commitAll = function () {
        if (this._android) {
            this._android.commitChanges();
        }
    };
    RadDataForm.prototype._onSourcePropertyChanged = function (eventData) {
        this._updateSource();
    };
    RadDataForm.prototype._updateNativeEditor = function (entityProperty) {
        var nativeEditor = this._android.getExistingEditorForProperty(entityProperty.name);
        if (nativeEditor == null) {
            return;
        }
        if (!entityProperty.editor) {
            entityProperty._createEditorFromNative(nativeEditor);
        }
        else {
            entityProperty.editor._linkEditorWithNative(nativeEditor);
        }
    };
    RadDataForm.prototype._onEntityPropertyPropertyChanged = function (data) {
        if (!this._android || !this._loaded) {
            return;
        }
        switch (data.propertyName) {
            case "index":
            case "hidden":
            case "editor":
                this.reload();
                break;
        }
    };
    RadDataForm.prototype._syncEditorsWithNativeEditors = function () {
        if (!this.source) {
            console.log("WARNING: No source defined");
            return;
        }
        if (this.groups) {
            for (var i = 0; i < this.groups.length; i++) {
                for (var j = 0; j < this.groups[i].properties.length; j++) {
                    var entityProperty = this.groups[i].properties[j];
                    this._updateNativeEditor(entityProperty);
                }
            }
        }
        if (this.properties) {
            for (var i = 0; i < this.properties.length; i++) {
                var entityProperty = this.properties[i];
                this._updateNativeEditor(entityProperty);
            }
        }
    };
    RadDataForm._makeAndroidColor = function (colorValue) {
        var nsColor = new color_1.Color(colorValue);
        return nsColor.android;
    };
    RadDataForm._makeTypeface = function (fontName, style) {
        var fontStyle = android.graphics.Typeface.NORMAL;
        if (style) {
            switch (commonModule.FontStyles[style]) {
                case commonModule.FontStyles.Bold:
                    fontStyle = android.graphics.Typeface.BOLD;
                    break;
                case commonModule.FontStyles.Italic:
                    fontStyle = android.graphics.Typeface.ITALIC;
                    break;
                case commonModule.FontStyles.BoldItalic:
                    fontStyle = android.graphics.Typeface.BOLD_ITALIC;
                    break;
            }
        }
        return android.graphics.Typeface.create(fontName, fontStyle);
    };
    return RadDataForm;
})(commonModule.RadDataForm);
exports.RadDataForm = RadDataForm;
var EntityProperty = (function (_super) {
    __extends(EntityProperty, _super);
    function EntityProperty() {
        _super.call(this);
        this._shouldSkipEditorUpdate = false;
    }
    Object.defineProperty(EntityProperty.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    EntityProperty.prototype._linkPropertyWithNative = function (value) {
        this._android = value;
        this._onNativeSet();
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
    EntityProperty.prototype.onEditorChanged = function (data) {
        if (data.newValue instanceof PropertyEditor) {
            if (data.oldValue) {
                data.oldValue.off(observableModule.Observable.propertyChangeEvent);
            }
            var that = new WeakRef(this);
            data.newValue.on(observableModule.Observable.propertyChangeEvent, function (propertyChangeData) {
                if (propertyChangeData.propertyName === "type") {
                    that.get()._onEditorTypeChanged(propertyChangeData);
                }
            });
            if (!this._shouldSkipEditorUpdate) {
                this.updateNativeEditor(data.newValue);
            }
        }
    };
    EntityProperty.prototype._onEditorTypeChanged = function (data) {
        var newEditor = new PropertyEditor();
        newEditor.type = this.editor.type;
        newEditor.style = this.editor.style;
        newEditor.params = this.editor.params;
        this.editor = newEditor;
    };
    EntityProperty.prototype._onNativeSet = function () {
        if (!this._android) {
            return;
        }
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
    EntityProperty.prototype.updateNativeEditor = function (value) {
        if (!this._android || !value) {
            return;
        }
        if (value.type == commonModule.EditorType.DatePicker) {
            this.android.setConverter(new StringToDateConverter().android);
        }
        else if (value.type == commonModule.EditorType.TimePicker) {
            this.android.setConverter(new StringToTimeConverter().android);
        }
        this._android.setEditorType(value.editorClass);
        this._android.setEditorParams(value.editorParams);
    };
    EntityProperty.prototype.updateNativeValidators = function (value) {
        if (!this._android || !value) {
            return;
        }
        var validatorSet = new com.telerik.widget.dataform.engine.PropertyValidatorSet();
        for (var k = 0; k < value.length; k++) {
            var validatorBase = value[k];
            var aValidator = validatorBase.android;
            validatorSet.add(aValidator);
        }
        this._android.setValidator(validatorSet);
    };
    EntityProperty.prototype.updateNativeValuesProvider = function (value) {
        if (!this._android || !value) {
            return;
        }
        if (!(value instanceof Array)) {
            value = value.split(',');
        }
        var nativeSource = new java.util.ArrayList();
        for (var i = 0; i < value.length; i++) {
            nativeSource.add(value[i].trim());
        }
        var nativeList = nativeSource.toArray();
        this._android.updateValues(nativeList);
        if (this.editor && this.editor.android) {
            this.editor.android.notifyEntityPropertyChanged();
        }
    };
    EntityProperty.prototype.updateNativeDisplayName = function (value) {
        if (!this._android || !value) {
            return;
        }
        this._android.setHeader(value);
        if (this.editor && this.editor.android) {
            this.editor.android.notifyEntityPropertyChanged();
        }
    };
    EntityProperty.prototype.updateNativeIndex = function (value) {
        if (!this._android || value == null) {
            return;
        }
        this._android.setPosition(value);
    };
    EntityProperty.prototype.updateNativeHidden = function (value) {
        if (!this._android || value == null) {
            return;
        }
        this._android.setSkip(value);
    };
    EntityProperty.prototype.updateNativeReadOnly = function (value) {
        if (!this._android || value == null) {
            return;
        }
        if (this.editor && this.editor.android) {
            this.editor.android.getEditorView().setEnabled(!value);
        }
    };
    EntityProperty.prototype.updateNativeRequired = function (value) {
        if (!this._android || value == null) {
            return;
        }
        this._android.setRequired(value);
    };
    EntityProperty.prototype.updateNativeHintText = function (value) {
        if (!this._android || !value) {
            return;
        }
        this._android.setHintText(value);
        if (this.editor && this.editor.android) {
            this.editor.android.notifyEntityPropertyChanged();
        }
    };
    return EntityProperty;
})(commonModule.EntityProperty);
exports.EntityProperty = EntityProperty;
var PropertyEditor = (function (_super) {
    __extends(PropertyEditor, _super);
    function PropertyEditor() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PropertyEditor.prototype, "android", {
        get: function () {
            return this._android;
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
    Object.defineProperty(PropertyEditor.prototype, "editorParams", {
        get: function () {
            return this._editorParams;
        },
        enumerable: true,
        configurable: true
    });
    PropertyEditor.prototype._linkEditorWithNative = function (value) {
        this._android = value;
        if (!this.style) {
            this.style = new commonModule.PropertyEditorStyle();
        }
        if (!this.params) {
            this.params = new commonModule.PropertyEditorParams();
        }
        this._onNativeSet();
    };
    PropertyEditor._getNativeEditorType = function (nativeEditor) {
        var nativeEditorClass = nativeEditor.getClass();
        if (nativeEditorClass == com.telerik.widget.dataform.visualization.editors.DataFormMultilineTextEditor.class) {
            return commonModule.EditorType.MultilineText;
        }
        if (nativeEditorClass == com.telerik.widget.dataform.visualization.editors.DataFormEmailEditor.class) {
            return commonModule.EditorType.Email;
        }
        if (nativeEditorClass == com.telerik.widget.dataform.visualization.editors.DataFormPasswordEditor.class) {
            return commonModule.EditorType.Password;
        }
        if (nativeEditorClass == com.telerik.widget.dataform.visualization.editors.DataFormPhoneEditor.class) {
            return commonModule.EditorType.Phone;
        }
        if (nativeEditorClass == com.telerik.widget.dataform.visualization.editors.DataFormDecimalEditor.class) {
            return commonModule.EditorType.Decimal;
        }
        if (nativeEditorClass == com.telerik.widget.dataform.visualization.editors.DataFormIntegerEditor.class) {
            return commonModule.EditorType.Number;
        }
        if (nativeEditorClass == com.telerik.widget.dataform.visualization.editors.DataFormSwitchEditor.class) {
            return commonModule.EditorType.Switch;
        }
        if (nativeEditorClass == com.telerik.widget.dataform.visualization.editors.DataFormNumberPickerEditor.class) {
            return commonModule.EditorType.Stepper;
        }
        if (nativeEditorClass == com.telerik.widget.dataform.visualization.editors.DataFormNumberPickerEditor.class) {
            return commonModule.EditorType.Slider;
        }
        if (nativeEditorClass == com.telerik.widget.dataform.visualization.editors.DataFormNumberPickerEditor.class) {
            return commonModule.EditorType.SegmentedEditor;
        }
        if (nativeEditorClass == com.telerik.widget.dataform.visualization.editors.DataFormDateEditor.class) {
            return commonModule.EditorType.DatePicker;
        }
        if (nativeEditorClass == com.telerik.widget.dataform.visualization.editors.DataFormTimeEditor.class) {
            return commonModule.EditorType.TimePicker;
        }
        if (nativeEditorClass == com.telerik.widget.dataform.visualization.editors.DataFormSpinnerEditor.class) {
            return commonModule.EditorType.Picker;
        }
        if (nativeEditorClass == com.telerik.widget.dataform.visualization.editors.DataFormListViewEditor.class) {
            return commonModule.EditorType.List;
        }
        return commonModule.EditorType.Text;
    };
    PropertyEditor.prototype._onNativeSet = function () {
        if (!this._android) {
            return;
        }
        if (!this.type) {
            this.type = PropertyEditor._getNativeEditorType(this._android);
        }
        this.applyStyle();
        this.applyParams();
        this._android.notifyEntityPropertyChanged();
    };
    PropertyEditor.prototype.onParamsChanged = function (data) {
        if (data.newValue) {
            this.applyParams();
            if (this._android) {
                this.android.applyParams(this.editorParams);
            }
        }
    };
    PropertyEditor.prototype.onPropertyStyleChanged = function (propertyName) {
        this.applyStyleForProperty(propertyName);
    };
    PropertyEditor.prototype.onPropertyParamsChanged = function (propertyName) {
        this.applyParams();
        if (this._android) {
            this.android.applyParams(this.editorParams);
        }
    };
    PropertyEditor.prototype.onStyleChanged = function (data) {
        this.applyStyle();
    };
    PropertyEditor.prototype.onTypeChanged = function (data) {
        if (data.newValue) {
            this._updateEditorClass();
        }
    };
    PropertyEditor.prototype._updateEditorClass = function () {
        if (this.type == null) {
            return;
        }
        switch (commonModule.EditorType[this.type]) {
            case commonModule.EditorType.Text:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormTextEditor.class;
                break;
            case commonModule.EditorType.MultilineText:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormMultilineTextEditor.class;
                break;
            case commonModule.EditorType.Email:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormEmailEditor.class;
                break;
            case commonModule.EditorType.Password:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormPasswordEditor.class;
                break;
            case commonModule.EditorType.Phone:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormPhoneEditor.class;
                break;
            case commonModule.EditorType.Decimal:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormDecimalEditor.class;
                break;
            case commonModule.EditorType.Number:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormIntegerEditor.class;
                break;
            case commonModule.EditorType.Switch:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormSwitchEditor.class;
                break;
            case commonModule.EditorType.Stepper:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormNumberPickerEditor.class;
                break;
            case commonModule.EditorType.Slider:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormSeekBarEditor.class;
                break;
            case commonModule.EditorType.SegmentedEditor:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormSegmentedEditor.class;
                break;
            case commonModule.EditorType.DatePicker:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormDateEditor.class;
                break;
            case commonModule.EditorType.TimePicker:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormTimeEditor.class;
                break;
            case commonModule.EditorType.Picker:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormSpinnerEditor.class;
                break;
            case commonModule.EditorType.List:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormListViewEditor.class;
                break;
            default:
                console.log("WARNING:Unsupported editor type: " + this.type);
        }
    };
    PropertyEditor.prototype._updateLabelTextColor = function (labelTextColor) {
        if (!this._android || !labelTextColor) {
            return;
        }
        var nsColor = RadDataForm._makeAndroidColor(labelTextColor);
        this._android.getHeaderView().setTextColor(nsColor);
    };
    PropertyEditor.prototype._updateLabelFont = function (labelFontName, labelFontStyle) {
        if (!this._android || (!labelFontName && !labelFontStyle)) {
            return;
        }
        var editorTypeface = RadDataForm._makeTypeface(labelFontName, labelFontStyle);
        this._android.getHeaderView().setTypeface(editorTypeface);
    };
    PropertyEditor.prototype._updateLabelTextSize = function (labelTextSize) {
        if (!this._android || !labelTextSize) {
            return;
        }
        this._android.getHeaderView().setTextSize(labelTextSize);
    };
    PropertyEditor.prototype._updateLabelHorizontalOffset = function (labelHorizontalOffset) {
        if (!this._android || !labelHorizontalOffset) {
            return;
        }
        this._android.getHeaderView().setTranslationX(labelHorizontalOffset);
    };
    PropertyEditor.prototype._updateLabelVerticalOffset = function (labelVerticalOffset) {
        if (!this._android || !labelVerticalOffset) {
            return;
        }
        this._android.getHeaderView().setTranslationY(labelVerticalOffset);
    };
    PropertyEditor.prototype._updateEditorHorizontalOffset = function (editorHorizontalOffset) {
        if (!this._android || !editorHorizontalOffset) {
            return;
        }
        this._android.getEditorView().setTranslationX(editorHorizontalOffset);
    };
    PropertyEditor.prototype._updateEditorVerticalOffset = function (editorVerticalOffset) {
        if (!this._android || !editorVerticalOffset) {
            return;
        }
        this._android.getEditorView().setTranslationY(editorVerticalOffset);
    };
    PropertyEditor.prototype._updateEditorFillColor = function (editorFillColor) {
        if (!this._android || !editorFillColor) {
            return;
        }
        var nsColor = RadDataForm._makeAndroidColor(editorFillColor);
        this._android.rootLayout.setBackgroundColor(nsColor);
    };
    PropertyEditor.prototype._updateEditorStroke = function (editorStrokeColor, editorStrokeWidth, editorFillColor) {
        if (!this._android || (!editorStrokeColor && !editorStrokeWidth)) {
            return;
        }
        var drawable = new android.graphics.drawable.GradientDrawable();
        var strokeWidthDips = editorStrokeWidth ? editorStrokeWidth : 2;
        var strokeWidth = strokeWidthDips * utilsModule.layout.getDisplayDensity();
        var strokeColor = editorStrokeColor ?
            RadDataForm._makeAndroidColor(editorStrokeColor) :
            android.graphics.Color.BLACK;
        var fillColor = editorFillColor ?
            RadDataForm._makeAndroidColor(editorFillColor) :
            android.graphics.Color.TRANSPARENT;
        drawable.setStroke(strokeWidth, strokeColor);
        drawable.setColor(fillColor);
        this._android.rootLayout.setBackgroundDrawable(drawable);
    };
    PropertyEditor.prototype._updateLabelHidden = function (labelHidden) {
        if (!this._android || labelHidden == null) {
            return;
        }
        var visibility = labelHidden ? android.view.View.GONE : android.view.View.VISIBLE;
        this._android.getHeaderView().setVisibility(visibility);
    };
    PropertyEditor.prototype.applyParams = function () {
        var editorParams = this.params;
        this._editorParams = new java.util.HashMap();
        if (editorParams.minimum) {
            var min = new java.lang.Float(editorParams.minimum);
            this._editorParams.put("minimum", min);
        }
        if (editorParams.maximum) {
            var max = new java.lang.Float(editorParams.maximum);
            this._editorParams.put("maximum", max);
        }
        if (editorParams.step) {
            var step = new java.lang.Float(editorParams.step);
            this._editorParams.put("step", step);
        }
    };
    PropertyEditor.prototype.applyStyle = function () {
        if (!this.style) {
            return;
        }
        this._updateLabelTextColor(this.style.labelTextColor);
        this._updateLabelFont(this.style.labelFontName, this.style.labelFontStyle);
        this._updateLabelTextSize(this.style.labelTextSize);
        this._updateLabelHorizontalOffset(this.style.labelHorizontalOffset);
        this._updateLabelVerticalOffset(this.style.labelVerticalOffset);
        this._updateEditorHorizontalOffset(this.style.editorHorizontalOffset);
        this._updateEditorVerticalOffset(this.style.editorVerticalOffset);
        this._updateEditorFillColor(this.style.fillColor);
        this._updateEditorStroke(this.style.strokeColor, this.style.strokeWidth, this.style.fillColor);
        this._updateLabelHidden(this.style.labelHidden);
    };
    PropertyEditor.prototype.applyStyleForProperty = function (propertyName) {
        if (!this.style) {
            return;
        }
        switch (propertyName) {
            case "labelTextColor":
                this._updateLabelTextColor(this.style.labelTextColor);
                break;
            case "labelFontName":
            case "labelFontStyle":
                this._updateLabelFont(this.style.labelFontName, this.style.labelFontStyle);
                break;
            case "labelTextSize":
                this._updateLabelTextSize(this.style.labelTextSize);
                break;
            case "labelHorizontalOffset":
                this._updateLabelHorizontalOffset(this.style.labelHorizontalOffset);
                break;
            case "labelVerticalOffset":
                this._updateLabelVerticalOffset(this.style.labelVerticalOffset);
                break;
            case "editorHorizontalOffset":
                this._updateEditorHorizontalOffset(this.style.editorHorizontalOffset);
                break;
            case "editorVerticalOffset":
                this._updateEditorVerticalOffset(this.style.editorVerticalOffset);
                break;
            case "fillColor":
                this._updateEditorFillColor(this.style.fillColor);
                this._updateEditorStroke(this.style.strokeColor, this.style.strokeWidth, this.style.fillColor);
                break;
            case "strokeColor":
            case "strokeWidth":
                this._updateEditorStroke(this.style.strokeColor, this.style.strokeWidth, this.style.fillColor);
                break;
            case "labelHidden":
                this._updateLabelHidden(this.style.labelHidden);
                break;
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
        this._android = new com.telerik.widget.dataform.engine.MinimumLengthValidator();
    }
    Object.defineProperty(MinimumLengthValidator.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    MinimumLengthValidator.prototype.onLengthChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this.android.setMinimumLength(data.newValue);
        }
    };
    return MinimumLengthValidator;
})(commonModule.MinimumLengthValidator);
exports.MinimumLengthValidator = MinimumLengthValidator;
var MaximumLengthValidator = (function (_super) {
    __extends(MaximumLengthValidator, _super);
    function MaximumLengthValidator() {
        _super.call(this);
        this._android = new com.telerik.widget.dataform.engine.MaximumLengthValidator();
    }
    Object.defineProperty(MaximumLengthValidator.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    MaximumLengthValidator.prototype.onLengthChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this.android.setMaximumLength(data.newValue);
        }
    };
    return MaximumLengthValidator;
})(commonModule.MaximumLengthValidator);
exports.MaximumLengthValidator = MaximumLengthValidator;
var EmailValidator = (function (_super) {
    __extends(EmailValidator, _super);
    function EmailValidator() {
        _super.call(this);
        this._android = new com.telerik.widget.dataform.engine.MailValidator();
    }
    Object.defineProperty(EmailValidator.prototype, "android", {
        get: function () {
            return this._android;
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
        this._android = new com.telerik.widget.dataform.engine.NonEmptyValidator();
    }
    Object.defineProperty(NonEmptyValidator.prototype, "android", {
        get: function () {
            return this._android;
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
        this._android = new com.telerik.widget.dataform.engine.RangeValidator();
    }
    Object.defineProperty(RangeValidator.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RangeValidator.prototype.onMinimumChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this._android.setMin(data.newValue);
        }
    };
    RangeValidator.prototype.onMaximumChanged = function (data) {
        if (!isNaN(+data.newValue)) {
            this._android.setMax(data.newValue);
        }
    };
    return RangeValidator;
})(commonModule.RangeValidator);
exports.RangeValidator = RangeValidator;
var PhoneValidator = (function (_super) {
    __extends(PhoneValidator, _super);
    function PhoneValidator() {
        _super.call(this);
        this._android = new com.telerik.widget.dataform.engine.PhoneValidator();
    }
    Object.defineProperty(PhoneValidator.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return PhoneValidator;
})(commonModule.PhoneValidator);
exports.PhoneValidator = PhoneValidator;
var StringToDateConverter = (function (_super) {
    __extends(StringToDateConverter, _super);
    function StringToDateConverter() {
        _super.call(this);
        this._android = new com.telerik.widget.dataform.engine.StringToDateConverter();
    }
    Object.defineProperty(StringToDateConverter.prototype, "android", {
        get: function () {
            return this._android;
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
        this._android = new com.telerik.widget.dataform.engine.StringToTimeConverter();
    }
    Object.defineProperty(StringToTimeConverter.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return StringToTimeConverter;
})(commonModule.StringToTimeConverter);
exports.StringToTimeConverter = StringToTimeConverter;
