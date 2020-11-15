import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.scss';

const Popup = () => {
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
        onChange={(evt) => {
          chrome.runtime.sendMessage({
            from: 'twitch-chat-translator-popup',
            msg: 'api key',
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
          onChange={(evt) => {
            chrome.runtime.sendMessage({
              from: 'twitch-chat-translator-popup',
              msg: 'translate from',
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
          onChange={(evt) => {
            chrome.runtime.sendMessage({
              from: 'twitch-chat-translator-popup',
              msg: 'translate to',
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
          name="turn-translation-on"
          onChange={(evt) => {
            chrome.runtime.sendMessage({
              from: 'twitch-chat-translator-popup',
              msg: 'turn translation on and off',
              data: evt.target.value,
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
          name="translate-messages-before-sending"
          onChange={(evt) => {
            chrome.runtime.sendMessage({
              from: 'twitch-chat-translator-popup',
              msg: 'turn translate messages before sending on and off',
              data: evt.target.value,
            });
          }}
        />
      </div>
    </div>
  );
};

export default Popup;
