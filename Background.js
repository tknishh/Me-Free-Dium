
chrome.action.onClicked.addListener(onClickedBA)
function onClickedBA(){
	chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    	let url = tabs[0].url;
    	console.log(url)
    	chrome.windows.create({"url": url, "incognito": true});
	});
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "open_in_incognito") {
            onClickedBA()
		}
    }
);