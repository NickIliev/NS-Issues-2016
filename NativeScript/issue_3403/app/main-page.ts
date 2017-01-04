import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as connectivity from "connectivity";

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;

    connectivity.startMonitoring(function onConnectionTypeChanged(newConnectionType: number) {
        switch (newConnectionType) {
            case connectivity.connectionType.none:
                //console.log("Connection type changed to none.");
                break;
            case connectivity.connectionType.wifi:
                //console.log("Connection type changed to WiFi.");
                break;
            case connectivity.connectionType.mobile:
                //console.log("Connection type changed to mobile.");
                break;
        }
    });

}


export function checkConnection() {
    var connectionType = connectivity.getConnectionType();
    switch (connectionType) {
        case connectivity.connectionType.none:
            console.log("No connection");
            break;
        case connectivity.connectionType.wifi:
            console.log("WiFi connection");
            break;
        case connectivity.connectionType.mobile:
            console.log("Mobile connection");
            break;
    }
}