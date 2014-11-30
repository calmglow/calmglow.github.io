/**
 * Copyright 2007 SK Communications. All rights reserved
 * @since 2007.12.12
 * @author okjungsoo
 */

if(typeof(UI) == "undefined")
	UI = {};

UI.PostBox = {
 	showThumbs: function(button, event) {
		this._handleThumbs(button, event, true);
	},

	closeThumbs: function(button, event) {
		this._handleThumbs(button, event, false);
	},
	
	_handleThumbs: function(button, event, isShow) {
		Event.stop(event);
		
		button = $(button);
		var nextButton, pane = $(button.parentNode).next();
		
		if(isShow) {
			if(!pane.visible()) {
				var childs = $(pane).descendants();
				childs.each(function(node){
					if(node.nodeName == "IMG") {
						node.setAttribute("src", node.readAttribute("data-src"));
					}
				});
				pane.show();
			}
			nextButton = button.next();
		} else {
			if(pane.visible()) { 
				pane.hide();
			}
			nextButton = button.previous();
		}
		nextButton.show();
		button.hide();
	}
}