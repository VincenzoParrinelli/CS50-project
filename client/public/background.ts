chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed.')
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request)
    console.log(sender)
    console.log("first")

    sendResponse("ewe")

    return true
})

export { }