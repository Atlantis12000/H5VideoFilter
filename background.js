var val = 0;
var state = false;
var manual = null;

chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
	updateOnChanging();
});

chrome.webNavigation.onCompleted.addListener(function (details) {
	updateOnChanging();
});

//new
chrome.tabs.onActivated.addListener(function(activeInfo) {
	if (localStorage.getItem("youtube_filter_selected_index") !== undefined && localStorage.getItem("youtube_filter_selected_index") !== null)
		val = localStorage.getItem("youtube_filter_selected_index");
	if (localStorage.getItem("youtube_video_filters_manual") !== undefined && localStorage.getItem("youtube_video_filters_manual") !== null)
			manual = localStorage.getItem("youtube_video_filters_manual");
	chrome.tabs.sendMessage(activeInfo.tabId, { "youtube_filter_selected_index": val,"youtube_video_filters_manual": manual});
});

function updateOnChanging() {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		if (localStorage.getItem("youtube_filter_selected_index") !== undefined && localStorage.getItem("youtube_filter_selected_index") !== null)
			val = localStorage.getItem("youtube_filter_selected_index");
		if (localStorage.getItem("youtube_darkmode_clicked") !== undefined && localStorage.getItem("youtube_darkmode_clicked") !== null)
			state = localStorage.getItem("youtube_darkmode_clicked");
		if (localStorage.getItem("youtube_video_filters_manual") !== undefined && localStorage.getItem("youtube_video_filters_manual") !== null)
			manual = localStorage.getItem("youtube_video_filters_manual");
		if(tabs[0]!==null && tabs[0]!==undefined)
			chrome.tabs.sendMessage(tabs[0].id, { "youtube_filter_selected_index": val, "youtube_darkmode_clicked": state , "youtube_video_filters_manual": manual});
	});
}

function onMsg(request){
}