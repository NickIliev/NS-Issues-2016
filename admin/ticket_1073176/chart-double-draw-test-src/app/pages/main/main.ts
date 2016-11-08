import * as observableModule from 'data/observable'
import * as viewModule from 'ui/core/view'
import * as pageModule from 'ui/page'
import * as navigationModule from '../../utils/navigation'
import { Views } from '../../utils/views'
import { MainViewModel } from './main-view-model'

let viewModel: MainViewModel
let page: pageModule.Page

export function navigatingTo(args: observableModule.EventData) {
    page = <pageModule.Page>args.object
    viewModel = new MainViewModel()
}

export function showTemperatureChart() {
    navigationModule.navigate({
        moduleName: Views.temperatureChart,
        backstackVisible: true
    })
}

export function navigatingFrom() {
    console.log('main navigating from.....')
}