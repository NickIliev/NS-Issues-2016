import { TicketViewModel } from './main-view-model';

export function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = new TicketViewModel();
}