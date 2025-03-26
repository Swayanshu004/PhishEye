console.log("PhishEye content script loaded!");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "scanPage") {
        scanPage();
    }
});

async function scanPage() {
    const url = window.location.href; 
    const pageText = document.body.innerText.slice(0, 2000); 

    console.log("Scanning URL:", url);
    console.log("Page Text:", pageText.slice(0, 500)); 

    chrome.runtime.sendMessage({ action: "analyzePage", url, pageText });
}

