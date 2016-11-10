declare module com {
    module telerik {
        module widget {
            module dataform {
                module engine {
                    interface EntityProperty {
                        
                    }
                }
                module visualization {
                    class RadDataForm {
                        constructor(any);
                        setCommitMode(mode: com.telerik.widget.dataform.visualization.core.CommitMode) : void;
                        setValidationMode(mode: core.ValidationMode) : void;
                        setIsReadOnly(value: boolean) : void;  
                    }
                    module core {
                        enum CommitMode { IMMEDIATE, ON_LOST_FOCUS, MANUAL }
                        enum ValidationMode { IMMEDIATE, ON_LOST_FOCUS, MANUAL }
                    }
                    module editors {
                        class DataFormTextEditor {
                            constructor(dataForm: com.telerik.widget.dataform.visualization.RadDataForm, 
                                property: com.telerik.widget.dataform.engine.EntityProperty);
                        }
                    }
                }
            }
        }
    }
}
