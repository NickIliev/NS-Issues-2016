let applicationModule = require('application')
import * as viewsModule from './utils/views'

applicationModule.onLaunch = function (context: any) {

    applicationModule.mainEntry = {
        moduleName: viewsModule.Views.main,
        backstackVisible: true,
        context: null
    }
}

applicationModule.start()