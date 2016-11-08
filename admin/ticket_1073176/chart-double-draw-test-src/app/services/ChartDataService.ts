
import { DeviceState } from '../models/DeviceState'

let trace = require('trace')


export class ChartDataService {

    private _chartData: Array<DeviceState>
    private _dataComplete: boolean
    private _lastMeasurementTs: Date
    private _onComplete: Function

    constructor() {
        console.log('- ChartDataService created.')
        this._chartData = []
        this._lastMeasurementTs = null
    }

    public add(currentMeasurement: number, totalMeasurementCount: number, deviceState: DeviceState) {

        if (this._lastMeasurementTs == null || deviceState.ts.getTime() > this._lastMeasurementTs.getTime()) {
            this._lastMeasurementTs = deviceState.ts
            this._chartData.push(deviceState)
        }
        this._dataComplete = currentMeasurement == totalMeasurementCount

        if (this._dataComplete && this._onComplete) {
            console.log('- call onComplete callback.')
            this._onComplete(this._chartData)
        }
    }

    public chartData(): Array<DeviceState> {
        return this._chartData
    }

    public clear() {
        this._chartData.splice(0, this._chartData.length)
        this._dataComplete = false
        this._lastMeasurementTs = null
    }

    public setOnCompleteCb(cb: Function) {
        this._onComplete = cb
    }

}

export let chartDataService = new ChartDataService()