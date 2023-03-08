import React from 'react';
import ReactDOM from 'react-dom/client';
import './content.css';
import { Popup } from '../popup/popup';

function toggle(): void {
  const root = document.getElementById('curr-exchange-root');

  if (root) {
    root.remove();
  } else {
    const app = document.createElement('div');
    app.id = 'curr-exchange-root';
    document.body.appendChild(app);

    const root = ReactDOM.createRoot(document.getElementById('curr-exchange-root')!);
    root.render(<Popup />);
  }
}

chrome.runtime.onMessage.addListener(function receivefunc(message: any, sender: any, sendResponse: any) {
  if (message.text === 'show__ext') {
    toggle();
  }
});
