import { ApiService } from '../../utils/api';
import { MessageType, TAllMessage, TRatio } from '../../types/types';

chrome.runtime.onInstalled.addListener(function () {
  getCurrencyCodes();
});

chrome.runtime.onMessage.addListener(handleMessage);

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

