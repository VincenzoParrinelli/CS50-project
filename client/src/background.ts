
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request)


    // Must return true or it wouldn't work
    return true
})

export default chrome