chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.audible) {
        chrome.action.setBadgeText({ text: "🔊", tabId });
    }
});
