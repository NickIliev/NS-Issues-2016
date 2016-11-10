	interface TKDrawing extends NSObjectProtocol {
		insets?: UIEdgeInsets;
		drawInContextWithPath(context: any, path: any): void;
		drawInContextWithRect(context: any, rect: CGRect): void;
	}
	declare var TKDrawing: any; /* Protocol */

    declare class TKRange {
        public minimum: any;
        public maximum: any;
        static rangeWithMinimumAndMaximum(min: any, max: any);
    }

	declare class TKFill extends NSObject implements NSCopying, TKDrawing {
		static alloc(): TKFill; // inherited from NSObject
		static new(): TKFill; // inherited from NSObject
		alpha: number;
		cornerRadius: number;
		corners: UIRectCorner;
		insets: UIEdgeInsets; // inherited from TKDrawing
		shadowBlur: number;
		shadowColor: UIColor;
		shadowOffset: CGSize;
		copyWithZone(zone: any): any; // inherited from NSCopying
		drawFillInContextWithPath(context: any, path: any): void;
		drawFillInContextWithRect(context: any, rect: CGRect): void;
		drawInContextWithPath(context: any, path: any): void; // inherited from TKDrawing
		drawInContextWithRect(context: any, rect: CGRect): void; // inherited from TKDrawing
		init(): TKFill; // inherited from NSObject
		self(): TKFill; // inherited from NSObjectProtocol
	}
	declare class TKStroke extends NSObject implements NSCopying, TKDrawing {
		static alloc(): TKStroke; // inherited from NSObject
		static new(): TKStroke; // inherited from NSObject
		static strokeWithColor(color: UIColor): TKStroke;
		static strokeWithColorWidth(color: UIColor, width: number): TKStroke;
		static strokeWithColorWidthCornerRadius(color: UIColor, width: number, cornerRadius: number): TKStroke;
		static strokeWithFill(fill: TKFill): TKStroke;
		static strokeWithFillWidth(fill: TKFill, width: number): TKStroke;
		static strokeWithFillWidthCornerRadius(fill: TKFill, width: number, cornerRadius: number): TKStroke;
		allowsAntialiasing: boolean;
		color: UIColor;
		cornerRadius: number;
		corners: UIRectCorner;
		dashPattern: NSArray;
		fill: TKFill;
		insets: UIEdgeInsets; // inherited from TKDrawing
		lineCap: CGLineCap;
		lineJoin: CGLineJoin;
		miterLimit: number;
		phase: number;
		shadowBlur: number;
		shadowColor: UIColor;
		shadowOffset: CGSize;
		strokeSides: any;//TKRectSide;
		width: number;
		copyWithZone(zone: any): any; // inherited from NSCopying
		drawInContextWithPath(context: any, path: any): void; // inherited from TKDrawing
		drawInContextWithRect(context: any, rect: CGRect): void; // inherited from TKDrawing
		init(): TKStroke; // inherited from NSObject
		initWithColor(color: UIColor): TKStroke;
		initWithColorWidth(color: UIColor, width: number): TKStroke;
		initWithFill(fill: TKFill): TKStroke;
		initWithFillWidth(fill: TKFill, width: number): TKStroke;
		self(): TKStroke; // inherited from NSObjectProtocol
	}

	declare class TKSolidFill extends TKFill {
        static new(): TKSolidFill;
		static solidFillWithColor(color: UIColor): TKSolidFill;
		static solidFillWithColorCornerRadius(color: UIColor, cornerRadius: number): TKSolidFill;
		color: UIColor;
		initWithColor(color: UIColor): TKSolidFill;
		initWithColorCornerRadius(color: UIColor, cornerRadius: number): TKSolidFill;
		self(): TKSolidFill; // inherited from NSObjectProtocol
	}

	declare class TKLabel extends UILabel {
		textInsets: UIEdgeInsets;
		initWithCoder(aDecoder: NSCoder): TKLabel; // inherited from NSCoding
	}

	declare class TKView extends UIView {
		static appearance(): TKView; // inherited from UIAppearance
		static appearanceForTraitCollection(trait: UITraitCollection): TKView; // inherited from UIAppearance
		static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKView; // inherited from UIAppearance
		static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray): TKView; // inherited from UIAppearance
		static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKView; // inherited from UIAppearance
		static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray): TKView; // inherited from UIAppearance
		static versionString(): string;
		drawables: NSArray;
		fill: TKFill;
		layout: any;//TKCoreLayout;
		shape: any;//TKShape;
		stroke: TKStroke;
		initWithCoder(aDecoder: NSCoder): TKView; // inherited from NSCoding
		initWithFrame(frame: CGRect): TKView; // inherited from UIView
		self(): TKView; // inherited from NSObjectProtocol
	}

///////////////////////////////////////////////////////////////////////////////////////////////////////
	declare class TKEntity extends NSObject {
		static alloc(): TKEntity; // inherited from NSObject
		static entityWithObject(sourceObject: NSObject): TKEntity;
		static new(): TKEntity; // inherited from NSObject
		defaultGroup: TKEntityPropertyGroup;
		groups: NSArray;
		properties: NSArray;
		sourceObject: NSObject;
		addGroup(group: TKEntityPropertyGroup): void;
		addGroupWithNamePropertyNames(name: string, propertyNames: NSArray): TKEntityPropertyGroup;
		commit(): boolean;
		groupAtIndex(index: number): TKEntityPropertyGroup;
		groupWithName(groupName: string): TKEntityPropertyGroup;
		init(): TKEntity; // inherited from NSObject
		initWithDataFromJSONResourceOfTypeRootItemKeyPath(name: string, type: string, rootItemKeyPath: string): TKEntity;
		initWithJSONFromURLRootItemKeyPathCompletion(url: string, rootItemKeyPath: string, completion: (p1: NSError) => void): TKEntity;
		initWithJSONStringRootItemKeyPath(str: string, rootItemKeyPath: string): TKEntity;
        
		initWithObject(sourceObject: NSObject): TKEntity;
		initWithObjectPropertyNames(sourceObject: NSObject, propertyNames: NSArray): TKEntity;
		insertGroupAtIndex(group: TKEntityPropertyGroup, index: number): void;
		objectForKeyedSubscript(propertyName: string): TKEntityProperty;
		propertyWithName(propertyName: string): TKEntityProperty;
		removeAllGroups(): void;
		removeGroup(group: TKEntityPropertyGroup): void;
		removeGroupAtIndex(index: number): void;
		self(): TKEntity; // inherited from NSObjectProtocol
		setSourceObjectWithProperties(sourceObject: NSObject, properties: NSArray): void;
		setSourceObjectWithPropertyNames(sourceObject: NSObject, propertyNames: NSArray): void;
		validate(): NSArray;
		writeJSONToStream(outputStream: NSOutputStream): NSError;
		writeJSONToString(): string;
	}

	declare class TKEntityProperty extends NSObject {
		static alloc(): TKEntityProperty; // inherited from NSObject
		static new(): TKEntityProperty; // inherited from NSObject
		displayName: string;
		editorClass: typeof NSObject;
		errorMessage: string;
		feedbackImage: UIImage;
		formatter: NSFormatter;
		groupName: string;
		hidden: boolean;
		hintText: string;
		image: UIImage;
		index: number;
		isValid: boolean;
		name: string;
		originalValue: any;
		owner: TKEntity;
		positiveMessage: string;
		propertyClass: typeof NSObject;
		readOnly: boolean;
		required: boolean;
		type: TKEntityPropertyType;
		validators: NSArray;
		valueCandidate: any;
		valuesProvider: any;
		commit(): boolean;
		init(): TKEntityProperty; // inherited from NSObject
		initWithEntityForPropertyName(owner: TKEntity, propertyName: string): TKEntityProperty;
		self(): TKEntityProperty; // inherited from NSObjectProtocol
		validate(): boolean;
	}

	declare class TKEntityPropertyGroup extends NSObject {
		static alloc(): TKEntityPropertyGroup; // inherited from NSObject
		static new(): TKEntityPropertyGroup; // inherited from NSObject
		hidden: boolean;
		name: string;
		owner: TKEntity;
		properties: NSArray;
		[index: number]: TKEntityProperty;
		addProperty(property: TKEntityProperty): void;
		init(): TKEntityPropertyGroup; // inherited from NSObject
		initWithNameProperties(name: string, properties: NSArray): TKEntityPropertyGroup;
		initWithNamePropertiesOrderByPropertyIndex(name: string, properties: NSArray, orderByPropertyIndex: boolean): TKEntityPropertyGroup;
		insertPropertyAtIndex(property: TKEntityProperty, index: number): void;
		objectAtIndexedSubscript(index: number): TKEntityProperty;
		objectForKeyedSubscript(propertyName: string): TKEntityProperty;
		propertyAtIndex(index: number): TKEntityProperty;
		propertyWithName(name: string): TKEntityProperty;
		removeAllProperties(): void;
		removeProperty(property: TKEntityProperty): void;
		removePropertyAtIndex(index: number): void;
		self(): TKEntityPropertyGroup; // inherited from NSObjectProtocol
	}

	declare class TKEntityPropertyGroupEditorsView extends UIView {
		static appearance(): TKEntityPropertyGroupEditorsView; // inherited from UIAppearance
		static appearanceForTraitCollection(trait: UITraitCollection): TKEntityPropertyGroupEditorsView; // inherited from UIAppearance
		static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKEntityPropertyGroupEditorsView; // inherited from UIAppearance
		static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray): TKEntityPropertyGroupEditorsView; // inherited from UIAppearance
		static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKEntityPropertyGroupEditorsView; // inherited from UIAppearance
		static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray): TKEntityPropertyGroupEditorsView; // inherited from UIAppearance
		items: NSArray;
		layout: any;//TKLayout;
		addItem(item: UIView): void;
		initWithCoder(aDecoder: NSCoder): TKEntityPropertyGroupEditorsView; // inherited from NSCoding
		initWithFrame(frame: CGRect): TKEntityPropertyGroupEditorsView; // inherited from UIView
		removeAllItems(): void;
		removeItem(item: UIView): void;
		self(): TKEntityPropertyGroupEditorsView; // inherited from NSObjectProtocol
	}

	declare const enum TKEntityPropertyGroupTitleIndicatorPosition {
		Left = 0,
		Right = 1
	}

	declare const TKEntityPropertyGroupTitleIndicatorPositionLeft: number;

	declare const TKEntityPropertyGroupTitleIndicatorPositionRight: number;

	declare class TKEntityPropertyGroupTitleView extends UIView {
		static appearance(): TKEntityPropertyGroupTitleView; // inherited from UIAppearance
		static appearanceForTraitCollection(trait: UITraitCollection): TKEntityPropertyGroupTitleView; // inherited from UIAppearance
		static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKEntityPropertyGroupTitleView; // inherited from UIAppearance
		static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray): TKEntityPropertyGroupTitleView; // inherited from UIAppearance
		static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKEntityPropertyGroupTitleView; // inherited from UIAppearance
		static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray): TKEntityPropertyGroupTitleView; // inherited from UIAppearance
		allowIndicatorAnimation: boolean;
		indicatorPosition: TKEntityPropertyGroupTitleIndicatorPosition;
		indicatorView: UIView;
		itemSpacing: number;
		style: TKDataFormGroupTitleStyle;
		titleLabel: TKLabel;
		initWithCoder(aDecoder: NSCoder): TKEntityPropertyGroupTitleView; // inherited from NSCoding
		initWithFrame(frame: CGRect): TKEntityPropertyGroupTitleView; // inherited from UIView
		self(): TKEntityPropertyGroupTitleView; // inherited from NSObjectProtocol
	}

	declare class TKEntityPropertyGroupTitleViewIndicator extends UIView {
		static appearance(): TKEntityPropertyGroupTitleViewIndicator; // inherited from UIAppearance
		static appearanceForTraitCollection(trait: UITraitCollection): TKEntityPropertyGroupTitleViewIndicator; // inherited from UIAppearance
		static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKEntityPropertyGroupTitleViewIndicator; // inherited from UIAppearance
		static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray): TKEntityPropertyGroupTitleViewIndicator; // inherited from UIAppearance
		static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKEntityPropertyGroupTitleViewIndicator; // inherited from UIAppearance
		static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray): TKEntityPropertyGroupTitleViewIndicator; // inherited from UIAppearance
		fillColor: TKSolidFill;
		size: CGSize;
		strokeColor: TKStroke;
		initWithCoder(aDecoder: NSCoder): TKEntityPropertyGroupTitleViewIndicator; // inherited from NSCoding
		initWithFrame(frame: CGRect): TKEntityPropertyGroupTitleViewIndicator; // inherited from UIView
		self(): TKEntityPropertyGroupTitleViewIndicator; // inherited from NSObjectProtocol
	}

	declare class TKEntityPropertyGroupView extends UIView {
        static new(): TKEntityPropertyGroupView;
		static appearance(): TKEntityPropertyGroupView; // inherited from UIAppearance
		static appearanceForTraitCollection(trait: UITraitCollection): TKEntityPropertyGroupView; // inherited from UIAppearance
		static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKEntityPropertyGroupView; // inherited from UIAppearance
		static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray): TKEntityPropertyGroupView; // inherited from UIAppearance
		static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKEntityPropertyGroupView; // inherited from UIAppearance
		static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray): TKEntityPropertyGroupView; // inherited from UIAppearance
		collapsible: boolean;
		editorsContainer: TKEntityPropertyGroupEditorsView;
		group: TKEntityPropertyGroup;
		titleView: TKEntityPropertyGroupTitleView;
		initWithCoder(aDecoder: NSCoder): TKEntityPropertyGroupView; // inherited from NSCoding
		initWithFrame(frame: CGRect): TKEntityPropertyGroupView; // inherited from UIView
		self(): TKEntityPropertyGroupView; // inherited from NSObjectProtocol
	}

	declare const enum TKEntityPropertyType {
		Unknown = 0,
		Numeric = 1,
		Integer = 2,
		Double = 3,
		Bool = 4,
		String = 5,
		Date = 6
	}

	declare const TKEntityPropertyTypeBool: number;

	declare const TKEntityPropertyTypeDate: number;

	declare const TKEntityPropertyTypeDouble: number;

	declare const TKEntityPropertyTypeInteger: number;

	declare const TKEntityPropertyTypeNumeric: number;

	declare const TKEntityPropertyTypeString: number;

	declare const TKEntityPropertyTypeUnknown: number;

declare class TKDataForm extends UIView {
        static new(): TKDataForm;
		static appearance(): TKDataForm; // inherited from UIAppearance
		static appearanceForTraitCollection(trait: UITraitCollection): TKDataForm; // inherited from UIAppearance
		static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKDataForm; // inherited from UIAppearance
		static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray): TKDataForm; // inherited from UIAppearance
		static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKDataForm; // inherited from UIAppearance
		static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray): TKDataForm; // inherited from UIAppearance
		allowScroll: boolean;
        readOnly: boolean;
		commitMode: TKDataFormCommitMode;
		dataSource: TKDataFormDataSource;
		delegate: TKDataFormDelegate;
		groupSpacing: number;
		validationMode: TKDataFormValidationMode;
		commit(): void;
		initWithCoder(aDecoder: NSCoder): TKDataForm; // inherited from NSCoding
		initWithFrame(frame: CGRect): TKDataForm; // inherited from UIView
		registerEditorForProperty(editorClass: typeof NSObject, propertyName: string): void;
		registerEditorForPropertyOfClass(editorClass: typeof NSObject, propertyClass: typeof NSObject): void;
		registerEditorForPropertyOfType(editorClass: typeof NSObject, propertyType: TKEntityPropertyType): void;
		reloadData(): void;
		self(): TKDataForm; // inherited from NSObjectProtocol
		setEditorOnFocus(editor: TKDataFormEditor): void;
		update(): void;
	}

	declare class TKDataFormAccessoryView extends UIView {
		static appearance(): TKDataFormAccessoryView; // inherited from UIAppearance
		static appearanceForTraitCollection(trait: UITraitCollection): TKDataFormAccessoryView; // inherited from UIAppearance
		static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKDataFormAccessoryView; // inherited from UIAppearance
		static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray): TKDataFormAccessoryView; // inherited from UIAppearance
		static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKDataFormAccessoryView; // inherited from UIAppearance
		static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray): TKDataFormAccessoryView; // inherited from UIAppearance
		doneBarItem: UIBarButtonItem;
		nextBarItem: UIBarButtonItem;
		previousBarItem: UIBarButtonItem;
		toolbar: UIToolbar;
		initWithCoder(aDecoder: NSCoder): TKDataFormAccessoryView; // inherited from NSCoding
		initWithFrame(frame: CGRect): TKDataFormAccessoryView; // inherited from UIView
		self(): TKDataFormAccessoryView; // inherited from NSObjectProtocol
	}

	declare const enum TKDataFormCommitMode {
		Immediate = 0,
		OnLostFocus = 1,
		Manual = 2
	}

	declare const TKDataFormCommitModeImmediate: number;

	declare const TKDataFormCommitModeManual: number;

	declare const TKDataFormCommitModeOnLostFocus: number;

	interface TKDataFormDataSource extends NSObjectProtocol {
		dataFormEditorClassForProperty?(dataForm: TKDataForm, property: TKEntityProperty): typeof NSObject;
		dataFormGroupAtIndex(dataForm: TKDataForm, groupIndex: number): TKEntityPropertyGroup;
		dataFormNumberOfPropertiesInGroup(dataForm: TKDataForm, groupIndex: number): number;
		dataFormPropertyInGroupAtIndex(dataForm: TKDataForm, groupIndex: number, propertyIndex: number): TKEntityProperty;
		dataFormSetValueForProperty(dataForm: TKDataForm, value: any, property: TKEntityProperty): boolean;
		dataFormTitleForHeaderInGroup?(dataForm: TKDataForm, groupIndex: number): string;
		indexOfGroupInDataForm(group: TKEntityPropertyGroup): number;
		numberOfGroupsInDataForm?(dataForm: TKDataForm): number;
	}
	declare var TKDataFormDataSource: any; /* Protocol */

	declare class TKDataFormDatePickerEditor extends TKDataFormInlineEditor {
		dateFormatter: NSDateFormatter;
		datePicker: UIDatePicker;
	}

	declare class TKDataFormDecimalEditor extends TKDataFormTextFieldEditor {
		self(): TKDataFormDecimalEditor; // inherited from NSObjectProtocol
	}

    declare class TKDataFormMultilineTextEditor extends TKDataFormEditor {

    }

	interface TKDataFormDelegate extends NSObjectProtocol {
		dataFormDidCommitProperty?(dataForm: TKDataForm, property: TKEntityProperty): void;
		dataFormDidDeselectEditorForProperty?(dataForm: TKDataForm, editor: TKDataFormEditor, property: TKEntityProperty): void;
		dataFormDidEditProperty?(dataForm: TKDataForm, property: TKEntityProperty): void;
		dataFormDidSelectEditorForProperty?(dataForm: TKDataForm, editor: TKDataFormEditor, property: TKEntityProperty): void;
		dataFormDidValidatePropertyEditor?(dataForm: TKDataForm, property: TKEntityProperty, editor: TKDataFormEditor): void;
		dataFormHeightForEditorInGroupAtIndex?(dataForm: TKDataForm, groupIndex: number, editorIndex: number): number;
		dataFormHeightForHeaderInGroup?(dataForm: TKDataForm, groupIndex: number): number;
		dataFormUpdateEditorForProperty?(dataForm: TKDataForm, editor: TKDataFormEditor, property: TKEntityProperty): void;
		dataFormUpdateGroupViewForGroupAtIndex?(dataForm: TKDataForm, groupView: TKEntityPropertyGroupView, groupIndex: number): void;
		dataFormValidatePropertyEditor?(dataForm: TKDataForm, property: TKEntityProperty, editor: TKDataFormEditor): boolean;
		dataFormViewForHeaderInGroup?(dataForm: TKDataForm, groupIndex: number): TKEntityPropertyGroupTitleView;
		dataFormWillCommitProperty?(dataForm: TKDataForm, property: TKEntityProperty): boolean;
		inputAccessoryViewForDataForm?(dataForm: TKDataForm): TKDataFormAccessoryView;
	}
	declare var TKDataFormDelegate: any; /* Protocol */

	declare class TKDataFormEditor extends UIView {
		static appearance(): TKDataFormEditor; // inherited from UIAppearance
		static appearanceForTraitCollection(trait: UITraitCollection): TKDataFormEditor; // inherited from UIAppearance
		static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKDataFormEditor; // inherited from UIAppearance
		static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray): TKDataFormEditor; // inherited from UIAppearance
		static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKDataFormEditor; // inherited from UIAppearance
		static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray): TKDataFormEditor; // inherited from UIAppearance
		editor: UIView;
		feedbackImageView: UIImageView;
		feedbackLabel: UILabel;
		gridLayout: any;//TKGridLayout;
		imageView: UIImageView;
		owner: TKDataForm;
		property: TKEntityProperty;
		selected: boolean;
		selectedView: TKView;
		style: TKDataFormEditorStyle;
		textLabel: TKLabel;
		value: any;
		initWithCoder(aDecoder: NSCoder): TKDataFormEditor; // inherited from NSCoding
		initWithFrame(frame: CGRect): TKDataFormEditor; // inherited from UIView
		initWithProperty(property: TKEntityProperty): TKDataFormEditor;
		self(): TKDataFormEditor; // inherited from NSObjectProtocol
		update(): void;
	}

	declare class TKDataFormEditorStyle extends NSObject {
		accessoryArrowSize: CGSize;
		accessoryArrowStroke: TKStroke;
		editorOffset: UIOffset;
		feedbackImageViewOffset: UIOffset;
		feedbackLabelOffset: UIOffset;
		fill: TKFill;
		imageViewOffset: UIOffset;
		insets: UIEdgeInsets;
		separatorColor: TKFill;
		separatorLeadingSpace: number;
		separatorTrailingSpace: number;
		stroke: TKStroke;
		textLabelDisplayMode: TKDataFormEditorTextLabelDisplayMode;
		textLabelOffset: UIOffset;
	}

	declare const enum TKDataFormEditorTextLabelDisplayMode {
		Show = 0,
		Hidden = 1
	}

	declare const TKDataFormEditorTextLabelDisplayModeHidden: number;

	declare const TKDataFormEditorTextLabelDisplayModeShow: number;

	declare class TKDataFormEmailEditor extends TKDataFormTextFieldEditor {
		self(): TKDataFormEmailEditor; // inherited from NSObjectProtocol
	}

	declare class TKDataFormEntityDataSource extends TKEntity implements TKDataFormDataSource {
		static entityWithObject(sourceObject: NSObject): TKDataFormEntityDataSource; // inherited from TKEntity
		debugDescription: string; // inherited from NSObjectProtocol
		description: string; // inherited from NSObjectProtocol
		hash: number; // inherited from NSObjectProtocol
		superclass: typeof NSObject; // inherited from NSObjectProtocol
		class(): typeof NSObject; // inherited from NSObjectProtocol
		conformsToProtocol(aProtocol: any /* Protocol */): boolean; // inherited from NSObjectProtocol
		dataFormEditorClassForProperty(dataForm: TKDataForm, property: TKEntityProperty): typeof NSObject; // inherited from TKDataFormDataSource
		dataFormGroupAtIndex(dataForm: TKDataForm, groupIndex: number): TKEntityPropertyGroup; // inherited from TKDataFormDataSource
		dataFormNumberOfPropertiesInGroup(dataForm: TKDataForm, groupIndex: number): number; // inherited from TKDataFormDataSource
		dataFormPropertyInGroupAtIndex(dataForm: TKDataForm, groupIndex: number, propertyIndex: number): TKEntityProperty; // inherited from TKDataFormDataSource
		dataFormSetValueForProperty(dataForm: TKDataForm, value: any, property: TKEntityProperty): boolean; // inherited from TKDataFormDataSource
		dataFormTitleForHeaderInGroup(dataForm: TKDataForm, groupIndex: number): string; // inherited from TKDataFormDataSource
		indexOfGroupInDataForm(group: TKEntityPropertyGroup): number; // inherited from TKDataFormDataSource
		initWithDataFromJSONResourceOfTypeRootItemKeyPath(name: string, type: string, rootItemKeyPath: string): TKDataFormEntityDataSource; // inherited from TKEntity
		initWithJSONFromURLRootItemKeyPathCompletion(url: string, rootItemKeyPath: string, completion: (p1: NSError) => void): TKDataFormEntityDataSource; // inherited from TKEntity
		initWithJSONStringRootItemKeyPath(str: string, rootItemKeyPath: string): TKDataFormEntityDataSource; // inherited from TKEntity
		initWithObject(sourceObject: NSObject): TKDataFormEntityDataSource; // inherited from TKEntity
		initWithObjectPropertyNames(sourceObject: NSObject, propertyNames: NSArray): TKDataFormEntityDataSource; // inherited from TKEntity
		isEqual(object: any): boolean; // inherited from NSObjectProtocol
		isKindOfClass(aClass: typeof NSObject): boolean; // inherited from NSObjectProtocol
		isMemberOfClass(aClass: typeof NSObject): boolean; // inherited from NSObjectProtocol
		isProxy(): boolean; // inherited from NSObjectProtocol
		numberOfGroupsInDataForm(dataForm: TKDataForm): number; // inherited from TKDataFormDataSource
		performSelector(aSelector: string): any; // inherited from NSObjectProtocol
		performSelectorWithObject(aSelector: string, object: any): any; // inherited from NSObjectProtocol
		performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any; // inherited from NSObjectProtocol
		respondsToSelector(aSelector: string): boolean; // inherited from NSObjectProtocol
		retainCount(): number; // inherited from NSObjectProtocol
		self(): TKDataFormEntityDataSource; // inherited from NSObjectProtocol
	}

	declare class TKDataFormGroupTitleStyle extends NSObject {
		fill: TKFill;
		insets: UIEdgeInsets;
		separatorColor: TKFill;
		separatorLeadingSpace: number;
		separatorTrailingSpace: number;
		stroke: TKStroke;
	}

	declare class TKDataFormInlineEditor extends TKDataFormEditor {
		accessoryImageView: UIImageView;
		displayMode: TKDataFormInlineEditorDisplayMode;
		editorValueLabel: TKLabel;
		showAccessoryImage: boolean;
		initWithProperty(property: TKEntityProperty): TKDataFormInlineEditor; // inherited from TKDataFormEditor
	}

	declare const enum TKDataFormInlineEditorDisplayMode {
		Inline = 0,
		Modal = 1
	}

	declare const TKDataFormInlineEditorDisplayModeInline: number;

	declare const TKDataFormInlineEditorDisplayModeModal: number;

	declare class TKDataFormNamePhoneEditor extends TKDataFormTextFieldEditor {
		self(): TKDataFormNamePhoneEditor; // inherited from NSObjectProtocol
	}

	declare class TKDataFormNumberEditor extends TKDataFormTextFieldEditor {
		self(): TKDataFormNumberEditor; // inherited from NSObjectProtocol
	}

	declare class TKDataFormOptionsEditor extends TKDataFormEditor {
		accessoryImageView: UIImageView;
		options: NSArray;
		selectedIndex: number;
		selectedOptionLabel: TKLabel;
		showAccessoryImage: boolean;
		initWithProperty(property: TKEntityProperty): TKDataFormOptionsEditor; // inherited from TKDataFormEditor
	}

	declare class TKDataFormOptionsViewController extends UITableViewController {
		editor: TKDataFormOptionsEditor;
		items: NSArray;
		initWithStyle(style: UITableViewStyle): TKDataFormOptionsViewController; // inherited from UITableViewController
		self(): TKDataFormOptionsViewController; // inherited from NSObjectProtocol
	}

	declare class TKDataFormPasswordEditor extends TKDataFormTextFieldEditor {
		self(): TKDataFormPasswordEditor; // inherited from NSObjectProtocol
	}

	declare class TKDataFormPhoneEditor extends TKDataFormTextFieldEditor {
		self(): TKDataFormPhoneEditor; // inherited from NSObjectProtocol
	}

	declare class TKDataFormPickerViewEditor extends TKDataFormInlineEditor {
		options: NSArray;
		pickerView: UIPickerView;
		selectedIndex: number;
	}

	declare class TKDataFormSegmentedEditor extends TKDataFormEditor {
		options: NSArray;
		segmentedControl: UISegmentedControl;
		selectedIndex: number;
		initWithProperty(property: TKEntityProperty): TKDataFormSegmentedEditor; // inherited from TKDataFormEditor
	}

	declare class TKDataFormSliderEditor extends TKDataFormEditor {
		sliderView: UISlider;
		stepValue: number;
		initWithProperty(property: TKEntityProperty): TKDataFormSliderEditor; // inherited from TKDataFormEditor
	}

	declare class TKDataFormStepperEditor extends TKDataFormEditor {
		formatter: NSNumberFormatter;
		stepperView: UIStepper;
		valueLabel: UILabel;
		initWithProperty(property: TKEntityProperty): TKDataFormStepperEditor; // inherited from TKDataFormEditor
	}

	declare class TKDataFormSwitchEditor extends TKDataFormEditor {
		switchView: UISwitch;
		initWithProperty(property: TKEntityProperty): TKDataFormSwitchEditor; // inherited from TKDataFormEditor
	}

	declare class TKDataFormTextFieldEditor extends TKDataFormEditor implements UITextFieldDelegate {
		debugDescription: string; // inherited from NSObjectProtocol
		description: string; // inherited from NSObjectProtocol
		hash: number; // inherited from NSObjectProtocol
		superclass: typeof NSObject; // inherited from NSObjectProtocol
		textField: any;//TKTextField;
		class(): typeof NSObject; // inherited from NSObjectProtocol
		conformsToProtocol(aProtocol: any /* Protocol */): boolean; // inherited from NSObjectProtocol
		initWithProperty(property: TKEntityProperty): TKDataFormTextFieldEditor; // inherited from TKDataFormEditor
		isEqual(object: any): boolean; // inherited from NSObjectProtocol
		isKindOfClass(aClass: typeof NSObject): boolean; // inherited from NSObjectProtocol
		isMemberOfClass(aClass: typeof NSObject): boolean; // inherited from NSObjectProtocol
		isProxy(): boolean; // inherited from NSObjectProtocol
		performSelector(aSelector: string): any; // inherited from NSObjectProtocol
		performSelectorWithObject(aSelector: string, object: any): any; // inherited from NSObjectProtocol
		performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any; // inherited from NSObjectProtocol
		respondsToSelector(aSelector: string): boolean; // inherited from NSObjectProtocol
		retainCount(): number; // inherited from NSObjectProtocol
		self(): TKDataFormTextFieldEditor; // inherited from NSObjectProtocol
		textFieldDidBeginEditing(textField: UITextField): void; // inherited from UITextFieldDelegate
		textFieldDidEndEditing(textField: UITextField): void; // inherited from UITextFieldDelegate
		textFieldShouldBeginEditing(textField: UITextField): boolean; // inherited from UITextFieldDelegate
		textFieldShouldChangeCharactersInRangeReplacementString(textField: UITextField, range: NSRange, string: string): boolean; // inherited from UITextFieldDelegate
		textFieldShouldClear(textField: UITextField): boolean; // inherited from UITextFieldDelegate
		textFieldShouldEndEditing(textField: UITextField): boolean; // inherited from UITextFieldDelegate
		textFieldShouldReturn(textField: UITextField): boolean; // inherited from UITextFieldDelegate
	}

	declare class TKDataFormTimePickerEditor extends TKDataFormDatePickerEditor {
	}

	declare const enum TKDataFormValidationMode {
		Immediate = 0,
		OnLostFocus = 1,
		Manual = 2
	}

	declare const TKDataFormValidationModeImmediate: number;

	declare const TKDataFormValidationModeManual: number;

	declare const TKDataFormValidationModeOnLostFocus: number;

	interface TKDataFormValidator extends NSObjectProtocol {
		validationMessage: string;
		validateProperty(property: TKEntityProperty): boolean;
	}
	interface TKDataFormConverter extends NSObjectProtocol {
		convertFrom(source: any): any;
		convertTo(source: any): any;
	}
	declare var TKDataFormValidator: any; /* Protocol */

	declare class TKDataFormViewController extends UIViewController implements TKDataFormDataSource, TKDataFormDelegate {
		dataForm: TKDataForm;
		dataFormDidCommitProperty(dataForm: TKDataForm, property: TKEntityProperty): void; // inherited from TKDataFormDelegate
		dataFormDidDeselectEditorForProperty(dataForm: TKDataForm, editor: TKDataFormEditor, property: TKEntityProperty): void; // inherited from TKDataFormDelegate
		dataFormDidEditProperty(dataForm: TKDataForm, property: TKEntityProperty): void; // inherited from TKDataFormDelegate
		dataFormDidSelectEditorForProperty(dataForm: TKDataForm, editor: TKDataFormEditor, property: TKEntityProperty): void; // inherited from TKDataFormDelegate
		dataFormDidValidatePropertyEditor(dataForm: TKDataForm, property: TKEntityProperty, editor: TKDataFormEditor): void; // inherited from TKDataFormDelegate
		dataFormEditorClassForProperty(dataForm: TKDataForm, property: TKEntityProperty): typeof NSObject; // inherited from TKDataFormDataSource
		dataFormGroupAtIndex(dataForm: TKDataForm, groupIndex: number): TKEntityPropertyGroup; // inherited from TKDataFormDataSource
		dataFormHeightForEditorInGroupAtIndex(dataForm: TKDataForm, groupIndex: number, editorIndex: number): number; // inherited from TKDataFormDelegate
		dataFormHeightForHeaderInGroup(dataForm: TKDataForm, groupIndex: number): number; // inherited from TKDataFormDelegate
		dataFormNumberOfPropertiesInGroup(dataForm: TKDataForm, groupIndex: number): number; // inherited from TKDataFormDataSource
		dataFormPropertyInGroupAtIndex(dataForm: TKDataForm, groupIndex: number, propertyIndex: number): TKEntityProperty; // inherited from TKDataFormDataSource
		dataFormSetValueForProperty(dataForm: TKDataForm, value: any, property: TKEntityProperty): boolean; // inherited from TKDataFormDataSource
		dataFormTitleForHeaderInGroup(dataForm: TKDataForm, groupIndex: number): string; // inherited from TKDataFormDataSource
		dataFormUpdateEditorForProperty(dataForm: TKDataForm, editor: TKDataFormEditor, property: TKEntityProperty): void; // inherited from TKDataFormDelegate
		dataFormUpdateGroupViewForGroupAtIndex(dataForm: TKDataForm, groupView: TKEntityPropertyGroupView, groupIndex: number): void; // inherited from TKDataFormDelegate
		dataFormValidatePropertyEditor(dataForm: TKDataForm, property: TKEntityProperty, editor: TKDataFormEditor): boolean; // inherited from TKDataFormDelegate
		dataFormViewForHeaderInGroup(dataForm: TKDataForm, groupIndex: number): TKEntityPropertyGroupTitleView; // inherited from TKDataFormDelegate
		dataFormWillCommitProperty(dataForm: TKDataForm, property: TKEntityProperty): boolean; // inherited from TKDataFormDelegate
		indexOfGroupInDataForm(group: TKEntityPropertyGroup): number; // inherited from TKDataFormDataSource
		initWithCoder(aDecoder: NSCoder): TKDataFormViewController; // inherited from NSCoding
		initWithNibNameBundle(nibNameOrNil: string, nibBundleOrNil: NSBundle): TKDataFormViewController; // inherited from UIViewController
		inputAccessoryViewForDataForm(dataForm: TKDataForm): TKDataFormAccessoryView; // inherited from TKDataFormDelegate
		numberOfGroupsInDataForm(dataForm: TKDataForm): number; // inherited from TKDataFormDataSource
		self(): TKDataFormViewController; // inherited from NSObjectProtocol
	}

    declare class TKDataFormViewControllerEditor extends TKDataFormEditor {
        
    }

    declare class TKDataFormPropertyValidator {
        static new(): TKDataFormPropertyValidator;
        positiveMessage: string;
        errorMessage: string;
        validateProperty(property: TKEntityProperty): boolean;
    }

    declare class TKDataFormMinimumLengthValidator extends TKDataFormPropertyValidator {
        static new(): TKDataFormMinimumLengthValidator;
        minimumLength: number;
        initWithMinimumLength(minimumLength: number): TKDataFormMinimumLengthValidator;
    }

    declare class TKDataFormMaximumLengthValidator extends TKDataFormPropertyValidator {
        static new(): TKDataFormMaximumLengthValidator;
        maximumLength: number;
        initWithMaximumLength(maximumLength: number): TKDataFormMaximumLengthValidator;
    }

    declare class TKDataFormPhoneValidator extends TKDataFormPropertyValidator {
        static new(): TKDataFormPhoneValidator;
    }

    declare class TKDataFormEmailValidator extends TKDataFormPropertyValidator {
        static new(): TKDataFormEmailValidator;
    }
    declare class TKDataFormNonEmptyValidator extends TKDataFormPropertyValidator {
        static new(): TKDataFormNonEmptyValidator;
    }
    declare class TKDataFormRangeValidator extends TKDataFormPropertyValidator {
        static new(): TKDataFormRangeValidator;
        range: any;//TKRange;
    }

    declare class TKDataFormStringToDateConverter implements TKDataFormConverter {
        static new(): TKDataFormStringToDateConverter;
		convertFrom(source: any): any;
		convertTo(source: any): any;
    }

    declare class TKDataFormStringToTimeConverter implements TKDataFormConverter {
        static new(): TKDataFormStringToTimeConverter;
		convertFrom(source: any): any;
		convertTo(source: any): any;
    }
    
    