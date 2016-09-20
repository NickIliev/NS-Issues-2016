import { FirstComponent, SecondComponent } from "./app.component"

export const routes = [
    { path: "", redirectTo: "/first", terminal: true },
    { path: "first", component: FirstComponent },
    { path: "second", component: SecondComponent },
];