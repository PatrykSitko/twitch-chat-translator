import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request) {
    switch (request.msg) {
      case 'get api key (from content script)':
        const apiKey = await getFromStorage('api-key');
        console.log('sending api key: ' + apiKey);
        chrome.tabs.sendMessage(sender.tab.id, { apiKey });
        break;
      case 'save api key':
        chrome.storage.local.set({ 'api-key': request.data });
        break;
      case 'get api key':
        chrome.runtime.sendMessage({
          msg: 'api key',
          data: await getFromStorage('api-key'),
        });
        break;
      case 'save translate from':
        chrome.storage.local.set({ 'translate-from': request.data });
        break;
      case 'get translate from':
        chrome.runtime.sendMessage({
          msg: 'translate from',
          data: await getFromStorage('translate-from'),
        });
        break;
      case 'save translate to':
        chrome.storage.local.set({ 'translate-to': request.data });
        break;
      case 'get translate to':
        chrome.runtime.sendMessage({
          msg: 'translate to',
          data: await getFromStorage('translate-to'),
        });
        break;
      case 'save turn translation on':
        chrome.storage.local.set({
          'turn-translation-on': request.data,
        });
        break;
      case 'get turn translation on':
        chrome.runtime.sendMessage({
          msg: 'turn translation on',
          data: await getFromStorage('turn-translation-on'),
        });
        break;
      case 'save turn translate messages before sending on':
        chrome.storage.local.set({
          'turn-translate-messages-before-sending-on': request.data,
        });
        break;
      case 'get turn translate messages before sending on':
        chrome.runtime.sendMessage({
          msg: 'turn translate messages before sending on',
          data: await getFromStorage(
            'turn-translate-messages-before-sending-on'
          ),
        });
        break;
      default:
        break;
    }
  }
});

async function getFromStorage(key) {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (resultSet) => {
      resolve(resultSet[key]);
    });
  });
}
// window.onload = () => {
//   chrome.storage.local.get(
//     [
//       'api-key',
//       'translate-from',
//       'translate-to',
//       'turn-translation-on-and-off',
//       'turn-translate-messages-before-sending-on-and-off',
//     ],
//     (resultSet) => {
//       chrome.tabs.sendMessage();
//     }
//   );
// };
// if (request.msg == 'Text field changed') {
//   // do cool things with the request then send response
//   // ...
//   console.log(sender);
//   sendResponse({ sender: 'parser.js', data: 'parsedTextFieldContent' }); // This response is sent to the message's sender
// }
