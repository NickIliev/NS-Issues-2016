import * as viewModelBaseModule from '../common/view-model-base'
import { Observable } from 'data/observable';
import observableArrayModule = require("data/observable-array");
import { DeviceState } from '../models/DeviceState'
import * as moment from 'moment'
let trace = require('trace')

class ChartViewModelBase extends viewModelBaseModule.ViewModelBase {

    private _chartDataSource: Array<DeviceState>

    constructor() {
        super();
        this._chartDataSource = []
    }

    public get chartDataSource(): Array<DeviceState> {
        return this._chartDataSource
    }

    public set chartDataSource(v: Array<DeviceState>) {
        this._chartDataSource = v;
        this.notifyPropertyChange("chartDataSource", v)
    }
}

export { ChartViewModelBase }