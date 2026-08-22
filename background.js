function openRutrackerSearch(text) {
  const query = encodeURIComponent(text);
  const url = `https://rutracker.org/forum/tracker.php?nm=${query}`;
  chrome.tabs.create({ url });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchRutracker",
    title: "Найти на Rutracker",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "searchRutracker" && info.selectionText) {
    openRutrackerSearch(info.selectionText);
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "search-rutracker") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => window.getSelection().toString()
      }, (results) => {
        const text = results?.[0]?.result;
        if (text) {
          openRutrackerSearch(text);
        }
      });
    });
  }
});
