/**
 * Copyright 2007 SK Communications. All rights reserved
 * @since 2006.12.06
 * @author okjungsoo
 * 
 * Cookie를 handling하는 Object입니다. 
 * Cookie관련 reference library는 dojo.io.cookie입니다. 
 * 기존의 Cookie관련 메소드들의 변화는 다음과 같습니다. 
 *  1. setCookie => setCookie
 *  2. getCookie => getCookie
 * 
 *   deprecated method
 *  3. getArrCookie()
 *  4. getCookieVal() 
 *  5. searchCookie()
 */
var Cookie = {
	getCookie: function(name){
		var index = document.cookie.lastIndexOf(name +"=");
		if(index != -1){
			var startIndex = index +name.length +1;
			var endIndex = document.cookie.indexOf(";", startIndex);
			
			if(endIndex == -1){
				return unescape(document.cookie.substring(startIndex));
			}else{
				return unescape(document.cookie.substring(startIndex, endIndex));
			}
		}
		return "";
	},
	
	setCookie: function(name, value, expires, path, domain, secure){
		var currentDate = new Date();
		var expireAfterHour = new Date(currentDate.getTime() + 1000*3600).toUTCString();
		
		expires = expires ? expires : expireAfterHour;

		document.cookie = name + "=" + escape(value) + ";" + 
			(expires? "expires=" +expires + ";": "") + 
			(path? "path=" +path +";" : "") +
			(domain? "domain=" +domain +";" : "") +
			(secure? "secure" : "");
	},
	
	/**
	 * document.cookie에 특정 name을 가진 값을 공백처리하고 현재시간의 한시간 
	 * 전으로 expire_date를 설정합니다. 
	 * @param name
	 * @param path
	 * @param domain
	 */
	deleteCookie: function(name, path, domain){
		if(this.getCookie(name)){
			var currentDate = new Date();
			var expireDate = new Date(currentDate.getTime()- 1000*3600).toUTCString();
			
			this.setCookie(name, "", expireDate, path, domian);
		}
	}
};