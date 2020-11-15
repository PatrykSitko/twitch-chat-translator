import { translate } from '../../tools/translator';
import { printLine } from './modules/print';

const isOnTwitchPage = window.location.hostname.includes('twitch');
let _apiKey;
chrome.runtime.onMessage.addListener(({ apiKey }) => {
  _apiKey = apiKey;
});
window.onload = () => {
  if (isOnTwitchPage) {
    setInterval(async () => {
      chrome.runtime.sendMessage({ msg: 'get api key (from content script)' });
      console.log(_apiKey);
      const chatMessages = document.getElementsByClassName('text-fragment');
      for (let chatMessage of chatMessages) {
        if (!chatMessage.getAttribute('translated')) {
          const { translation: translatedSenderMessage } = await translate(
            'english',
            'polish',
            chatMessage.innerText,
            _apiKey
          );
          chatMessage.innerText = translatedSenderMessage;
          chatMessage.setAttribute('translated', 'true');
        }
      }
    }, 100);
  }
};
//'eb933f782dmsh284070e30b3e02bp1a83c4jsnafd84ac40e6e'
