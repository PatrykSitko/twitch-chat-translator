import React, { useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.scss';

chrome.runtime.sendMessage({ msg: 'get api key' });
chrome.runtime.sendMessage({ msg: 'get translate from' });
chrome.runtime.sendMessage({ msg: 'get translate to' });
chrome.runtime.sendMessage({ msg: 'get turn translation on' });
chrome.runtime.sendMessage({
  msg: 'get turn translate messages before sending on',
});
const Popup = () => {
  const [apiKey, setApiKey] = useState(undefined);
  const [translateFrom, setTranslateFrom] = useState(undefined);
  const [translateTo, setTranslateTo] = useState(undefined);
  const [turnTranslationOn, setTurnTranslationOn] = useState(undefined);
  const [
    turnTranslateMessagesBeforeSendingOn,
    setTurnTranslateMessagesBeforeSendingOn,
  ] = useState(undefined);
  chrome.runtime.onMessage.addListener((request) => {
    if (request) {
      switch (request.msg) {
        case 'api key':
          setApiKey(request.data);
          break;
        case 'translate from':
          setTranslateFrom(request.data);
          break;
        case 'translate to':
          setTranslateTo(request.data);
          break;
        case 'turn translation on':
          setTurnTranslationOn(request.data);
          break;
        case 'turn translate messages before sending on':
          setTurnTranslateMessagesBeforeSendingOn(request.data);
          break;
        default:
          break;
      }
    }
  });

  return (
    <div className="App">
      <a
        target="_blank"
        rel="noreferrer"
        href="https://rapidapi.com/translated/api/mymemory-translation-memory"
      >
        get your api key from here
      </a>
      <input
        className="text-input api-key"
        type="text"
        value={apiKey}
        onChange={(evt) => {
          setApiKey(evt.target.value);
          chrome.runtime.sendMessage({
            from: 'twitch-chat-translator-popup',
            msg: 'save api key',
            data: evt.target.value,
          });
        }}
        placeholder="Paste your translation api key here"
      />
      <div className="translate-language-wrapper">
        <label className="translate-from" for="translate-from">
          from:
        </label>
        <input
          className="text-input"
          type="text"
          value={translateFrom}
          onChange={(evt) => {
            setTranslateFrom(evt.target.value);
            chrome.runtime.sendMessage({
              from: 'twitch-chat-translator-popup',
              msg: 'save translate from',
              data: evt.target.value,
            });
          }}
          name="translate from"
          placeholder="translate from language"
        />
      </div>
      <div className="translate-language-wrapper">
        <label className="translate-to" for="translate-to">
          to:
        </label>
        <input
          className="text-input"
          type="text"
          value={translateTo}
          onChange={(evt) => {
            setTranslateTo(evt.target.value);
            chrome.runtime.sendMessage({
              from: 'twitch-chat-translator-popup',
              msg: 'save translate to',
              data: evt.target.value,
            });
          }}
          name="translate-to"
          placeholder="translate to language"
        />
      </div>
      <div className="label-input-wrapper-1">
        <label className="turn-translation-on" for="turn-translation-on">
          turn translation on:
        </label>
        <input
          className="checkbox-input"
          type="checkbox"
          checked={turnTranslationOn}
          name="turn-translation-on"
          onChange={(evt) => {
            setTurnTranslationOn(evt.target.checked);
            chrome.runtime.sendMessage({
              from: 'twitch-chat-translator-popup',
              msg: 'save turn translation on',
              data: evt.target.checked,
            });
          }}
        />
      </div>
      <div className="label-input-wrapper-2">
        <label
          className="translate-messages-before-sending"
          for="translate-messages-before-sending"
        >
          translate messages before sending:
        </label>
        <input
          className="checkbox-input"
          type="checkbox"
          checked={turnTranslateMessagesBeforeSendingOn}
          name="translate-messages-before-sending"
          onChange={(evt) => {
            setTurnTranslateMessagesBeforeSendingOn(evt.target.checked);
            chrome.runtime.sendMessage({
              from: 'twitch-chat-translator-popup',
              msg: 'save turn translate messages before sending on',
              data: evt.target.checked,
            });
          }}
        />
      </div>
    </div>
  );
};

export default Popup;
