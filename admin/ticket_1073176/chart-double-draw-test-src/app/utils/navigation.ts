/*
This small utility module will handle the navigation between pages
*/

import * as frameModule from 'ui/frame';

export function navigate(navigationEntry: frameModule.NavigationEntry) {
    let topmost = frameModule.topmost();
    topmost.navigate(navigationEntry);
}

export function goBack() {
    let topmost = frameModule.topmost();
    topmost.goBack();
}

export function getCurrentPageId() {
    let topmost = frameModule.topmost();
    return topmost.currentEntry.moduleName
}