import { translate } from '../../tools/translator';
import { printLine } from './modules/print';

const isOnTwitchPage = window.location.hostname.includes('twitch');

window.onload = () => {
  if (isOnTwitchPage) {
    setInterval(async () => {
      const chatMessages = document.getElementsByClassName(
        'chat-line__message'
      );
      for (let chatMessage of chatMessages) {
        if (!chatMessage.getAttribute('translated')) {
          const innerText = chatMessage.innerText;
          const senderName = innerText.substring(0, innerText.indexOf(':') + 1);
          const senderMessage = innerText.substring(
            innerText.indexOf(':'),
            innerText.length
          );
          const { translation: translatedSenderMessage } = await translate(
            'korean',
            'polish',
            senderMessage
          );
          chatMessage.innerText = senderName + ': ' + translatedSenderMessage;
          chatMessage.setAttribute('translated', 'true');
        }
      }
    }, 100);
  }
};
