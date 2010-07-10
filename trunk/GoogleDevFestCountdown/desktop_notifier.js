/*
 * Mohit Muthanna
 * Desktop Notification API Demo.
 * http://0xfe.blogspot.com/2010/04/desktop-notifications-with-webkit.html
 *
 * Gecko Tang (http://twitter.com/geckotang/)
 * webkitNotifications Demo
 * http://gecko.hp2.jp/chrome_notify/
 */

var notifyCount = 0;
 
function Notifier() {}

// Returns "true" if this browser supports notifications.
Notifier.prototype.HasSupport = function() {
  if (window.webkitNotifications) {
	return true;
  } else {
	return false;
  }
}

// Request permission for this page to send notifications. If allowed,
// calls function "cb" with true.
Notifier.prototype.RequestPermission = function(cb) {
  window.webkitNotifications.requestPermission(function() {
	if (cb) { cb(window.webkitNotifications.checkPermission() == 0); }
  });
}

// Popup a notification with icon, title, and body. Returns false if
// permission was not granted.
Notifier.prototype.Notify = function(icon, title, body) {
  if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
	var popup = window.webkitNotifications.createNotification(
	icon, title, body);
	if(notifyCount > 0)
	{
		return; //show only one notification at one time
	}
	notifyCount++;
	popup.show();
	setTimeout(function(){ //automatically close after 5 seconds
      popup.cancel();
	  notifyCount--;
    },5000);
	return true;
  }
  return false;
}