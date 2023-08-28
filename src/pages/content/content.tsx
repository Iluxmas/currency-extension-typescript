import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { MessageType } from '../../types/types';
import { Popup } from '../popup/popup';

const ExtensionContainer = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
  background-color: #fff;
  padding: 14px;
  border: 1px solid #999;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100000;
`;

function toggleExtensionDisplay(flag: boolean): void {
  if (flag) {
    const app = document.createElement('div');
    app.id = 'curr-exchange-root';
    document.body.appendChild(app);

    const root = ReactDOM.createRoot(document.getElementById('curr-exchange-root')!);
    // root.render(<Injection />);
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
