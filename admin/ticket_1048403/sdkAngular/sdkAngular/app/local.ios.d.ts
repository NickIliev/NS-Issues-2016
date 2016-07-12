//partial type definitions
declare const enum UIUserInterfaceIdiom {
    Unspecified = -1,
    Phone = 0,
    Pad = 1,
    TV = 2
}

declare const UIUserInterfaceIdiomPad: number;
declare class NSObject { }
declare class UIDevice extends NSObject {
    static alloc(): UIDevice; // inherited from NSObject
    static currentDevice(): UIDevice;
    static new(): UIDevice; // inherited from NSObject
    userInterfaceIdiom: UIUserInterfaceIdiom;
}

declare class NSIndexPath extends NSObject { 
    static indexPathForItemInSection(item: number, section: number): NSIndexPath;
}

// TODO: Remove this after upgrading to the latest nativescript-fresco plugin as it already declares it
declare module com {
    module facebook {
        module drawee {
            module backends {
                module pipeline {
                    class Fresco {
                        static initialize(context);
                    }
                }
            }
        }  
    }
}