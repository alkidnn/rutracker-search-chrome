const input = document.getElementById("query");

document.getElementById("search").addEventListener("click", search);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") search();
});

// При открытии popup — забираем выделенный текст
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabs[0].id },
      function: () => window.getSelection().toString()
    },
    (results) => {
      const text = results?.[0]?.result?.trim();
      if (text) {
        input.value = text;
        input.focus();
        input.setSelectionRange(text.length, text.length);
      } else {
        input.focus();
      }
    }
  );
});

function search() {
  const text = input.value.trim();
  if (!text) return;

  const url = `https://rutracker.org/forum/tracker.php?nm=${encodeURIComponent(text)}`;
  chrome.tabs.create({ url });
}
