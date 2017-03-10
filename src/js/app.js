var app = (function(window, undefined) {
	"use strict";
           
	var Settings = {
		SMALL: 0,
		MEDIUM: 40,
		LARGE: 64,
		menuEventAdded: false,
    touchSupported: ('ontouchstart' in window),
    pointerSupported: ('pointerdown' in window)
	}
  
	var El = {
    topbar: document.getElementById("topbar"),
		menuTrigger: document.getElementById("menu-trigger"),
    dropdownToggles: document.querySelectorAll(".dropdown-trigger") 
  }
  
	var breakpoint = {};  
	breakpoint.refreshValue = function () {
    this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
	};

var clickEventType = ('ontouchstart' in window ? 'touchend' : 'click');  
  
	////////////////////
	// HELPER METHODS //
	////////////////////
  var skipClickDelay = function(e) {
    e.preventDefault();
    e.target.click();
  }; 
  
	var getWindowSizeInRems = function() {
		var htmlTag = document.documentElement;
		var htmlStyle = window.getComputedStyle(htmlTag);
		var htmlFontSize = htmlStyle.getPropertyValue("font-size");
		return window.innerWidth / parseFloat(htmlFontSize);	
	}	 
  
	var hasClass = function(el, className) {
	  if (el.classList)
	    return el.classList.contains(className)
	  else
	    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
	}
  
	var addClass = function(el, className) {
	  if (el.classList)
	    el.classList.add(className)
	  else if (!hasClass(el, className)) el.className += " " + className
	}
  
	var removeClass = function(el, className) {
	  if (el.classList)
	    el.classList.remove(className)
	  else if (hasClass(el, className)) {
	    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
	    el.className=el.className.replace(reg, ' ')
	  }
	}	  
  
  var toggleClass = function(el, className) {    
    if (!el || !className) {
      return;
    }    
    if (hasClass(el, className)) {
      removeClass(el, className);  
      return;
    } else if (!hasClass(el, className)) {
      addClass(el, className);
      return;
    }
  } 
  
  var hasParentClass = function(el, className) {
    if (!el || !className) {
      return;
    }    	
  	if(el.className.split(" ").indexOf(className) >= 0) {
  		return true;
  	} else {
  		return el.parentNode && hasParentClass(el.parentNode, className);
  	}
  }
	
	/* DeBounce Method (borrowed from UnderscoreJS)
	/* This limits how many times a function can fire in rapid succession
	/* (such as when the browser window is resized)
	/* Source: https://davidwalsh.name/javascript-debounce-function */
	var debounce = function(func, wait, immediate) {
		var timeout;
		return function() {			
			var context = this;
			var args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};


	/////////////////////
	////// EVENTS ///////
	/////////////////////
	
	/* Create our own 'safe' event override - which will be used to create a safe window resize event
	/* Source: http://stackoverflow.com/questions/641857/javascript-window-resize-event */
	var addEvent = function(object, type, callback) {
	  if (object == null || typeof(object) == 'undefined') return;
	  if (object.addEventListener) {
	      object.addEventListener(type, callback, false);
	  } else if (object.attachEvent) {
	      object.attachEvent("on" + type, callback);
	  } else {
	      object["on"+type] = callback;
	  }
	};	

	var setResizeEvents = debounce(function() {
		var responsiveNavEventsAdded = false;
		var oldBreakpoint = breakpoint.value;
		breakpoint.refreshValue();
		
		if (oldBreakpoint !== breakpoint.value) {
			closeResponsiveNavDropdowns();
		}

		//setResponsiveNavEvents();	
		if (breakpoint.value !== "mobile") {

		}
		if(breakpoint.value === "mobile") {
			//console.log("mobile");
		} else if (breakpoint.value === "tablet") {
			removeClass(El.topbar, "open");
		} else if (breakpoint.value === "desktop") {
			removeClass(El.topbar, "open");
		}

	}, 250);

	/////////////////////
	//// DOM METHODS ////
	/////////////////////
  
	/**** Setup Responsive Nav ****/
	var setResponsiveNavEvents = function() {
		El.menuTrigger.addEventListener('click', function() {
		  if (topbar.classList.contains("open")) {
	  		removeClass(El.topbar, "open");
	    } else {
	    	addClass(El.topbar, "open");
	    }	
		});
	}
  
 var toggleDropdowns = function(e) {
   console.log("triggered");
   e.preventDefault();
   var thisContent = e.target.nextElementSibling;
   var thisTrigger = e.target;

   // document.getElementById('myElement').style.display = 'block'   
   closeResponsiveNavDropdowns();
   toggleClass(thisTrigger, "is-expanded");
 };
  
  var setDropdowns = function() {
    var len = El.dropdownToggles.length; 
    for (var i=0; i<len; i++) {
      if (Settings.touchSupported) {
        El.dropdownToggles[i].addEventListener('touchstart', skipClickDelay, false);
      }
      if (Settings.pointerSupported) {
        El.dropdownToggles[i].addEventListener('pointerdown', skipClickDelay, false);
      }
      El.dropdownToggles[i].addEventListener('click', toggleDropdowns, false);
    } 
  }
  var closeResponsiveNavDropdowns = function() {
		for(var i=0; i<=El.dropdownToggles.length; i++) {
			if(hasParentClass(El.dropdownToggles[i], "topbar")) {
				removeClass(El.dropdownToggles[i], "is-expanded");
			}				
		}  	
  }
	// Reset responsive nav when browser is resized
  var init = function() { 
		/* Force initial resize event to fire, setting up our responsive-based methods */
		breakpoint.refreshValue();
		addEvent(window, "resize", setResizeEvents);
		setResizeEvents();
		setResponsiveNavEvents();	
    setDropdowns();
    closeResponsiveNavDropdowns();
  }

  return {
    init: init
  }
})(window);

document.addEventListener("DOMContentLoaded", function(event) { 
	app.init();
});