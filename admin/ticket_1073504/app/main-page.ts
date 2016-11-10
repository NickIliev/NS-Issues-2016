import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { ViewModel } from './main-view-model';
import { RadListView } from "nativescript-telerik-ui/listview";
import { Color } from "color";

export function onLoaded(args: EventData) {
  let page = <Page>args.object;
  page.bindingContext = new ViewModel();

  var lv = page.getViewById("myListView");    
  lv.android.setFastScrollAlwaysVisible(true);
}