# Currency exchange extension for Chrome

This extension allows you to add your favorite Currency Pairs and convert it quickly.
Extension uses [Fixer Api](https://apilayer.com/marketplace/fixer-api) to get rates data. You need to get your own apikey and save it in '/utils' folder to make it correctly import to 'api.js' file

Features:

- Add/deleting currency pairs
- Converting values
- Switching pairs
- Update all ratios
- Data stored in chrome storage

Preview

![Demo1](https://github.com/Iluxmas/currency-extension-typescript/blob/main/public/demo1.gif)

## Install

To install necessary libraries:

```bash
npm i
```

To make a build:

```bash
npm run build
```

To load unpacked extension to Chrome follow guide [developer.chrome.com/docs/extensions/mv2/getstarted/](https://developer.chrome.com/docs/extensions/mv2/getstarted/)

**Things to improve**:

- [x] "Update rate" button to get fresh ratios (requests to API are limited to 100 per month)
- [x] Add Styled components
