/**
 * sp.js 
 * 공감버튼 로드용 div 버전
 * 
 * 서비스에서 공감버튼을 그려주는 div 용 javascript
 * 
 * 참조설명
 * euc 버젼은 utf 버젼과 다른 점
 * 1. 화일 포멧(charset=iso-8859-1)
 * 2. cylang.src = "http://script.csp." + docDomain + ".com/js/locale/Resource.GlobalMinihp.GlobalMeTooHtml."+cultureLang+".euc.js";
 *    에 마지막에 euc.js 로 넣어줄 것
 * 3. cylang.src = "http .. 위에
 *    cylang.charset = 'euc-kr';  넣기 (src 밑이면 안됨!!!)  
 * 
 * @date	2011.10.17	
 */
//################ CyRes.js of Global Resource Common System. ###############
String.prototype.format = function(array) {
    if (array && array.length && array.length > 0) {    
        try {
            var placeHolder = "";
            var formattedString = this;
            for (var i=0;i<array.length;i++) {
                placeHolder = '{' + i + '}';
                formattedString = formattedString.replace(placeHolder, array[i]);
            }
            return formattedString;
        } catch (e) {
            return this;
        }
    }
    return this;
}


String.prototype.replaceAll = function(str1, str2) {
    var temp_str = "";
    var temp_trim = this.replace(/(^\s*)|(\s*$)/g, "");

    if (temp_trim && str1 != str2)
    {
        temp_str = temp_trim;
        while (temp_str.indexOf(str1) > -1) temp_str = temp_str.replace(str1, str2);
    }

    return temp_str;
}

var CyRes = CyRes || {}
//################ CyRes.js of Global Resource Common System. ###############


var SP_Base64 = {
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = SP_Base64._utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		}
		return output;
	},
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) { output = output + String.fromCharCode(chr2); }
			if (enc4 != 64) { output = output + String.fromCharCode(chr3); }
		}
		output = SP_Base64._utf8_decode(output);
		return output;
	},
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) { 
				utftext += String.fromCharCode(c); 
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	},
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = 0;
		var c1 = 0;
		var c2 = 0;
		var c3 = 0;

		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
};
var SPUtil = {
	addEvent: function(obj, type, fn) {
		if (obj.addEventListener)  
			obj.addEventListener(type, fn, false);  
		else if (obj.attachEvent) {
			obj["e"+type+fn] = fn;
			obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
			obj.attachEvent("on"+type, obj[type+fn]);  
		}
	},
	hasClass: function(el, className) {
		return (" ") ? (" " + el.className + " ").indexOf(" " + className + " ") > -1 : el.className.indexOf(className) > -1;
	},
	addClass: function(el, className) {
		if (!this.hasClass(el, className)) {
			var name = (el.className + ' ' + className);
			el.className = this.strClean(name);
		}
	},
	removeClass: function(el, className) {
		el.className = el.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)'), '$1');
	},
	trim: function(str) {
		return str.replace(/^\s+|\s+$/g, '');
	},
	strClean: function(str) {
		str = str.replace(/\s+/g, ' ');
		return this.trim(str);
	},
	get: function(el, name) {
		return el.getAttribute(name) != null ? el.getAttribute(name) : "";
	},
	getElementsByClassName: function(className, parentNode) {
		var retnode = [];
		var myclass = new RegExp('\\b'+className+'\\b');
		
		if ( parentNode == undefined )
			parentNode = document;
		
		var elem = parentNode.getElementsByTagName('*');
		for (var i = 0; i < elem.length; i++) {
			var classes = elem[i].className;
			if (myclass.test(classes)) retnode.push(elem[i]);
		}
		return retnode;
	},
	getScript: function(url){
		var src = url;
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src	= src;
		
		var ret = document.getElementsByTagName('head')[0].appendChild(script);
		setTimeout(function() { document.getElementsByTagName("head")[0].removeChild(ret) }, 10000); // 모바일에서의 로딩속도문제로 2초에서 10초로 늘림
		return ret;
	},
	JSONP: function(src) {
		if ( src.length > 2083 ) src = src.substr(0, 2080);
		
		if ( SP_Browser.Engine.trident ) {
			setTimeout(function() { SPUtil.getScript(src); }, 200);
		} else {
			setTimeout(function() { SPUtil.getScript(src); }, 0);
		}
	},
	getCookie: function ( name ){
		var nameOfCookie = name + "=";
		var checkName = "";
		var x = 0;
		while ( x <= document.cookie.length ){
			var y = (x+nameOfCookie.length);
			if ( document.cookie.substring( x, y ) == nameOfCookie ){
				if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
					endOfCookie = document.cookie.length;					
				var testString = unescape( document.cookie.substring( y, endOfCookie ) );

				if(name == "UD3"){						
					checkName = /[^a-zA-Z0-9]+/i;
					if(checkName.test(testString) == true){
						return "";
					}else{							
						return testString;
					}
				}else if(name == "ndrn"){
					checkName = /[^a-zA-Z0-9|=%]+/i;
					if(checkName.test(testString) == true){
						return "";
					}else{
						return testString;
					}
				}else{
					return testString;
				}
			}
			x = document.cookie.indexOf( " ", x ) + 1;
			if ( x == 0 )
				break;
		}
		return "";
	}
};
var SP_Browser = {
	Engine: {name: 'unknown', version: 0},
	Platform: {name: (window.orientation != undefined) ? 'ipod' : (navigator.platform.match(/mac|win|linux/i) || ['other'])[0].toLowerCase()},
	Features: {xpath: !!(document.evaluate), air: !!(window.runtime), query: !!(document.querySelector)},
	Plugins: {},
	Engines: {
		presto: function(){
			return (!window.opera) ? false : ((arguments.callee.caller) ? 960 : ((document.getElementsByClassName) ? 950 : 925));
		},
		trident: function(){
			return (!window.ActiveXObject) ? false : ((window.XMLHttpRequest) ? ((document.querySelectorAll) ? 6 : 5) : 4);
		},
		webkit: function(){
			return (navigator.taintEnabled) ? false : ((SP_Browser.Features.xpath) ? ((SP_Browser.Features.query) ? 525 : 420) : 419);
		},
		gecko: function(){
			return (!document.getBoxObjectFor && window.mozInnerScreenX == null) ? false : ((document.getElementsByClassName) ? 19 : 18);
		}
	}
};
SP_Browser.Platform[SP_Browser.Platform.name] = true;
SP_Browser.detect = function(){
	for (var engine in this.Engines){
		var version = this.Engines[engine]();
		if (version){
			this.Engine = {name: engine, version: version};
			this.Engine[engine] = this.Engine[engine + version] = true;
			break;
		}
	}
	return {name: engine, version: version};
};
SP_Browser.detect();

function checkCulture(){
	if(typeof window.sp_global_lang != 'undefined'){
		if( window.sp_global_lang == "en-US" || 
			window.sp_global_lang == "ko-KR" || 
			window.sp_global_lang == "es-ES" || 
			window.sp_global_lang == "de-DE" || 
			window.sp_global_lang == "ja-JP" || 
			window.sp_global_lang == "zh-CN" || 
			window.sp_global_lang == "zh-TW" ){
			
			var temJsonObj = { lang : window.sp_global_lang };
			addJsCss(temJsonObj);
		}		
		else{
			SPUtil.JSONP('http://csp.' + SPLoader.docDomain+'.com/bi/bi_get_culture.php?callback=addJsCss');
		}
	}
	else
	{
		var temJsonObj = { lang : "local" };
		addJsCss(temJsonObj);
	}
}

function addJsCss(jsonObj) {
	if (jsonObj.lang != "undefined") var cultureLang = jsonObj.lang;
	else return;
	
	if(cultureLang != "local")
		SPLoader.lang = cultureLang;

	var cylang = document.createElement('script');
    cylang.type = "text/javascript";
    cylang.charset = 'utf-8';  // 꼭 이 위치여야 함!!!! 
    
    if(cultureLang == "local")
    	cylang.src = "http://script.csp." + SPLoader.docDomain + ".com/js/locale/Resource.GlobalMinihp.GlobalMeTooHtml.ko-KR.js";
    else
    	cylang.src = "http://script.csp." + SPLoader.docDomain + ".com/js/locale/Resource.GlobalMinihp.GlobalMeTooHtml."+cultureLang+".js";
    
    document.getElementsByTagName('head')[0].appendChild(cylang);
    
    var existCss = false;
    var cssList = document.getElementsByTagName('link');
    for(var i in cssList){
    	if(cssList[i].href != undefined){
    		if( null != cssList[i].href.match('sp.css') ){
    			existCss = true;
    		}
    		else if( null != cssList[i].href.match('sp.de-DE.css') ){
    			existCss = true;
    		}
    		else if( null != cssList[i].href.match('sp.en-US.css') ){
    			existCss = true;
    		}
    		else if( null != cssList[i].href.match('sp.es-ES.css') ){
    			existCss = true;
    		}
    		else if( null != cssList[i].href.match('sp.ja-JP.css') ){
    			existCss = true;
    		}
    		else if( null != cssList[i].href.match('sp.ko-KR.css') ){
    			existCss = true;
    		}
    		else if( null != cssList[i].href.match('sp.zh-CN.css') ){
    			existCss = true;
    		}
    		else if( null != cssList[i].href.match('sp.zh-TW.css') ){
    			existCss = true;
    		}
    	}
    }
    
    if(!existCss) {
	    var cssNode = document.createElement('link');
	    cssNode.type = 'text/css';
	    cssNode.rel = 'stylesheet';
	    cssNode.media = 'screen';
	    
	    if(cultureLang == "local")
	    	cssNode.href = "http://script.csp." + docDomain + ".com/css/sp.css";
	    else
	    	cssNode.href = "http://script.csp." + docDomain + ".com/css/sp."+cultureLang+".css";
	    
	    document.getElementsByTagName('head')[0].appendChild(cssNode);
    }
}

function BrowserContentLoaded (fn) {
	var init = function () {
		if (SP_Browser.loaded) return;
		SP_Browser.loaded = true;
		fn();
	};
	if ( window.document.readyState == "complete" ) {
		init();
		return;
	}
	SPUtil.addEvent(window, 'load', init);
	(function () {
		if (SP_Browser.Engine.trident){

		} else if (SP_Browser.Engine.webkit && SP_Browser.Engine.version <= 525){
			(function(){
				if ( document.readyState == "loaded" || document.readyState == "complete" ) {
					init();
				} else {
					setTimeout(arguments.callee, 50);
				}
			})();
		} else {
			SPUtil.addEvent(document, 'DOMContentLoaded', init);
		}
	})();
}

var SPProfile = {
    displayFinderCount: function(cnt, type, memdispcnt, maxProfDispCnt) {
		var operand = 0;
		if (type == "add_me")
			operand = 1;
		if (type == "remove_me")
			operand = -1;
		cnt = parseInt(cnt) + operand;
		
		/* 
		if ( cnt >= 10 && cnt < 20 ) {
			return 1;
		} else if ( cnt >= 20 && cnt < 30 ) {
			return 2;
		} else if ( cnt >= 30 ) {
			return 3;
		}
		*/
		
		// if cnt is more than 10, return 3   
		if ( cnt >= 10 ) {
			if (memdispcnt > (maxProfDispCnt - 3) && memdispcnt <= maxProfDispCnt) {
				return (maxProfDispCnt - memdispcnt);
			}	
			else if (memdispcnt <= (maxProfDispCnt - 3)) {
				return 3;
			}
			else if (memdispcnt > maxProfDispCnt) {
				return 0;
			}	
		}
		
		/*
		if ( cnt >= 2 && cnt < 4 ) {
			return 1;
		} else if ( cnt >= 4 && cnt < 6 ) {
			return 2;
		} else if ( cnt >= 6 ) {
			return 3;
		}*/
		return 0;
	},
	makeProfileHTML: function(id, className, profileEls, cnt, isPrivate) {
		var maxProfDispCnt = 6;
		if(className == "social_mod_snstxt") maxProfDispCnt = 5;
		
		var display = "";
		if (profileEls.length == 0) display = "style='display:none;'";

		var mymemIdx = 0;
		var finderIdx = 0;
		var memDisplayCount = 0;
		var finderDisplayCount = 0;

		for (var i=0; i < profileEls.length; i++) {
			if(profileEls[i].type == "myprof" || profileEls[i].type == "mymem") memDisplayCount++;
		}
		if (memDisplayCount > maxProfDispCnt ) memDisplayCount = maxProfDispCnt; 
		
		if ( isPrivate == "false" || className != "social_mod_snstxt" ) finderDisplayCount = this.displayFinderCount(cnt, null, memDisplayCount, maxProfDispCnt);
		
		var mymemHTML = "";
		var finderHTML = "";
		var profHTML = "<ul class='mymem' "+display+">";

		//memDisplayCount -= finderDisplayCount;
		
		if (finderDisplayCount > 0 && memDisplayCount < maxProfDispCnt && memDisplayCount >= (maxProfDispCnt - 3)) {
			finderDisplayCount = maxProfDispCnt - memDisplayCount;
		}
		
		var paramObj = new Object();
		paramObj.mymemHTML = mymemHTML;
		paramObj.finderHTML = finderHTML;
		paramObj.midx	= mymemIdx;
		paramObj.fidx	= finderIdx;
		paramObj.fdcount = finderDisplayCount;
		paramObj.mdcount = memDisplayCount;

		this.makeProfile(id, className, profileEls, paramObj);

		finderHTML = paramObj.finderHTML;
		mymemHTML = paramObj.mymemHTML;
		finderIdx = paramObj.fidx;
		mymemIdx = paramObj.midx;
		finderDisplayCount = paramObj.fdcount;
		memDisplayCount = paramObj.mdcount;

		if ( finderIdx != 0 ) {
			this.finder = "";
		}
/*
		if ( finderHTML == "" || finderDisplayCount <= 0 ) {
			finderHTML = "<ul class='finder' style='display:none;'>" + finderHTML;
		} else {
			finderHTML = "<ul class='finder' "+display+">" + finderHTML;
		}
		
		mymemHTML	+= "</ul>";
		finderHTML	+= "</ul>";
*/
		if ( isPrivate != "false" ) {
			finderHTML = "";
		}
		if ( className != "social_mod_snstxt" ) {
			profHTML += mymemHTML + finderHTML + "</ul>";
		} else {
			profHTML += mymemHTML + "</ul>";
		}

		if ( className == "social_mod_combine" || className == "social_mod_snstxt")
			return profHTML;
			
		var totalIdx = mymemIdx + finderIdx;
		if (profileEls.length != 0 && totalIdx != 0  ) {
			return '<p class="txt_noti" style="display:none;">'+CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtMeTooWithFriend+'</p>' + profHTML;	
		}
		return '<p class="txt_noti">'+CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtMeTooWithFriend+'</p>' + profHTML;
	},
	makeProfile: function(id, className, elements, paramObj) {
		var finderIdx = paramObj.fidx;
		var el = null;
		var innerHTML = "";

		for ( var i=0; i<elements.length; i++) {
			el = elements[i];
			innerHTML = "";
			
			if ( el.home == null )	{
				el.nm = CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtUnKnown;
				el.img = "http://c1img2.cyworld.co.kr/common/file_down.asp?redirect=%2fimg%2fpwin%2fdef_pic.gif";
				innerHTML = "<a href='javascript:;' onclick='javascript:alert(\"" + CyRes.GlobalMinihp.GlobalMeTooHtml.T_J_S_TxtNoHompy + "\");'>";
			} else if ( el.home.search("http://minihp.cyworld.com/pims/main/pims_main.asp") < 0 ) {
				innerHTML = "<a href='"+el.home+"' target='_blank'>";
			} else {
				innerHTML = "<a href='javascript:;' onclick='window.open(\""+el.home+"\", \"openminihp\", \"height=538,width=932,scrollbars=no,resizable=yes\");'>";
			}
			
			if ( className != "social_mod_combine" && className != "social_mod_snstxt") {
					if ( el.type == "myprof" ) {
							innerHTML += "<p style='position:absolute; top:0; left:0; border:2px solid #ff3000; padding:0; margin:0; width:21px; height:21px; text-indent:-9999px;'></p>";
					}
					
					if ( el.type == "finder" || el.type == "finder_me") {
						if ( finderIdx == 0 )
							innerHTML += "<span class='top'>1</span>";
						if ( finderIdx == 1 )
							innerHTML += "<span class='second'>2</span>";
						if ( finderIdx == 2 )
							innerHTML += "<span class='third'>3</span>";
					}		
					innerHTML += "<img src='"+el.img+"' height=25 width=25 alt='"+el.nm+"'></a></li>";
			} else {
				if ( el.type == "myprof" ) {
					innerHTML += "<span class='me'>" + CyRes.GlobalMinihp.GlobalMeTooHtml.T_P_S_TxtMe + "</span>";
				}
				innerHTML += "<img src='"+el.img+"' height=18 width=18 alt='"+el.nm+"'></a></li>";
			}
			
			if ( el.type == "finder" || el.type == "finder_me" ) {
				paramObj.finderHTML += this.makeFinderHTML(el, id, innerHTML, paramObj);
				finderIdx++;
				continue;
			}
			if ( el.type == "mymem" || el.type == "myprof" ) {
				paramObj.mymemHTML += this.makeMyMemHTML(el, id, innerHTML, paramObj);
			}
		}
	},
	makeFinderHTML: function(el, id, innerHTML, paramObj) {
		var finderHTML = "";

		if ( paramObj.fidx < 3 && paramObj.fidx < paramObj.fdcount ) {
			if ( el.type == "finder_me") {
				finderHTML = "<li id='"+id+"_2' class='sp_"+el.type+"' title='"+el.nm+"'>" + innerHTML;
			} else {
				finderHTML = "<li class='sp_"+el.type+"' title='"+el.nm+"'>" + innerHTML;
			}
			paramObj.fidx++;
			return finderHTML;
		}
		if ( el.type == "finder_me") {
			finderHTML = "<li id='"+id+"_2' class='sp_"+el.type+"' title='"+el.nm+"' style='display:none;'>" + innerHTML;
		} else {
			finderHTML = "<li class='sp_"+el.type+"' title='"+el.nm+"' style='display:none;'>" + innerHTML;
		}
		return finderHTML;
	},
	makeMyMemHTML: function(el, id, innerHTML, paramObj) {
		var mymemHTML = "";
		if ( paramObj.midx < paramObj.mdcount ) {
			if ( el.type == "myprof" ) {
				mymemHTML = "<li id='"+id+"_1' class='sp_"+el.type+"' title='"+el.nm+"'>" + innerHTML;
			} else {
				mymemHTML = "<li class='sp_"+el.type+"' title='"+el.nm+"'>" + innerHTML;
			}
			paramObj.midx++;
			return mymemHTML;
		}
		mymemHTML = "<li class='sp_"+el.type+"' title='"+el.nm+"' style='display:none;'>" + innerHTML;
		return mymemHTML;
	},
	toggleProfile: function(el, btnEl, jsonObj) {
		var profileEl =	SPUtil.getElementsByClassName("sp_myprof", el)[0];
	
		if (SPUtil.hasClass(btnEl, "loading_on") ) {
			this.removeMyProfile(el, profileEl);
			return;
		} 
		
		if (SPUtil.hasClass(btnEl, "loading_off") ){
			this.addMyProfile(el, profileEl, jsonObj);
			return;
		}
	},
	refreshFinder: function(elements, el, type) {
		var cNumEl = SPUtil.getElementsByClassName("hnum", el);
		var count = 0;
		
		var maxProfDispCnt = 6;
		if (SPUtil.get(el, "sptype") == "social_mod_snstxt") maxProfDispCnt = 5; 

		if (cNumEl.length == 0) return 0;
		
		//count = parseInt(SPUtil.get(cNumEl[0], "val"));
		count = parseInt(SPUtil.get(cNumEl[0], "title").replace(CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtCount,"").replace("+",""));
		memDisplayCount=0;
		for (var i=0; i < elements.length; i++) {
			if(elements[i].style.display == "" && (SPUtil.hasClass(elements[i], "sp_myprof") || SPUtil.hasClass(elements[i], "sp_mymem"))) memDisplayCount++;
		}
		if (memDisplayCount > maxProfDispCnt) memDisplayCount = maxProfDispCnt;
		
		var finderCnt = this.displayFinderCount(count, type, memDisplayCount, maxProfDispCnt);
		var retCnt = finderCnt;
		
		var displayCnt = maxProfDispCnt - finderCnt;
		var display = "";
		for ( var i = 0; i<elements.length; i++) {
			if ( SPUtil.hasClass(elements[i], "sp_myprof") || SPUtil.hasClass(elements[i], "sp_mymem") ) {
				if ( displayCnt <= 0 ) {
					elements[i].style.display = "none";
				} else {
					if ( i != 0 ) {
						elements[i].style.display = "";
					}
				}
				if ( elements[i].style.display == "" ) {
					displayCnt--;
				}
				continue;
			}

			if (finderCnt <= 0) {
				display = "none";
			}
			if ( type == "add_me" &&  SPUtil.hasClass(elements[i], "sp_finder_me") ) {
				finderCnt--;
			}
			if ( type == "remove_me" &&  SPUtil.hasClass(elements[i], "sp_finder_me") ) {
				elements[i].style.display = "none";
			}
			if ( SPUtil.hasClass(elements[i], "sp_finder") ) {
				finderCnt--;
			}
			elements[i].style.display = display;
		}
		return retCnt;
	},
	addMyProfile: function(el, profileEl, jsonObj) {
		if ( typeof jsonObj != "undefined" && jsonObj != "" ) {
			if ( profileEl == null && typeof jsonObj.home != "undefined") {
				var html = "";
				if ( jsonObj.home.search("http://minihp.cyworld.com/pims/main/pims_main.asp") < 0 ) {
					html = "<a href='"+jsonObj.home+"' target='_blank'>";
				} else {
					html = "<a href='javascript:;' onclick='window.open(\""+jsonObj.home+"\", \"openminihp\", \"height=538,width=932,scrollbars=no,resizable=yes\");'>";
				}
				if ( SPUtil.get(el, "sptype") != "social_mod_combine" && SPUtil.get(el, "sptype") != "social_mod_snstxt") {
					html += "<p style='position:absolute; top:0; left:0; border:2px solid #ff3000; padding:0; margin:0; width:21px; height:21px; text-indent:-9999px;'></p>";
					html += "<img src='"+jsonObj.img+"' height=25 width=25 alt='"+jsonObj.nm+"'></a></li>";
				} else {
					html += "<span class='me'>" + CyRes.GlobalMinihp.GlobalMeTooHtml.T_P_S_TxtMe + "</span>";
					html += "<img src='"+jsonObj.img+"' height=18 width=18 alt='"+jsonObj.nm+"'></a></li>";
				}
				
				var li = document.createElement("li");
				li.id = SPUtil.get(el,"spkey") + "_1";
				li.className = "sp_myprof";
				li.title = jsonObj.nm;
				li.innerHTML = html;
				
				var ul = SPUtil.getElementsByClassName("mymem", el)[0];
				ul.style.display = "";
				if ( ul == null ) {
					ul = document.createElement("ul");
					ul.className = "mymem";
					el.appendChild(ul);
				}
				var first = ul.firstChild;
				(first) ? ul.insertBefore(li, first) : ul.appendChild(li);
			} else {
				profileEl.style.display = "";
			}
		}

		var txtEl = SPUtil.getElementsByClassName("txt_noti", el)[0];
		if ( typeof txtEl != "undefined") txtEl.style.display = "none";
		
		var elements = el.getElementsByTagName("li");
		if ( this.finder == ""  || typeof this.finder == "undefined" )
			var finderCnt = this.refreshFinder(elements, el, "add_me");

		SPUtil.getElementsByClassName("mymem", el)[0].style.display = "";
		if ( this.finder == "" && finderCnt > 0 ) {
			var finders = SPUtil.getElementsByClassName("finder", el);
			if ( finders.length == 1 ) {
				finders[0].style.display = "";
			}
		}

		var maxProfDispCnt = 6;
		if (SPUtil.get(el, "sptype") == "social_mod_snstxt") maxProfDispCnt = 5; 
		
		var displayCount = 0;
		for ( var i = 0; i<elements.length; i++ ) {
			if ( elements[i].style.display == "" ) {
				displayCount++;
			}
			if ( displayCount > maxProfDispCnt ) {
				elements[i].style.display = "none";
			} 
		}
	},
	removeMyProfile: function(el,profileEl) {
		var elements = [];
		var displayCnt = 0;
		if (profileEl != null) {
			profileEl.style.display = "none";
			
			elements = el.getElementsByTagName("li");
			var i=1;
			while ( i < elements.length ) {
				if ( SPUtil.hasClass(elements[i], "sp_mymem") ) {
					if ( elements[i].style.display == "none" ) {
						elements[i].style.display = "";
						i++;
						break;	
					}
					displayCnt++;
					i++;
					continue;
				}
				break;
			}
		}

		var finderCnt = 0;
		if ( this.finder == "" || typeof this.finder == "undefined" ) 
			finderCnt = this.refreshFinder(elements, el, "remove_me");
		displayCnt += finderCnt;
		
		if (displayCnt == 0 ) {
			SPUtil.getElementsByClassName("mymem",el)[0].style.display = "none";
			var finders = SPUtil.getElementsByClassName("finder",el);
			if ( finders.length == 1) {
				finders[0].style.display = "none";
			}
			var txtEl = SPUtil.getElementsByClassName("txt_noti", el)[0];
			if ( typeof txtEl != "undefined") txtEl.style.display = "";
		}
		var maxProfDispCnt = 6;
		if (SPUtil.get(el, "sptype") == "social_mod_snstxt") maxProfDispCnt = 5;
		
		var displayCount = 0;
		for ( var i = 0; i<elements.length; i++ ) {
			if ( elements[i].style.display == "" ) {
					displayCount++;
			}
			if ( displayCount > maxProfDispCnt ) {
					elements[i].style.display = "none";
			}
		}
	},
	closeMyProfile: function(id) {
		var el = document.getElementById(id+"_1");
		if (typeof el != "undefined" && el != null ) {
			el.parentNode.removeChild(el);
			el = null;
		}
		
		el = document.getElementById(id+"_2");
		if (typeof el != "undefined" && el != null ) {
			el.parentNode.removeChild(el);
			el = null;
		}
	}
};

var SPLoader = {
	noLayerSvcList : [],
	retry: 5,
	retryIfLoadJs: 10,
	loadedJs: false,
	curEl: null,
	curBtnEl: null,
	curId: null,
	countHtml: "<p class='count'></p>",
	showProfile: 0,
	encKey: "",
	counter: 0,
	caller: [],
	lang:"",
	statDomain: "cyworld", // 클릭통계용 도메인	   
	initialize: function() {
		if ( this.retry == 0 ) return;
		var elements = SPUtil.getElementsByClassName("sprecommend");
		if ( elements.length == 0) {
			this.retry--;
			var init = function() { SPLoader.initialize(); };
			setTimeout(init, 100);
			return;
		}
		this.inject("sprecommend");
	},
	inject: function(className_tmp) {
		var keys = "";
		var elements = SPUtil.getElementsByClassName("sprecommend");
		if ( elements.length == 0) 
			return;

		var className = elements[0].getAttribute("sptype");
		if ( typeof className == "undefined" || className == null ) 
			return;

		this.mainClassName = className;
		var tmpKey = "";
		var startIdx = 0;
		this.showProfile = 0;

		className = "";
		for ( var i=0; i<elements.length; i++) {
			tmpKey = this.makeKey(elements[i]);
			if ( this.hasProfile(elements[i]) ) {
				this.showProfile = 1;
			}

			if ( keys.length + tmpKey.length > 2000 ) {
				this.requestRecommendInfo(elements, keys, startIdx, i);
				this.showProfile = 0;
				keys = tmpKey;
				startIdx = i;
			} else {
				keys = (keys == "") ? tmpKey : (keys + "|^|" + tmpKey); // 파싱바꿈
			}
			SPUtil.removeClass(elements[i], "sprecommend");
		}
		if (keys.length > 0) {
			// startIdx 값을 넘길때 늘 0이 아니어야 함
			this.requestRecommendInfo(elements, keys, startIdx, i);
		}	
	},
	makeKey: function(el) {
		var tmpKey = "";
		var mkey = SPUtil.get(el, "mkey");
		var url = SPUtil.get(el, "spurl");
		
		if(url != null && url != "" && url.substr(0,7) != "http://" && url.substr(0,8) != "https://"){
			url = "http://" + url;
		}
		if ( mkey == "" ) {
			var svccode = SPUtil.get(el, "spsvccode");
			if ( svccode != "" && parseInt(svccode) <= 11 && parseInt(svccode) != 7 ) {
				tmpKey += "," + SPUtil.get(el, "spsvccode") + ",";
				tmpKey += SPUtil.get(el, "spownertid") + "," + SPUtil.get(el, "spfolderno") + "," + SPUtil.get(el, "spitemseq") + ",";
			} else {
				tmpKey += "," + SPUtil.get(el, "spsvccode") + ",";
				tmpKey += SPUtil.get(el, "spownertid") + "," + SPUtil.get(el, "spfolderno") + "," + SPUtil.get(el, "spitemseq") + ",";
				tmpKey += encodeURIComponent(url);
			}
		} else {
			tmpKey += mkey + "," + SPUtil.get(el, "spsvccode") +",";
			tmpKey += ",,,";
		}
		return tmpKey;
	},
	JSONP: function(src) {
		SPUtil.JSONP(src);
	},
	responseAction: function(jsonObj) {
		var ret = this.checkResult(jsonObj.status);		
		var curEl = this.curEl;
		var curBtnEl = this.curBtnEl;
		
		this.curEl = null;
		this.curBtnEl = null;
		
		if ( ret == true ) {	
			if(jsonObj.recmd_target_iseq != null) {
				curEl.setAttribute("spnoteseq", jsonObj.recmd_target_iseq); // 한마디 추가 씨로그 seq 리턴 받은것 저장
			}
			if(jsonObj.music_coupon == 1) {
				if(navigator && (navigator.userAgent.toLowerCase()).indexOf("chrome") > -1){
					var open = window.open("http://"+docDomain+".com", "music_coupon", "width=500, height=600,scrollbars=no,resizable=no");
					setTimeout(function(){
						if(open){
							if(open.innerHeight == 0 || open.innerHeight == undefined){
								alert(CyRes.GlobalMinihp.GlobalMeTooHtml.T_J_S_TxtMusicCouponReleasePopupDenySet.replace("|","\n"));
							}else{
								open.location = "http://shopmusic.cyworld.com/coupon_alert_view.asp";
								open.focus();
							}
						}
					},60);
				}else{
					var open = window.open("http://shopmusic.cyworld.com/coupon_alert_view.asp", "music_coupon", "width=500, height=600,scrollbars=no,resizable=no");
					if(!open || open.closed || typeof open == 'undefined' || typeof open.closed=='undefined'){
						alert(CyRes.GlobalMinihp.GlobalMeTooHtml.T_J_S_TxtMusicCouponReleasePopupDenySet.replace("|","\n"));
					}
				}
			}
			this.recommendAct(curEl, curBtnEl, jsonObj.myprofile);

		} else {
			this.toggleBtnImg(curBtnEl);
		}
	},
	requestRecommendInfo: function(elements, keys, startIdx, endIdx) {
		keys += "&show_profile="+ this.showProfile;

		SPLoader.caller[this.counter] = function(jsonObj) {
			var ret = SPLoader.checkResult(jsonObj.status);

                        if (SPLoader.loadedJs == false) {
                                if (SPLoader.retryIfLoadJs == 0) return;
                                if ( typeof CyRes.GlobalMinihp == 'undefined' || typeof CyRes.GlobalMinihp.GlobalMeTooHtml == 'undefined') {
                                        SPLoader.retryIfLoadJs--;
                                        setTimeout(function(){SPLoader.caller[jsonObj.cnt](jsonObj);}, 100);
                                        return;
                                }
                                SPLoader.loadedJs = true;
                        }


			SPLoader.encKey = jsonObj.encKey;
			var j = 0;
			for (var i=startIdx; i<endIdx && i<elements.length; i++) {
				SPLoader.displayRecommendCount(elements[i], jsonObj.recomInfos[j++], ret);
			}
		};
		SPLoader.caller[this.counter].startIdx = startIdx;
		SPLoader.caller[this.counter].endIdx = endIdx;
		SPUtil.JSONP('http://csp.'+SPLoader.docDomain+'.com/bi/bi_recommend_info.php?type=json&callback=SPLoader.caller['+this.counter+']&cnt='+this.counter+'&keys=' + keys);
		this.counter++;
	},
	displayRecommendCount: function(el, button, result) {
		if (!result) {
			SPUtil.removeClass(el, "spready");
			el.innerHTML = CyRes.GlobalMinihp.GlobalMeTooHtml.T_J_S_RsEFailToGetInfo;
			return;
		}
		
		if ( typeof button == "undefined" || button == null )
            return;

		var flag = button.recom_flag;
		var cnt	 = button.recom_cnt; 
		
		var className = SPUtil.get(el, "sptype");

		el.rcode = button.rcode;

		SPUtil.removeClass(el, "spready");
		if (flag == "Y") {
			SPUtil.addClass(el, className);
			var html = "<a class='on' onclick='SPLoader.checkRecommend(event); return false;' target='_blank' href='#' alt='"+CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtCyworldMeTooToolTip+"' title='"+CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtCyworldMeTooToolTip+"'>"+CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtMeToo+"</a>";
			this.createButton(el, html, className, button, cnt, "on");
		} else if (flag == "N") {
			SPUtil.addClass(el, className);
			var html = "<a class='off' onclick='SPLoader.checkRecommend(event); return false;' target='_blank' href='#' alt='"+CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtCyworldMeTooToolTip+"' title='"+CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtCyworldMeTooToolTip+"'>"+CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtMeToo+"</a>";
			this.createButton(el, html, className, button, cnt, "off");
		} else {
			SPUtil.addClass("s_error");
		}
	},
	createButton: function(el, html, className, button, cnt, status) {
		if ( className == "social_mod_ver" || className == "social_mod_ver_dark") {
			html = this.countHtml + html;
		} else {
			html = html + this.countHtml;
		}

		if ( this.hasProfile(el) ) 
			html += SPProfile.makeProfileHTML(SPUtil.get(el, "spkey"), className, button.recom_profiles, cnt, button.private);

		el.innerHTML = html;
		var countEl = SPUtil.getElementsByClassName("count", el)[0];
		countEl.innerHTML = this.makeCountHTML(parseInt(cnt), status, el);
	},
	toggleBtnImg: function(el) {
		if ( SPUtil.hasClass(el, "loading_on") ) {
			SPUtil.removeClass(el, "loading_on");
			SPUtil.addClass(el, "on");
		}
		if ( SPUtil.hasClass(el, "loading_off") ) {
			SPUtil.removeClass(el, "loading_off");
			SPUtil.addClass(el, "off");
		}
	},
	invokeRecommend: function() {
		var elements = SPUtil.getElementsByClassName(this.mainClassName);
		if ( elements.length != 1 )
			return;

		var btnEl = elements[0].getElementsByTagName("a");
		if ( typeof btnEl == "undefined" || btnEl == null ) 
			return;
			
		if ( SPUtil.hasClass(btnEl[0], "off") ) {
			SPUtil.removeClass(btnEl[0], "off");
			SPUtil.addClass(btnEl[0], "loading_off");
			this.recommend(elements[0], btnEl[0]);
		} 
	},
	
	// 공감 div 에 특정 clsNm 을 지정한 경우 그 공감 버튼을 invoke시키는 모듈
	invokeRecommendbyClassNm: function(clsNm) {
		var elements = SPUtil.getElementsByClassName(clsNm);
		if ( elements.length != 1 )
			return;

		var btnEl = elements[0].getElementsByTagName("a");
		if ( typeof btnEl == "undefined" || btnEl == null ) 
			return;
			
		if ( SPUtil.hasClass(btnEl[0], "off") ) {
			SPUtil.removeClass(btnEl[0], "off");
			SPUtil.addClass(btnEl[0], "loading_off");
			this.recommend(elements[0], btnEl[0]);
		} 
	},
	recommendAct: function(el, btnEl, jsonObj) {
		if ( this.hasProfile(el) ) {
			SPProfile.toggleProfile(el, btnEl, jsonObj);
		}
		this.toggleRecommend(el,btnEl,jsonObj);
		
		// 공감일때만 - 한마디추가
		if ( SPUtil.hasClass(btnEl, "on") && SPUtil.get(el, "spnoteseq") != "NATE" && 
				SPUtil.get(el, "sptype") != "social_mod_mobile01" && SPUtil.get(el, "sptype") != "social_mod_mobile02" && SPUtil.get(el, "splayertype") != "n" && window.sp_cmt_url != null && window.sp_cmt_url != "") { // 한마디 추가
			for(var i=0; i<SPLoader.noLayerSvcList.length; i++) {
				if(SPUtil.get(el, "spsvccode") == SPLoader.noLayerSvcList[i]){
					return;
				}
			}
			this.createIfmComment(el);
		}
		else {
			this.closeIfmComment(el);
		}
	},
	makeCountHTML: function(count, status, el) {
		var html = "";
		var appendText = "";
		var svccode = SPUtil.get(el, "spsvccode");
		var rcode = el.rcode;
		var url = SPUtil.get(el, "spurl");
		
		if(url != null && url != "" && url.substr(0,7) != "http://" && url.substr(0,8) != "https://"){
			url = "http://" + url;
		}
		var popUrl = "http://csp." + this.docDomain + ".com/bi/bi_profile_pop.php?mkey=," + svccode + "," + SPUtil.get(el, "spownertid") + "," + SPUtil.get(el, "spfolderno") + "," + SPUtil.get(el, "spitemseq") + "," + encodeURIComponent(url) + "&svc_cd=" +SPUtil.get(el,"spsvccode")+ "&id=" +SPUtil.get(el,"spkey")+ "&loginurl="+this.bridgeUrl;
		if(SPLoader.lang != "")
			popUrl += "&lang=" + SPLoader.lang;
		var option = "href='#' target='_blank' onclick=' window.open(\""+ popUrl +"\",\"mem_pop\", \"width=360,height=420,scrollbars=no,resizable=no\"); SPLoader.clickCount(\""+rcode+"\"); return false;'";
		count = parseInt(count);
		var realCnt = count + CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtCount;
		var className = SPUtil.get(el, "sptype");
		
		if ( count > 99999 ) 
			count = 99999 + '+';
		if ( className == "social_mod_txt") {
			if ( count == 1 && status == "on" ) {
				var txtMeTooMsg = CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtMeTooBoard;
			}else{
				var txtMeTooMsg = CyRes.GlobalMinihp.GlobalMeTooHtml.T_J_C_TxtMeTooComplete;
			}
			var arrMeTooMsg = txtMeTooMsg.split("|");
			
			if ( status == "on" ) {
				if ( count == 1 ) {
					
					if ( SP_Browser.Engine.version != 4 )
						html = "<a " + option + " class='info hnum' title=1>" + arrMeTooMsg[0] + "</a>&nbsp;" + arrMeTooMsg[1];
					else
						html = "<a " + option + " class='info hnum' title=1>" + arrMeTooMsg[0] + "</a>" + arrMeTooMsg[1];
					return html;
				}				
				
				appendText = arrMeTooMsg[0];
				//count = (realCnt > 100000 ) ? 99999 : (count-1);
			}
			if (count != 0) {
				var txtMeTooCountMsg = arrMeTooMsg[1].replace("{0}",count);
				html = "<a " + option + " class='info hnum' title="+realCnt+">"+ appendText + txtMeTooCountMsg + "</a>"+ arrMeTooMsg[2];
			} else {
				var txtMeTooMsg = CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtHowAboutMeTooWithFriend;
				var arrMeTooMsg = txtMeTooMsg.split("|");
				html = arrMeTooMsg[0]+" <span class='b' title="+realCnt+">" + html + arrMeTooMsg[1]+ "</span>"+arrMeTooMsg[2];
			}
		} else if ( className == "social_mod_search") {
			html = "<a " + option + " class='qty'><em class='hnum' title="+realCnt+">"+ count + "</em></a>";
		} else if ( className == "social_mod_combine") {
			if ( count != 0 ) {
				html = "<a class='info hnum' " + option + " title="+realCnt+">"+count+"</a>";
			} else {
				var txtMeTooMsg = CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtHowAboutMeTooWithFriend;
				var arrMeTooMsg = txtMeTooMsg.split("|");
				html = arrMeTooMsg[0]+" <span class='b' title="+realCnt+">" + html + arrMeTooMsg[1]+ "</span>"+arrMeTooMsg[2];
			}
		} else if ( className == "social_mod_snstxt" ) {
			if ( count != 0 ) {
				if (CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtCount == "T_C_S_TxtCount")
					html = "<a class='info hnum' " + option + " title="+realCnt+">"+count+"</a>";
				else 
					html = "<a class='info hnum' " + option + " title="+realCnt+">"+count+CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtCount+"</a>";
			} 
		} else {
			html = "<a class='hnum' " + option + " title="+realCnt+">"+count+"</a>";
		}
		return html;
	},
	toggleRecommend: function(el, btnEl, jsonObj) {
		var cntEl = SPUtil.getElementsByClassName("count", el)[0];
		var cNumEl = SPUtil.getElementsByClassName("hnum", cntEl);
		var count = 0;
		
		if ( cNumEl.length != 0 ) {
			//count = parseInt(SPUtil.get(cNumEl[0], "val"));
			count = parseInt(SPUtil.get(cNumEl[0], "title").replace(CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_TxtCount,"").replace("+",""));
		}
		
		if ( SPUtil.hasClass(btnEl, "loading_off") ) {
			SPUtil.removeClass(btnEl, "loading_off");
			SPUtil.addClass(btnEl, "on");
			cntEl.innerHTML = this.makeCountHTML(parseInt(count)+1, "on", el);
			return;
		} 
		
		if ( SPUtil.hasClass(btnEl, "loading_on") ) {
			SPUtil.removeClass(btnEl, "loading_on");
			SPUtil.addClass(btnEl, "off");
			cntEl.innerHTML = this.makeCountHTML(parseInt(count)-1, "off", el);
			return;
		}
	},
	checkRecommend: function(el) {
		el = el.target || el.srcElement;
		var parentEl = el.parentNode;
		this.processRecommend(el, parentEl);
	},
	processRecommend: function(el, parentEl) {
		if ( SPUtil.hasClass(el, "off") ) {
			SPUtil.removeClass(el, "off");
			SPUtil.addClass(el, "loading_off");
			this.recommend(parentEl, el);
			return;
		} 
		if ( SPUtil.hasClass(el, "on") ) {
			SPUtil.removeClass(el, "on");
			SPUtil.addClass(el, "loading_on");
			this.unrecommend(parentEl, el);
			return;
		}
	},
	recommend: function(el, childEl) {
		var showProfile = 0;
		if ( this.hasProfile(el) )
			showProfile = 1;
		var param = "mkey="+SPUtil.get(el, "mkey")+"&svc_cd="+SPUtil.get(el, "spsvccode")+"&spkey="+SPUtil.get(el,"spkey")+"&act_type=d";
		param += "&owner_tid="+SPUtil.get(el, "spownertid")+"&owner_bid="+SPUtil.get(el, "spownerbid")+"&folder_no="+SPUtil.get(el, "spfolderno")+"&item_seq="+SPUtil.get(el, "spitemseq");
		param += "&src_gb=IN"+"&link_url="+encodeURIComponent(SPUtil.get(el, "spurl"))+"&title="+encodeURIComponent(SP_Base64.encode(SPUtil.get(el, "sptitle").replace(/\r\n/g,"")));
		param += "&mobile_yn="+SPUtil.get(el, "spismobile")+"&writer_member_gb="+SPUtil.get(el, "spwritertype");
		param += "&writer_tid="+SPUtil.get(el, "spwritertid")+"&writer_bid="+SPUtil.get(el, "spwriterbid")+"&writer_nm="+encodeURIComponent(SPUtil.get(el, "spwriternm"));
		param += "&cate="+encodeURIComponent(SPUtil.get(el, "spcategory"))+"&recmd_member_gb="+SPUtil.get(el, "sprecommendee_gb");
		param += "&recmd_target_id="+SPUtil.get(el, "sprecommendee_id")+"&recmd_target_nm="+encodeURIComponent(SPUtil.get(el, "sprecommendee_nm"));
		param += "&tag1="+encodeURIComponent(SPUtil.get(el, "sptag1"))+"&tag2="+encodeURIComponent(SPUtil.get(el, "sptag2"))+"&tag3="+encodeURIComponent(SPUtil.get(el, "sptag3")) + "&tag4="+encodeURIComponent(SPUtil.get(el, "sptag4"));
		param += "&show_profile="+ showProfile+"&coid="+SPUtil.get(el, "spcorpid");
		param += "&div_code="+encodeURIComponent(SPUtil.get(el, "spdivcode"));
		param += "&result_fmt=json&encKey="+this.encKey;
		param += "&thumb_url="+encodeURIComponent(SPUtil.get(el, "spthumbnail"))+"&sum_arti="+encodeURIComponent(SP_Base64.encode(SPUtil.get(el, "spsummary").replace(/\r\n/g,"")));
		
		this.updateRecommend(el, childEl, param, "d", SPUtil.get(el, "spsvccode"));
	},
	unrecommend: function(el, childEl) {
		var param = "mkey="+SPUtil.get(el, "mkey")+"&svc_cd="+SPUtil.get(el, "spsvccode")+"&act_type=u";
		param += "&owner_tid="+SPUtil.get(el, "spownertid")+"&owner_bid="+SPUtil.get(el, "spownerbid")+"&folder_no="+SPUtil.get(el, "spfolderno")+"&item_seq="+SPUtil.get(el, "spitemseq");
		param += "&writer_tid="+SPUtil.get(el, "spwritertid");
		param += "&div_code="+encodeURIComponent(SPUtil.get(el, "spdivcode"));
		param += "&src_gb=IN"+"&link_url="+encodeURIComponent(SPUtil.get(el, "spurl"))+"&cate="+encodeURIComponent(SPUtil.get(el, "spcategory"))+ "&result_fmt=json&coid="+SPUtil.get(el, "spcorpid");
		param += "&tag1="+encodeURIComponent(SPUtil.get(el, "sptag1"))+"&tag2="+encodeURIComponent(SPUtil.get(el, "sptag2"))+"&tag3="+encodeURIComponent(SPUtil.get(el, "sptag3")) + "&tag4="+encodeURIComponent(SPUtil.get(el, "sptag4"));
		this.updateRecommend(el, childEl, param, "u", SPUtil.get(el, "spsvccode"));
	},
	createIfmComment :  function (el) {		
		var commentFrame = document.createElement("IFRAME");
		var layertype = "bLeft";
		var cmthide = 3000;
		
		if (SPUtil.get(el, "splayertype") == "undefined" || SPUtil.get(el, "splayertype") == null || SPUtil.get(el, "splayertype") == "") layertype = "bLeft";
		else layertype = SPUtil.get(el, "splayertype");
		if (SPUtil.get(el, "spcmthide") == "undefined" || SPUtil.get(el, "spcmthide") == null || SPUtil.get(el, "spcmthide") == "") cmthide = 3000;
		else cmthide = SPUtil.get(el, "spcmthide");
		
		var domainset = "";
		if (document.domain == "cyworld.com") domainset = "c";
		if (document.domain == "nate.com") domainset = "n";
		
		//layer 타입 넣기
		var param = "dms="+domainset+"&cmt_bri_url="+encodeURIComponent(window.sp_cmt_url)+"&note_seq="+encodeURIComponent(SPUtil.get(el, "spnoteseq"))+"&cmthide="+cmthide+"&lyr_type="+layertype+"&mkey="+SPUtil.get(el, "mkey")+"&svc_cd="+SPUtil.get(el, "spsvccode")+ "&spkey="+SPUtil.get(el,"spkey");
		param += "&owner_tid="+SPUtil.get(el, "spownertid")+"&owner_bid="+SPUtil.get(el, "spownerbid")+"&folder_no="+SPUtil.get(el, "spfolderno")+"&item_seq="+SPUtil.get(el, "spitemseq");
		param += "&src_gb=IN"+"&link_url="+encodeURIComponent(SPUtil.get(el, "spurl"))+"&title="+encodeURIComponent(SP_Base64.encode(SPUtil.get(el, "sptitle").replace(/\r\n/g,"")));
		param += "&mobile_yn="+SPUtil.get(el, "spismobile")+"&writer_member_gb="+SPUtil.get(el, "spwritertype");
		param += "&writer_tid="+SPUtil.get(el, "spwritertid")+"&writer_bid="+SPUtil.get(el, "spwriterbid")+"&writer_nm="+encodeURIComponent(SPUtil.get(el, "spwriternm"));
		param += "&cate="+encodeURIComponent(SPUtil.get(el, "spcategory"));
		param += "&recmd_target_id="+SPUtil.get(el, "sprecommendee_id")+"&recmd_target_nm="+encodeURIComponent(SPUtil.get(el, "sprecommendee_nm"));
		param += "&tag1="+encodeURIComponent(SPUtil.get(el, "sptag1"))+"&tag2="+encodeURIComponent(SPUtil.get(el, "sptag2"))+"&tag3="+encodeURIComponent(SPUtil.get(el, "sptag3")) + "&tag4="+encodeURIComponent(SPUtil.get(el, "sptag4"));
		param += "&coid="+SPUtil.get(el, "spcorpid");
		param += "&div_code="+encodeURIComponent(SPUtil.get(el, "spdivcode"));
		param += "&result_fmt=json&encKey="+this.encKey;

		if(SPLoader.lang != "")
			param += "&lang="+SPLoader.lang;

		param += "&thumb_url="+encodeURIComponent(SPUtil.get(el, "spthumbnail"))+"&sum_arti="+encodeURIComponent(SP_Base64.encode(SPUtil.get(el, "spsummary").replace(/\r\n/g,"")));

		var cmt_url = "http://csp." + SPLoader.docDomain + ".com/bi/bi_ifm_recmd_cmt.php?" + param;
		commentFrame.src = cmt_url.substring(0, 2083);
		//commentFrame.src = "http://csp." + SPLoader.docDomain + ".com/bi/bi_ifm_recmd_cmt.php?" + param;

		commentFrame.setAttribute("allowTransparency","true"); // IE 브라우저 속성 추가.
		commentFrame.setAttribute("scrolling","no");
		commentFrame.setAttribute("frameborder","0");
		commentFrame.setAttribute("width","258");
		commentFrame.setAttribute("height","44");
		commentFrame.frameBorder = 0;
		
		//if (layertype == "bl" || layertype == "br") commentFrame.className = "up";
		//else commentFrame.className = "down";
		commentFrame.className = layertype;

		//var aa = obj.el.innerHTML;
		
		//var src = "http://csp.hiiyum40." + SPLoader.docDomain + ".com/bi/bi_ifm_recmd_cmt.php?" + param;
		//obj.el.innerHTML = aa + "<iframe src='" + src + "' scrolling='no' frameborder='0' allowtransparency='true' style='position:absolute; border:0; width:260px; height:45px; left:100px; top:;'></iframe>";
		// 아이프레임 위치에 따라 클래스 조정 필요 - 젤 하단 레이어는 위로 올린다던가 하는등..
		el.appendChild(commentFrame);
		
	},
	closeIfmComment : function (el) {
		if (el.getElementsByTagName("iframe")[0] != null) {
			var ifmObj = el.getElementsByTagName("iframe")[0];
			ifmObj.parentNode.removeChild(ifmObj);
		}
	},
	updateRecommend: function(el, btnEl, param, type, code) {
		if ( this.curEl != null || this.curBtnEl != null ) {
			alert(CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_RsEPleaseRetry);
			return;
		}
		this.curEl = el;
		this.curBtnEl = btnEl;
		
		var url = "http://csp." + this.docDomain + ".com/ac/ac_recommend_action.php?callback=SPLoader.responseAction&"+param;
		SPUtil.JSONP(url);
		this.type = type;
		this.code = code;
	},
	checkResult: function(statusVal) {
		switch(statusVal) {
			case 'S': return true;
			case 'E01':	
				alert(CyRes.GlobalMinihp.GlobalMeTooHtml.T_P_S_RsEAleadyMeTooPost);
				break;
			case 'E02':
				alert(CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_RsENotFoundNextCyworld);
				break;
			case 'E03':
				alert(CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_RsENotInfoAndNeverRelease);
				break;
			case 'E04':	return true;
			case 'E05':
				alert(CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_RsENotMeTooYourOwn);
				break;
			case 'E06':
				alert(CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_RsEPluginExe);
				break;
			case 'E91':
				alert(CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_RsEUnderConstruction);
				break;
			case 'E94':
				alert(CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_RsENotUserForLongTime);
				break;
			case 'E96':
				alert(CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_RsEExcessMeTooMaxNum);
				break;
			case 'E97':
				var ret = confirm(CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_RsENeedToLogin);
				if ( ret == false ) return false;
				if ( window.sp_pop_url == null || window.sp_pop_url == "undefined")
					return false;

				if ( SPUtil.hasClass(this.curBtnEl, "loading_off") ) {
					SPUtil.removeClass(this.curBtnEl, "loading_off");
					SPUtil.addClass(this.curBtnEl, "off");
				}

				var spop = null;
				if ( this.docDomain == "nate" )
					spop = window.open(window.sp_pop_url, "login_pop", "width=400,height=316,scrollbars=no,resizable=no");
				else
					spop = window.open(window.sp_pop_url, "login_pop", "width=400,height=364,scrollbars=no,resizable=no");
				
				if (!spop) {
					alert(CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_RsSReleasePopupDenySet);
					return false;
				}

				spop.focus();
				return false;
			case 'E98':
				alert(CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_RsEInvalidParameter);
				break;
			case 'E99':
				alert(CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_RsEPluginExe);
				break;
			default:
				alert(CyRes.GlobalMinihp.GlobalMeTooHtml.T_C_S_RsEUnknown);
				break;
		}
		return false;
	},
	closeMyProfile: function(id) {
		if ( typeof SPProfile == "undefine" ) return;
		SPProfile.closeMyProfile(id);
	},
	hasProfile: function(el) {
		if ( typeof SPProfile == "undefine" ) return false;

		var className = SPUtil.get(el, "sptype"); 
		if ( className == "social_mod_basic" || className == "social_mod_basic_dark" || className == "social_mod_combine") 
			return true;
		return false;
	},
	clickCount: function(rcode) {
		var i = new Image();
		i.src =  "http://statclick."+ SPLoader.statDomain+".com/stat/statclick.tiff?cp_url=[click_ndr.nate.com/??ndrpageid=scp01&ndrregionid=sn"+rcode+"]";
	}
};

var docDomain = null;
var sp_domain_str = document.domain.split(".");
docDomain = SPLoader.docDomain = sp_domain_str[sp_domain_str.length-2];

var sp_bridge_url = window.sp_pop_url;
if ( window.sp_pop_url != null && window.sp_pop_url != "undefined") {
	if ( SPLoader.docDomain == "nate" ){
		sp_bridge_url = sp_bridge_url.substring(sp_bridge_url.indexOf("redirect=") + 9, sp_bridge_url.length);
	} else {
		sp_bridge_url = sp_bridge_url.substring(sp_bridge_url.indexOf("redirection=") + 12, sp_bridge_url.length);
	}
	SPLoader.bridgeUrl = sp_bridge_url.substring(0, (sp_bridge_url.indexOf("&") < 0) ? sp_bridge_url.length : sp_bridge_url.indexOf("&"));
}

if (SPLoader.docDomain != "nate" )
	docDomain = SPLoader.statDomain = SPLoader.docDomain = "cyworld";
else
	docDomain = SPLoader.statDomain = SPLoader.docDomain = "nate";

if (typeof sp_domain_str[sp_domain_str.length-3] != "undefined" && (sp_domain_str[sp_domain_str.length-3] == "dev" || sp_domain_str[sp_domain_str.length-3] == "y1048" || sp_domain_str[sp_domain_str.length-3] == "ssanjun" || sp_domain_str[sp_domain_str.length-3] == "emlife")) {
	if(typeof window.sp_global_lang != "undefined")
		if( docDomain == "cyworld")
			docDomain = SPLoader.docDomain = document.domain.replace("script.","").replace("csp.","").replace(".com","").replace("cyworld","global.cyworld");
		else
			docDomain = SPLoader.docDomain = document.domain.replace("script.","").replace("csp.","").replace(".com","").replace("nate","global.nate");
	else
		docDomain = SPLoader.docDomain = document.domain.replace("script.","").replace("csp.","").replace(".com","");
}else if (typeof sp_domain_str[sp_domain_str.length-4] != "undefined" && (sp_domain_str[sp_domain_str.length-4] == "dev" || sp_domain_str[sp_domain_str.length-4] == "y1048" || sp_domain_str[sp_domain_str.length-4] == "ssanjun" || sp_domain_str[sp_domain_str.length-4] == "emlife")) {
	if(typeof window.sp_global_lang != "undefined")
		if( docDomain == "cyworld")
			docDomain = SPLoader.docDomain = document.domain.replace("script.","").replace("csp.","").replace(".com","").replace("cyworld","global.cyworld");
		else
			docDomain = SPLoader.docDomain = document.domain.replace("script.","").replace("csp.","").replace(".com","").replace("nate","global.nate");
	else
		docDomain = SPLoader.docDomain = document.domain.replace("script.","").replace("csp.","").replace(".com","");	
}else if(typeof window.sp_global_lang != "undefined"){
	docDomain = SPLoader.docDomain = "global." + SPLoader.docDomain;
}

checkCulture();
BrowserContentLoaded(function() { SPLoader.initialize(); });
