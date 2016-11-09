/*
Sort of a base class for the view-model used on the login and sign up screens
however most view models extend this class, it needs a bit refactoring so that we
get most functionality with just one view model base for all pages

*/
import * as platformModule from 'platform'
import * as observableModule from 'data/observable'
import * as enumsModule from 'ui/enums'
import * as dialogsModule from 'ui/dialogs'
import * as connectivity from 'connectivity'

// let stringsModule = require("../resources/strings")

export class ViewModelBase extends observableModule.Observable {
    _loadingCount: number;
    _isLoading: boolean;

    constructor() {
        super();
        this._loadingCount = 0;
    }

    get isLoading(): boolean {
        return this._isLoading
    }

    set isLoading(value: boolean) {
        if (this._isLoading != value) {
            this._isLoading = value;
            this.notifyPropertyChange("isLoading", value)
        }
    }

    get androidVisibility(): string {
        if (platformModule.device.os === platformModule.platformNames.android) {
            return enumsModule.Visibility.visible
        }

        return enumsModule.Visibility.collapsed
    }

    get iosVisibility(): string {
        if (platformModule.device.os === platformModule.platformNames.ios) {
            return enumsModule.Visibility.visible
        }

        return enumsModule.Visibility.collapsed
    }

    get strings(): any {
        return "strings";
    }

    beginLoading(): boolean {
        if (connectivity.getConnectionType() === connectivity.connectionType.none) {
            this.showError("No internet connection.")
            return false;
        }

        if (!this._loadingCount) {
            this.isLoading = true
        }

        this._loadingCount++
        return true
    }

    endLoading() {
        if (this._loadingCount > 0) {
            this._loadingCount--
            if (!this._loadingCount) {
                this.isLoading = false
            }
        }
    }

    showError(error: string) {
        dialogsModule.alert({ title: "Error", message: error, okButtonText: "Close" })
    }

    showInfo(message: string) {
        dialogsModule.alert({ title: "Info", message: message, okButtonText: "OK" })
    }
}