import { Component, OnInit, Inject } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as frameModule from "ui/frame";
import { Page } from "ui/page";
import { RadListView } from "nativescript-telerik-ui-pro/listview";
import { OptionsService } from "../../navigation/options/options.service";

@Component({
    moduleId: module.id,
    selector: "options",
    templateUrl: "options.component.html",
    styleUrls: ["options.component.css"]
})
export class OptionsComponent implements OnInit {
    private _dataItems: ObservableArray<string>;
    private _listView: RadListView;
    private _sub: any;
    private _selectedIndex: number = -1;

    constructor( @Inject(Page) private _page, private _router: Router, private _optionsService: OptionsService) {
        this._page.on("loaded", this.onLoaded, this);
        this._dataItems = new ObservableArray<string>();
    }

    ngOnInit() {
        this._sub = this._router
            .routerState
            .queryParams
            .subscribe(params => {
                this._listView = <RadListView>this._page.getViewById("optionsListView");
                var items = params['items'];
                this._selectedIndex = +params['selectedIndex'];
                if (items) {
                    var splitItems = items.toString().split(',');
                    this._dataItems = new ObservableArray<string>(splitItems);
                    this.tryUpdateListViewSelection();
                }
            });
    }

    ngOnDestroy() {
        this._sub.unsubscribe();
    }

    public onLoaded() {
        this._listView = <RadListView>this._page.getViewById("optionsListView");
        this.tryUpdateListViewSelection();
    }

    private tryUpdateListViewSelection() {
        if (this._selectedIndex >= 0 && this._listView) {
            this._listView.selectItemAt(this._selectedIndex);
        }
    }

    get dataItems(): ObservableArray<string> {
        return this._dataItems;
    }


    public onItemTap(args) {
        var selectedItems = this._listView.getSelectedItems() as Array<string>;
        this._optionsService.paramValue = selectedItems[0];
        frameModule.topmost().goBack();
    }
}