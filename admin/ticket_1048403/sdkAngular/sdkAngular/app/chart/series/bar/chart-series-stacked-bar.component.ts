import { OptionsService } from "../../../navigation/options/options.service";
import { OptionsExampleBase } from "../../../options-example-base";
import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { Router } from '@angular/router';
import { Page } from "ui/page";
import * as applicationModule from "application";
import { DataService } from '../data.service';
import { Country } from '../country';
import { ObservableArray } from "data/observable-array";

@Component({
    moduleId: module.id,
    selector: 'chart-series-stacked-bar',
    providers: [DataService],
    templateUrl: 'chart-series-stacked-bar.component.html'
})
export class ChartSeriesStackedBarComponent extends OptionsExampleBase implements OnInit {
    private _optionsParamName: string;

    private _categoricalSource: ObservableArray<Country>;
    private _optionsItems: Array<string>;


    constructor( @Inject(Page) private _page: Page,
        private _optionsService: OptionsService, private _router: Router, private _changeDetectionRef: ChangeDetectorRef, private _dataService: DataService) {
        super();
        if (applicationModule.ios) {
            this._page.on("navigatingTo", this.onNavigatingTo, this);
            this._optionsParamName = "stackMode";
            this._optionsService.paramName = this._optionsParamName;
            this.router = _router;
            this._optionsItems = ["Stack", "Stack 100", "None"];
            this.navigationParameters = { selectedIndex: 1, paramName: this._optionsParamName, items: this._optionsItems };
        }
    }

    get categoricalSource(): ObservableArray<Country> {
        return this._categoricalSource;
    }

    ngOnInit() {
        this._categoricalSource = new ObservableArray(this._dataService.getCategoricalSource());
        this.onStack100ModeSelected();
    }

    ngAfterViewInit() {
        this._changeDetectionRef.detectChanges();
    }

    onNoneStackModeSelected() {
        this.set("stackMode", "None");
    }

    onStackModeSelected() {
        this.set("stackMode", "Stack");
    }

    onStack100ModeSelected() {
        this.set("stackMode", "Stack100");
    }

    public onNavigatingTo(args) {
        if (args.isBackNavigation) {
            if (this._optionsService.paramName === this._optionsParamName) {
                this.navigationParameters.selectedIndex = this._optionsItems.indexOf(this._optionsService.paramValue);
                switch (this._optionsService.paramValue) {
                    case "Stack 100":
                        this.onStack100ModeSelected();
                        break;
                    case "Stack":
                        this.onStackModeSelected();
                        break;
                    case "None":
                        this.onNoneStackModeSelected();
                        break;
                    default:
                        break;
                }
            }
        }
    }
}