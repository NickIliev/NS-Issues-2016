import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { ActivityIndicator } from 'ui/activity-indicator';

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
  
  var activityindicator = <ActivityIndicator>page.getViewById("ai");

  var params = new android.widget.LinearLayout.LayoutParams(300, 10);
  activityindicator.android.setLayoutParams(params);
}