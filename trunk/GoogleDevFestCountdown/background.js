var notifier = new Notifier();
var notifierEnabled = false;

function setNotifierEnabled(enabled)
{
	notifierEnabled = enabled;
}

function getNotifierEnabled()
{
	return notifierEnabled;
}

function updateTime()
{
	var defaultCountdownDate = new Date("September 29, 2011 00:08:30");
	var defaultCity = "kuala_lumpur";

	var favCity = localStorage["favCity"];
	var favCityDate = new Date(localStorage["favCityDate"]);
	if(favCityDate.toString() == "Invalid Date")
	{
		favCityDate = new Date("September 29, 2011 00:08:30");
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
	if(notifierEnabled)
	{
		notifier.Notify('icon48.png', 'Google DevFest Countdown', countdownText);
	}
	chrome.browserAction.setTitle({title:countdownText});
}

function updateClock()
{
	updateTime();
	//showCounter();
	animateFlip();
	showBadgeTextAnimator(localStorage["countdownText"]);
	setTimeout(updateClock,15000);
}

function showBadgeTextAnimator(displayText)
{
	var animator = new BadgeTextAnimator ( {
	text: displayText, // text to be scrolled (or animated)
	interval: 200, // the "speed" of the scrolling
	repeat: false, // repeat the animation or not
	size: 6 // size of the badge
	} );
	chrome.browserAction.setBadgeBackgroundColor({color:[255, 69, 0, 255]});
	animator.animate();
}

function showOptionsFirstTime()
{
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

