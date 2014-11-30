/**
 * Copyright 2007 SK Communications. All rights reserved
 * @since 2007.02.14
 * @author okjungsoo
 *
 * Popup Window를 띄우는 클래스입니다.
 */
var Popup = {
	initialize: function(){
	},

	/**
	 * openWindow의 파라미터 부분을 단순화시킨 메소드입니다. 
	 * @param options url 및 name은 필수사항입니다. 
	 */
	openPopup: function(options) {
		options = Object.extend({
			'url': 'http://www.egloos.com', 
			'name': 'popup', 
			'width': 100, 
			'height': 100,
			'adjustType': false,
			'isResizable': false,
			'isScrollable': false,
			'hasStatus': false
		}, options || {});
		
		this.openWindow(
			options.url,
			options.name,
			options.width,
			options.height,
			options.adjustType,
			options.isResizable,
			options.isScrollable,
			options.hasStatus
		);
	},

	/**
	 * Parameter를 받아서 Popup창을 띄우는 메소드입니다.
	 */
	openWindow: function(winUrl, winName, winWidth, winHeight, adjustType, isResizable, isScrollable, hasStatus){
		var windowParam = this.getWindowParam(winWidth, winHeight, adjustType, isResizable, isScrollable, hasStatus );
	    newwin = window.open(winUrl, winName, windowParam);
	    return( newwin );
	},

	/**
	 * Window Feature를 정의하는 Option parameter를 생성해줍니다.
	 */
	getWindowParam: function(winWidth, winHeight, adjustType, isResizable, isScrollable, hasStatus) 	{
	    var left, top;

	    switch(adjustType) {
			case 1: //top left aligned
				left = top = 0;
				break;
			case 2: //top right aligned
				left = window.screen.availWidth - winWidth;
				top = 0;
				break;
			case 3: //centered
				left = (window.screen.availWidth - winWidth) / 2;
				top = (window.screen.availHeight - winHeight) / 2;
				break;
			case 4: //bottom left aligned
				left = 0;
				top = window.screen.availHeight - winHeight;
				break;
			case 5: //bottom right aligned
				left = window.screen.availWidth - winWidth - 8;
				top = window.screen.availHeight - winHeight;
				break;
	    }

	    var option = "";
	    if(adjustType > 0) {
	    	option = "left=" + left + ",top=" + top;
	    }

	    option = option + ",width=" + winWidth + ",height=" + winHeight;
	    option = this._addOptions(option, "resizable", isResizable);
	    option = this._addOptions(option, "scrollbars", isScrollable);
	    option = this._addOptions(option, "status", hasStatus);

	    return "toolbar=no," + option + ",directories=no,menubar=no";
	},

	_addOptions: function(optionStr, strValue, isValuePossible){
		return optionStr + "," +strValue +"=" + (this._isNegative(isValuePossible) ? "no":"yes");
	},

	_isNegative: function(value){
		return (!value) || (value == false);
	}, 
	
	/**
	 * @requires /common/BrowserInfo.js
	 * ※ ap_adjustwinh를 ap.js에서 분리해낸 메소드입니다. 
	 */
	adjustHeightOfWindow: function(_window, adjustTag, prefHeight, isResizable, isScrollable, hasStatus, addedHeight) {
	    _window.focus();
	    if(BrowserInfo.isIEAbove4 && !eval("document.images." + adjustTag)) {
	    	var width = _window.document.body.clientWidth;
	    	if(_window != self) {
	    		width += 12;
	    	}
	    	var height = _window.document.body.clientHeight;
	    	if(_window != self) {
	    		height += 31;
	    	}
		    var offsetTop = eval("document.images." + adjustTag + ".offsetTop");
		    
		    if(height != offsetTop ) {
			    newWidth = width + 10;
			    if(isResizable == true) {
			    	newWidth += (18);
			    }
			    if(isScrollable == true) {
			    	newWidth += (16);
			    }
			    
			    newHeight = offsetTop + addedHeight;
			    if(isResizable == true) {
			    	newHeight += 2;
			    }

			    if(newHeight >= window.screen.availHeight) {
			    	newHeight = Math.min( newHeight, height );
			    }
			    if(prefHeight > 0) {
			    	newHeight = Math.min(prefHeight, newHeight);
			    }
			    self.window.resizeTo(newWidth, newHeight);
		    }
	    }
	}
};

Popup.initialize();