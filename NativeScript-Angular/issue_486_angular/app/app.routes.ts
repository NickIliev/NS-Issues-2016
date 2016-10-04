import { SecondaryComponent } from "./secondary.component";
import { ThirdComponent } from "./third.component";

import { FirstComponent } from "./first.component";

export var routableComponents = [];

export const routes = [
    routeEntry({ path: "", component: FirstComponent, data: { title: "FIRST" } }),,
    routeEntry({ path: "secondary", component: SecondaryComponent, data: { title: "Secondary" } }),
    routeEntry({ path: "third", component: ThirdComponent, data: { title: "Third" } })
];

function routeEntry(data) {
    routableComponents.push(data.component)
    return data;
}
