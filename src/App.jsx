import { useState } from 'react'
import './App.css'


function App() {
  const [pageData, setPageData] = useState({ url: "", text: "" });

  const handleScan = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "scanPage" });
    });
  };

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "scannedData") {
      setPageData({ url: message.url, text: message.pageText.slice(0, 200) }); // Show first 200 chars
    }
  });

  return (
    <>
      <div className='w-[300px] p-5 flex flex-col items-center gap-10 bg-black rounded-md border-[1px] border-cyan-500'>
        <h1 className='text-3xl text-cyan-500'>PhishEye</h1>
        <button className='bg-neutral-900 text-white font-bold px-5 py-2' onClick={handleScan}>check</button>
        {pageData.url && (
          <div className="mt-4 w-full text-sm text-cyan-100">
            <p><b>URL:</b> {pageData.url}</p>
            <p><b>Text:</b> {pageData.text}...</p>
          </div>
        )}
      </div>
    </>
  )
}

export default App
