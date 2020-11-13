import { translate } from '../../tools/translator';
import { printLine } from './modules/print';

const isOnTwitchPage = window.location.hostname.includes('twitch');

window.onload = () => {
  if (isOnTwitchPage) {
    setInterval(async () => {
      const chatMessages = document.getElementsByClassName('text-fragment');
      for (let chatMessage of chatMessages) {
        if (!chatMessage.getAttribute('translated')) {
          const { translation: translatedSenderMessage } = await translate(
            'korean',
            'polish',
            chatMessage.innerText
          );
          chatMessage.innerText = translatedSenderMessage;
          chatMessage.setAttribute('translated', 'true');
        }
      }
    }, 100);
  }
};
