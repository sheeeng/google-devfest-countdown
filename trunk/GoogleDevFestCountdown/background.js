function updateTime()
{
	var defaultCountdownDate = new Date("July 16,2010 00:08:30");
	var defaultCity = "kuala_lumpur";

	var favCity = localStorage["favCity"];
	var favCityDate = new Date(localStorage["favCityDate"]);
	if(favCityDate.toString() == "Invalid Date")
	{
		favCityDate = new Date("July 16,2010 00:08:30");
	}

	var today_value = new Date();
	var days_value = Math.floor((favCityDate-today_value)/(24*60*60*1000));
	var hours_value = Math.floor(((favCityDate-today_value)%(24*60*60*1000))/(60*60*1000));
	var minutes_value = Math.floor(((favCityDate-today_value)%(24*60*60*1000))/(60*1000))%60;
	var seconds_value = Math.floor(((favCityDate-today_value)%(24*60*60*1000))/1000)%60%60;

	if((favCityDate - today_value) > 0)
	{
		countdownText = "Google DevFest coming in " + days_value + " days, " + hours_value + " hours, " + minutes_value + " minutes, " + seconds_value + " seconds.";
	}
	else
	{
		countdownText = "Google DevFest has come!";
	}
	localStorage["countdownText"] = countdownText;
	chrome.browserAction.setTitle({title:countdownText});
}

function updateClock()
{
	updateTime();
	setTimeout(updateClock,15000);
}

function showOptionsFirstTime()
{
	//alert(localStorage.countdownText);
	if(!localStorage.countdownText)
	{
		chrome.tabs.getAllInWindow
		(undefined,
			function(tabs)
			{
				// //alert("function(tabs)\r\n tabs.length = " + tabs.length);
				// for (var i = 0, tab; tab = tabs[i]; i++)
				// {
					// var optionPage = {url:"options.html"};
					// //alert("tab[" + i + "] = " + tab.url + "\r\noptionPage.id = " + optionPage.id);
					// if (tab == optionPage)
					// {
						// alert("tab == optionPage");
						// chrome.tabs.update(tab.id, {selected: true});
						// return;
					// }
				// }
				chrome.tabs.create({url:"options.html", selected:true});
			}
		);
	}
}

