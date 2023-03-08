import React from 'react';

chrome.runtime.onInstalled.addListener(() => {
console.log('hello i am background');
});

chrome.action.onClicked.addListener(sendfunc);

function sendfunc(tab: any) {
    let msg: {text: string} = {text: "show__ext"};
    chrome.tabs.sendMessage(tab.id, msg);
}