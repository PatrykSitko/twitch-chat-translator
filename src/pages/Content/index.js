import { translate } from '../../tools/translator';
import { printLine } from './modules/print';

const isOnTwitchPage = window.location.hostname.includes('twitch');
let apiKey;
let translateFrom;
let translateTo;
let turnTranslationOn;
chrome.runtime.onMessage.addListener(({ msg, data }) => {
  switch (msg) {
    case 'api key':
      apiKey = data;
      break;
    case 'translate from':
      translateFrom = data;
      break;
    case 'translate to':
      translateTo = data;
      break;
    case 'turn translation on':
      turnTranslationOn = data;
      break;
    default:
      break;
  }
});
window.onload = () => {
  if (isOnTwitchPage) {
    setInterval(async () => {
      chrome.runtime.sendMessage({
        msg: 'get turn translation on (from content script)',
      });
      if (turnTranslationOn) {
        chrome.runtime.sendMessage({
          msg: 'get api key (from content script)',
        });
        chrome.runtime.sendMessage({
          msg: 'get translate from (from content script)',
        });
        chrome.runtime.sendMessage({
          msg: 'get translate to (from content script)',
        });
        const chatMessages = document.getElementsByClassName('text-fragment');
        for (let chatMessage of chatMessages) {
          if (!chatMessage.getAttribute('translated')) {
            const { translation: translatedSenderMessage } = await translate(
              translateFrom,
              translateTo,
              chatMessage.innerText,
              apiKey
            );
            chatMessage.innerText = translatedSenderMessage;
            chatMessage.setAttribute('translated', 'true');
          }
        }
      }
    }, 100);
  }
};
//'eb933f782dmsh284070e30b3e02bp1a83c4jsnafd84ac40e6e'
