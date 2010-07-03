var animationFrames = 36;
var animationSpeed = 10; // ms
var canvas;
var canvasContext;
var loggedInImage;
var pollIntervalMin = 1000 * 60;  // 1 minute
var pollIntervalMax = 1000 * 60 * 60;  // 1 hour
var requestFailureCount = 0;  // used for exponential backoff
var requestTimeout = 1000 * 2;  // 5 seconds
var rotation = 0;
var unreadCount = -1;
var loadingAnimation = new LoadingAnimation();

var RED = [208, 0, 24, 255];
var BLUE = [0, 24, 208, 255];
var GRAY = [190, 190, 190, 230];

//==============================================================================
// A "loading" animation displayed while we wait for initializatoin.
// This animates the badge text with a dot that cycles from left to right.
//
function LoadingAnimation() {
  this.timerId_ = 0;
  this.maxCount_ = 8;  // Total number of states in animation
  this.current_ = 0;  // Current state
  this.maxDot_ = 4;  // Max number of dots in animation
}

LoadingAnimation.prototype.paintFrame = function() {
  var text = "";
  for (var i = 0; i < this.maxDot_; i++) {
    text += (i == this.current_) ? "." : " ";
  }
  if (this.current_ >= this.maxDot_)
    text += "";

  chrome.browserAction.setBadgeText({text:text});
  this.current_++;
  if (this.current_ == this.maxCount_)
    this.current_ = 0;
}

LoadingAnimation.prototype.start = function() {
  if (this.timerId_)
    return;

  var self = this;
  this.timerId_ = window.setInterval(function() {
    self.paintFrame();
  }, 100);
}

LoadingAnimation.prototype.stop = function() {
  if (!this.timerId_)
    return;

  window.clearInterval(this.timerId_);
  this.timerId_ = 0;
}
//
//==============================================================================

function init() {
  canvas = document.getElementById('canvas');
  loggedInImage = document.getElementById('logged_in');
  canvasContext = canvas.getContext('2d');

  chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255]});
  chrome.browserAction.setIcon({path: "icon19.png"});
  loadingAnimation.start();

  startRequest();
}

function scheduleRequest() {
  var randomness = Math.random() * 2;
  var exponent = Math.pow(2, requestFailureCount);
  var delay = Math.min(randomness * pollIntervalMin * exponent,
                       pollIntervalMax);
  delay = Math.round(delay);
  window.setTimeout(startRequest, delay);
}

function startRequest() {
    loadingAnimation.stop();
    showCounter();
    scheduleRequest();
	/*
    var t=setTimeout(
	function() {
      loadingAnimation.stop();
      showCounter();
      scheduleRequest();
    }, 1000);
	*/
}

function updateUnreadCount(count) {
  if (unreadCount != count) {
    unreadCount = count;
    animateFlip();
  }
}

function ease(x) {
  return (1-Math.sin(Math.PI/2+x*Math.PI))/2;
}

function animateFlip() {
  rotation += 1/animationFrames;
  drawIconAtRotation();

  if (rotation <= 1) {
    setTimeout("animateFlip()", animationSpeed);
  } else {
    rotation = 0;
    drawIconAtRotation();
	/*
    chrome.browserAction.setBadgeText({
      text: unreadCount != "0" ? unreadCount : ""
    });
    chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255]});
	*/
  }
}

/*
function showLoggedOut() {
  unreadCount = -1;
  //chrome.browserAction.setIcon({path:"icon32.png"});
  chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
  chrome.browserAction.setBadgeText({text:"?"});
}
*/

function showCounter() {
  unreadCount = -1;
  //chrome.browserAction.setIcon({path:"icon32.png"});
  //chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
  //chrome.browserAction.setBadgeText({text:"?"});
  animateFlip();
  /*
  if(seconds_value > unreadCount)
  {
	chrome.browserAction.setBadgeBackgroundColor({color:BLUE});
	chrome.browserAction.setBadgeText({text:(seconds_value+'')});
  }
  else
  {
	chrome.browserAction.setBadgeBackgroundColor({color:GRAY});
	chrome.browserAction.setBadgeText({text:"?"});
  }
  */
 }

function drawIconAtRotation() {
  canvasContext.save();
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.translate(
      Math.ceil(canvas.width/2),
      Math.ceil(canvas.height/2));
  canvasContext.rotate(2*Math.PI*ease(rotation));
  canvasContext.drawImage(loggedInImage,
      -Math.ceil(canvas.width/2),
      -Math.ceil(canvas.height/2));
  canvasContext.restore();

  chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0,
      canvas.width,canvas.height)});
}

