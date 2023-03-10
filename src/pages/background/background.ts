import React from 'react';
import { ApiService } from '../../utils/api';

type Ratio = {
  [key: string]: {
    base: string;
    date: string;
    rates: {
      [key: string]: number;
    };
    success: boolean;
    timestamp: number;
  };
};

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({ showstatus: false });
  getCurrencyCodes();
});

chrome.action.onClicked.addListener(handleClick);

chrome.runtime.onMessage.addListener(handleMessage);

chrome.storage.onChanged.addListener(handleStorageChange);

function getInitialStatus() {
  console.log('getting initial ext status');
  chrome.storage.local.get('showstatus').then((res) => {
    if (res.showstatus) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currTab = tabs[0];
        if (currTab) {
          chrome.tabs.sendMessage(currTab.id!, { text: 'show_ext' });
        }
      });
    }
  });
}

function getCurrencyRate(src: string, sendResponse: (response?: any) => void): void {
  console.log('getting currency rates');
  ApiService.getRatio(src)
    .then((data) => {
      chrome.storage.local.get('ratios').then((result) => {
        let newRatios: Ratio[];
        if (result.ratios) {
          newRatios = [...result.ratios, { [src]: data }];
        } else {
          newRatios = [{ [src]: data }];
        }
        sendResponse({ ratios: [...newRatios] });
        chrome.storage.local.set({ ratios: [...newRatios] });
      });
    })
    .catch((err) => console.log(err));
}

function getCurrencyCodes(sendResponse?: (response?: any) => void) {
  console.log('getting currency codes');
  ApiService.getCodes()
    .then((data) => {
      if (data.symbols) {
        chrome.storage.local.set({ codesList: data.symbols });
        if (sendResponse) {
          sendResponse({ codesList: data.symbols });
        }
      }
    })
    .catch((err) => console.log(err));
}

function handleClick(tab: chrome.tabs.Tab) {
  console.log('extension clicked');
  chrome.storage.local.get('showstatus').then((res) => {
    chrome.storage.local.set({ showstatus: !res.showstatus });
  });
}

function handleMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) {
  console.log(`message received:\n`);
  console.log(message);

  if (message.text === 'request_ext_status') getInitialStatus();
  else if (message.method === 'getRate') getCurrencyRate(message.value, sendResponse);
  else if (message.method === 'getCodes') getCurrencyCodes(sendResponse);

  return true;
}

function handleStorageChange(changes: { [key: string]: chrome.storage.StorageChange }) {
  console.log('storage change handle');
  if (changes.showstatus) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currTab = tabs[0];
      if (currTab) {
        chrome.tabs.sendMessage(currTab.id!, { text: changes.showstatus.newValue ? 'show_ext' : 'hide_ext' });
      }
    });
  }
  return true;
}
