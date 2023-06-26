/*
let myPort = browser.runtime.connect({name:"port-from-cs"});
myPort.postMessage({greeting: "hello from content script"});

myPort.onMessage.addListener((m) => {
  console.log("In content script, received message from background script: ");
  console.log(m.greeting);
});

document.body.addEventListener("click", () => {
  myPort.postMessage({greeting: "they clicked the page!"});
});

let portFromCS;

function connected(p) {
  portFromCS = p;
  portFromCS.postMessage({greeting: "hi there content script!"});
  portFromCS.onMessage.addListener((m) => {
    portFromCS.postMessage({greeting: `In background script, received message from content script: ${m.greeting}`});
  });
}

browser.runtime.onConnect.addListener(connected);

browser.browserAction.onClicked.addListener(() => {
  portFromCS.postMessage({greeting: "they clicked the button!"});
});
*/

chrome.tabs.create({url: 'moz-extension://77602a7f-c52f-45d7-ba64-064dea972337/content/saline.html'});
// Firefox: Opens moz-extension://[guid]/html/newpage.htm