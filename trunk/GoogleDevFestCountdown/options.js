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
cityNameArray['saint_petersburg'] = "St. Petersburg, Russia";
cityNameArray['mexico_city'] = "Mexico City, Mexico";
cityNameArray['bangalore'] = "Bangalore, India";
cityNameArray['hyderabad'] = "Hyderabad, India";
cityNameArray['manila'] = "Manila, Philippines";
cityNameArray['chiang_mai'] = "Chiang Mai, Thailand";
cityNameArray['kuala_lumpur'] = "Kuala Lumpur, Malaysia";
cityNameArray['singapore'] = "Singapore, Singapore";
cityNameArray['jakarta'] = "Jakarta, Indonesia";
cityNameArray['paris'] = "Paris, France";
cityNameArray['barcelona'] = "Barcelona, Spain";

cityDateArray = new Array();
cityDateArray['saint_petersburg'] = new Date("May 25, 2011 00:10:00");
cityDateArray['mexico_city'] = new Date("August 9, 2011 00:10:00");
cityDateArray['bangalore'] = new Date("September 15, 2011 00:08:30");
cityDateArray['hyderabad'] = new Date("September 17, 2011 00:08:30");
cityDateArray['manila'] = new Date("September 19, 2011 00:08:30");
cityDateArray['chiang_mai'] = new Date("September 24, 2011 00:08:30");
cityDateArray['kuala_lumpur'] = new Date("September 29, 2011 00:08:30");
cityDateArray['singapore'] = new Date("November 12, 2011 00:08:30");
cityDateArray['jakarta'] = new Date("November 16, 2011 00:08:30");
cityDateArray['paris'] = new Date("October 20, 2011 00:08:30");
cityDateArray['barcelona'] = new Date("November 8, 2011 00:08:30");

function init()
{
	saveButton = document.getElementById("buttonSave");
	saveStatus = document.getElementById("saveStatus");
	defaultCity = "kuala_lumpur";
	defaultCityDate = new Date("September 29, 2011 00:08:30");
}

function loadOptions()
{
	init();
	var favCity = localStorage["favCity"];
	var favCityDate = localStorage["favCityDate"];

	if (favCity == undefined || (favCity != "saint_petersburg"
		&& favCity != "mexico_city"
		&& favCity != "bangalore"
		&& favCity != "hyderabad"
		&& favCity != "manila"
		&& favCity != "chiang_mai"
		&& favCity != "kuala_lumpur"
		&& favCity != "singapore"
		&& favCity != "jakarta"
		&& favCity != "paris"
		&& favCity != "barcelona"
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
	
	// var bgPage = chrome.extension.getBackgroundPage();
	// if(bgPage.getNotifierEnabled())
	// {
		// checkboxEnableDesktopNotification.checked = true;
	// }
	// else
	// {
		// checkboxEnableDesktopNotification.checked = false;
	// }
	
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

