import React from 'react';
import { ApiService } from '../../utils/api';
import { MessageType, TAllMessage, TRatio } from '../../types/types';

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

function getCurrencyRate(currencyName: string, ratiosArray: TRatio[], sendResponse?: (response?: any) => void): void {
  console.log('getting currency rates');
  ApiService.getRatio(currencyName)
    .then((data) => {
      let newRatios: TRatio[] = [...ratiosArray, { [currencyName]: data }];
      if (sendResponse) sendResponse({ ratios: [...newRatios] });

      chrome.storage.local.set({ ratios: [...newRatios] });
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

function handleMessage(
  message: TAllMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) {
  console.log(`message received:\n`);
  console.log(message);

  switch (message.type) {
    case MessageType.getRate:
      chrome.storage.local.get('ratios').then((result) => {
        if (!result.ratios) {
          getCurrencyRate(message.value, [], sendResponse);
        } else if (result.ratios && !result.ratios.some((item: TRatio) => item[message.value] !== undefined)) {
          getCurrencyRate(message.value, result.ratios, sendResponse);
        }
      });
      break;

    case MessageType.getCodes:
      getCurrencyCodes(sendResponse);
      break;

    case MessageType.getStatus:
      getInitialStatus();
      break;

    case MessageType.updateRates:
      chrome.storage.local.get('ratios').then((result) => {
        if (!result.ratios) {
          return;
        } else {
          const keysArray = result.ratios.map((obj: TRatio) => Object.keys(obj)[0]);
          const uniqueKeys = new Set(keysArray);
          const unique: any = [...uniqueKeys];
          const resultArr: TRatio[] = [];
          unique.forEach((sourceCurrency: string) => getCurrencyRate(sourceCurrency, resultArr));
          sendResponse(resultArr);
        }
      });
      break;
    default:
      return;
  }

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
