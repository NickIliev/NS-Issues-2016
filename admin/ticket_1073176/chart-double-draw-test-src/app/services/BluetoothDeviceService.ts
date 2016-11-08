import * as observableModule from 'data/observable'
import { ObservableArray } from 'data/observable-array'
import { chartDataService } from './ChartDataService'
import { DeviceState } from '../models/DeviceState'
import * as moment from 'moment'
var timer = require("timer");


export class BluetoothDeviceService {
    private _deviceStates: Array<DeviceState>


    constructor() {
        this._deviceStates = []
        for (var _i = 0; _i < 100; _i++) {
            this._deviceStates.push(new DeviceState(_i, moment().add(_i, 'hour').toDate()))
        }



    }

    public notifyMeasurementHistory(deviceUUID: string) {
        let that = this
        let totalMessageCount = this._deviceStates.length - 1
        /*
        for (var _i = 0; _i < this._deviceStates.length; _i++) {
            this.simulateDataFetch(_i, totalMessageCount, this._deviceStates[_i])
        }*/

        let loop = 0
        let looper = function () {
            console.log('Received measurement: ' + loop);

            if (loop < that._deviceStates.length) {
                chartDataService.add(loop, totalMessageCount, that._deviceStates[loop])
                loop++
            } else {
                console.log('All measurements received.');
                return
            }

            setTimeout(looper, 10);
        };

        looper();
    }

    private simulateDataFetch(messageIndex: number, totalMessageCount: number, deviceState: DeviceState) {
        timer.setTimeout(() => {

        }, 1000)
    }

    public stopNotifyMeasurementHistory(deviceUUID: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            console.log('Stop notify measurement history')
        })
    }

    public sleep(time): Promise<any> {
        return new Promise((resolve) => timer.setTimeout(() => {
            console.log('resolve sleep')
            resolve()
        }, time));
    }
}


export let btDeviceService = new BluetoothDeviceService()