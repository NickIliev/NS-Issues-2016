import * as observableModule from 'data/observable'
import * as pageModule from 'ui/page'
import { TemperatureChartViewModel } from './temperature-chart-view-model'
import { btDeviceService } from '../../services/BluetoothDeviceService'
import { chartDataService } from '../../services/ChartDataService'
import { DeviceState } from '../../models/DeviceState'

let viewModel: TemperatureChartViewModel
let page: pageModule.Page

export function navigatingTo(args: observableModule.EventData) {
    console.log('chart navigatingTo')
    page = <pageModule.Page>args.object
    viewModel = new TemperatureChartViewModel()
    page.bindingContext = viewModel


    if (chartDataService.chartData().length > 0) {
        viewModel.chartDataSource = chartDataService.chartData()

    } else {
        viewModel.beginLoading()
        btDeviceService.notifyMeasurementHistory('foo-bar')
        viewModel.endLoading()
    }
    chartDataService.setOnCompleteCb(onComplete)

}

export function navigatingFrom() {
    chartDataService.clear()
}

let onComplete = function (result: Array<DeviceState>) {
    console.log('Calling onComplete with:' + result.length + 'device states')
    viewModel.chartDataSource = result
}