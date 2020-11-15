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
        chrome.tabs.sendMessage(sender.tab.id, {
          apiKey: await getFromStorage('api-key'),
        });
        return true;
      case 'translate from':
        chrome.storage.local.set({ 'translate-from': request.data });
        break;
      case 'translate to':
        chrome.storage.local.set({ 'translate-to': request.data });
        break;
      case 'turn translation on and off':
        chrome.storage.local.set({
          'turn-translation-on-and-off': request.data,
        });
        break;
      case 'turn translate messages before sending on and off':
        chrome.storage.local.set({
          'turn-translate-messages-before-sending-on-and-off': request.data,
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
