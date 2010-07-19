var buttonSaveName = new String("Save");
var buttonCancelName = new String("Cancel");
var buttonRestoreDefaultName = new String("RestoreDefault");

/**
 *  Tracks a single button click using Google Analytics.  You can use the _trackEvent command
 *  to track user interactions with different parts of your extension.
 **/
function trackButton(button_id) {
_gaq.push(['_trackEvent', 'button' + button_id, 'clicked']);
};

var saveButton;
var saveStatus;
var defaultCity;

var cityNameArray;
var cityDateArray;

cityNameArray = new Array();
cityNameArray['sydney_wave'] = "Google Sydney, Australia - Wave";
cityNameArray['sydney_apps'] = "Google Sydney, Australia - Apps";
cityNameArray['sydney_chrome'] = "Google Sydney, Australia - Chrome";
cityNameArray['sydney_social'] = "Google Sydney, Australia - Social";
cityNameArray['sydney_geo'] = "Google Sydney, Australia - Geo";
cityNameArray['israel'] = "Airport City, Israel - Chrome";
cityNameArray['manila'] = "Manila, Philippines";
cityNameArray['singapore'] = "Singapore, Singapore";
cityNameArray['kuala_lumpur'] = "Kuala Lumpur, Malaysia";

cityDateArray = new Array();
cityDateArray['sydney_wave'] = new Date("June 28, 2010 00:10:00");
cityDateArray['sydney_apps'] = new Date("June 29, 2010 00:10:00");
cityDateArray['sydney_chrome'] = new Date("June 30, 2010 00:10:00");
cityDateArray['sydney_social'] = new Date("July 1,2010 00:10:00");
cityDateArray['sydney_geo'] = new Date("July 2, 2010 00:10:00");
cityDateArray['israel'] = new Date("June 29, 2010 00:09:00");
cityDateArray['manila'] = new Date("July 6, 2010 00:08:30");
cityDateArray['singapore'] = new Date("July 9, 2010 00:08:30");
cityDateArray['kuala_lumpur'] = new Date("July 16, 2010 00:08:30");

function init()
{
	saveButton = document.getElementById("buttonSave");
	saveStatus = document.getElementById("saveStatus");
	defaultCity = "kuala_lumpur";
	defaultCityDate = new Date("July 16,2010 00:08:30");
}

function loadOptions()
{
	init();
	var favCity = localStorage["favCity"];
	var favCityDate = localStorage["favCityDate"];

	if (favCity == undefined || (favCity != "sydney_wave"
		&& favCity != "sydney_apps"
		&& favCity != "sydney_chrome"
		&& favCity != "sydney_social"
		&& favCity != "sydney_geo"
		&& favCity != "israel"
		&& favCity != "manila" 
		&& favCity != "singapore" 
		&& favCity != "kuala_lumpur"
		)
	)
	{
		favCity = defaultCity;
		favCityDate = defaultCityDate;
	}

	var selectedCity = document.getElementById("cityComboBox");
	for (var i = 0; i < selectedCity.children.length; i++)
	{
		var child = selectedCity.children[i];
		if (child.value == favCity)
		{
			child.selected = "true";
			break;
		}
	}
	
	var bgPage = chrome.extension.getBackgroundPage();
	if(bgPage.getNotifierEnabled())
	{
		checkboxEnableDesktopNotification.checked = true;
	}
	else
	{
		checkboxEnableDesktopNotification.checked = false;
	}
	
	markClean();
	hideStuff("saveStatus");
}

function saveOptions()
{
	var select = document.getElementById("cityComboBox");
	var cityNameIndex = select.children[select.selectedIndex].value;
	localStorage["favCity"] = cityNameIndex;
	localStorage["favCityDate"] = cityDateArray[cityNameIndex];
	markClean();
}

function eraseOptions()
{
	localStorage.removeItem("favCity");
	localStorage.removeItem("favCityDate");
	favCity = defaultCity;
	favCityDate = defaultCityDate;
	moveToKualaLumpur();
	location.reload();
	markClean();
}

function markDirty()
{
  saveButton.disabled = false;
  hideStuff("saveStatus");
}

function markClean()
{
  saveButton.disabled = true;
  showStuff("saveStatus");
}

function showStuff(id)
{
	document.getElementById(id).style.display = 'block';
}

function hideStuff(id)
{
	document.getElementById(id).style.display = 'none';
}

function enableDesktopNotification()
{
	checkboxEnableDesktopNotification = document.getElementById("checkboxEnableDesktopNotification");
	var bgPage = chrome.extension.getBackgroundPage();
	if(checkboxEnableDesktopNotification.checked)
	{
		bgPage.setNotifierEnabled(true);
	}
	else
	{
		bgPage.setNotifierEnabled(false);
	}
}

function checkDesktopNotification()
{
	checkboxEnableDesktopNotification = document.getElementById("checkboxEnableDesktopNotification");
	var bgPage = chrome.extension.getBackgroundPage();
	if(checkboxEnableDesktopNotification.checked)
	{
		bgPage.setNotifierEnabled(true);
	}
	else
	{
		bgPage.setNotifierEnabled(false);
	}
}

