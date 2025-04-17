document.addEventListener("DOMContentLoaded", async function () {
    const tabsList = document.getElementById("tabs-list");

    // Get all active audio tabs
    let tabs = await chrome.tabs.query({ audible: true });

    tabs.forEach(tab => {
        let div = document.createElement("div");
        div.className = "tab";
        div.innerHTML = `
            <strong>${tab.title}</strong>
            <input type="range" min="0" max="1" step="0.1" value="1" data-tab="${tab.id}">
        `;
        tabsList.appendChild(div);
    });

    // Listen for volume slider changes
    tabsList.addEventListener("input", (event) => {
        let tabId = event.target.getAttribute("data-tab");
        let volume = event.target.value;
        chrome.scripting.executeScript({
            target: { tabId: parseInt(tabId) },
            func: adjustVolume,
            args: [volume]
        });
    });
});

// Function to adjust volume in the tab
function adjustVolume(volume) {
    let videos = document.querySelectorAll("video, audio");
    videos.forEach(video => video.volume = volume);
}
