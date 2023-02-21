chrome.runtime.onMessage.addListener((request: Request, sender: chrome.runtime.MessageSender, sendResponse) => {
    console.log(request)
    console.log(sender)
})

export { }