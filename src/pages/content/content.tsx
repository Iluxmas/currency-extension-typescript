import React from 'react';
import ReactDOM from 'react-dom/client';
import root from 'react-shadow';

import './content.css';
import { MessageType } from '../../types/types';
import { Popup } from '../popup/popup';

chrome.runtime.sendMessage({ type: MessageType.getStatus });

const Injection = () => (
  <root.div>
    <Popup />
  </root.div>
);

function toggleExtensionDisplay(flag: boolean): void {
  if (flag) {
    const app = document.createElement('div');
    app.id = 'curr-exchange-root';
    document.body.appendChild(app);

    const root = ReactDOM.createRoot(document.getElementById('curr-exchange-root')!);
    root.render(<Injection />);
  } else {
    const root = document.getElementById('curr-exchange-root')!;
    root.remove();
  }
}

chrome.runtime.onMessage.addListener(function receivefunc(message: any, sender, sendResponse) {
  if (message.text === 'show_ext') {
    toggleExtensionDisplay(true);
  } else if (message.text === 'hide_ext') {
    toggleExtensionDisplay(false);
  }
});
