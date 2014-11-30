 /**
 * Copyright 2007 SK Communications. All rights reserved
 * @since 2007.01.02
 * @author okjungsoo
 * 
 * String과 관련한 Util 성격의 메소드를 제공합니다. 
 */
 
var StringUtil = {
	MSG_FORM_HAS_NOTHING: "본 내용에는 반드시 값을 입력하셔야 합니다.\nAll blank characters are assumed Nothing, Please reenter!",
	
	/**
	 * @return 인자로 받는 string의 앞과 뒤의 공백을 제거한후 이를 리턴합니다. 
	 */
	trim: function(string){
		return string.replace(/^\s+/, "").replace(/\s+$/, "");	
	},
	
	/**
	 * form 또는 String을 인자로 받아서 target의 char를 확인하여 byte 개수를 계산하여 리턴합니다. 
	 * ※ 2byte 문자는 3개로 계산합니다. - php에서 2byte로 계산하는 경우 맞지 않는 경우 존재 by skymind
	 * 
	 * @param target form 또는 String 값을 받습니다. 
	 */
	getExactByteCount: function(target, isMultipleTwo){
		if(target.nodeType && target.nodeType ==1 && target.value){
			var targetValue = target.value;
		}else{
			var targetValue = target;
		}

	    var byte1Count = 0, byte2Count = 0;
	    
	    for(var i = 0; i < targetValue.length; i++) {
	    	if(this.is1ByteChar(targetValue.charAt( i ))){
	            byte1Count++;	    		
	    	}else{
	            byte2Count++;	    		
	    	}
	    }
	    
		if(isMultipleTwo) {
			return( byte1Count + byte2Count * 2 );
		} else {
			return( byte1Count + byte2Count * 3 );			
		}    
	}, 

	/**
	 * @return 인자로 들어온 char가 1byte인지를 체크합니다. 
	 */	
	is1ByteChar: function(eachChar){
	    var specialset = " `~!@#$%^&*()_+|\\=-[]{};':\",./<>?";		
		
		if(((eachChar >= '0') && (eachChar <= '9')) || ((eachChar >= 'A') && (eachChar <= 'Z')) || 
	        		((eachChar >= 'a') && (eachChar <= 'z')) || ((eachChar == '-') || (eachChar == '_')) ){
			return true;
		}else if(eachChar == '(' || eachChar == ')'){
			return true;
		}else if(specialset.indexOf(eachChar) != -1){
			return true;
		}
		return false;
	}, 
	
	isNothing: function(formName) {
	    var value = formName.value;
	    if(value.length == 0) {
	        alert( "본 내용에는 반드시 값을 입력하셔야 합니다.\nPlease enter valid value into this field" );
	        formName.focus();
	        return true;
	    }
		count = 0;
	    for(var i = 0; i < value.length; i++) {
	        thischar = value.charAt(i);
	        if(thischar == ' ') {
	        	count++;
	        }
	    }
	    if(count == value.length) {
	    	alert(this.MSG_FORM_HAS_NOTHING);
	        formName.focus();
		    return true;
		}
		return false;
	}, 
	
	/**
	 * @requires prototype.js
	 */
	hasNothing: function(form) {
		if((form.value).blank()) {
			alert(this.MSG_FORM_HAS_NOTHING);
			form.focus();
			return true;
		}else {
			return false;
		}
	}, 
	
	/**
	 * num에서 value를 체크하는 이유는 form.value를 처리하기 위함입니다. 
	 */
	isNumeric: function(num) {
		var _isNumericParam = function(_num) {
			if(typeof(_num) == 'string' && _num.match(/^[0-9]+$/)) {
				return true;
			} else {
				return false;
			}
		};
		
		if(num != null 
				&& (typeof(num) == 'number' 
					|| _isNumericParam(num) 
					|| _isNumericParam(num.value))) {
			return true;
		}
		return false;
	}, 
	
	ESCAPE_CHARS: $A(['`', ' ', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '+', '|', '\\', '}', ']', '{', '[', '\'', ':', ';', '?', 'http://sec.egloos.com/', '>', '<', '.', ',', '­', '"', '	']),
	
	/**
	 * @param str
	 * @return esc char의 발생 횟수를 리턴합니다. 
	 * ※ ap의 chkEscapeChar를 옮긴 메소드입니다. 
	 */
	checkEscChar: function(str) {
		var numOfOccurence = 0;
		this.ESCAPE_CHARS.each(function(_char){
			if(str.include(_char)) {
				numOfOccurence +=1;
			}
		});
		return numOfOccurence;
	},
	
	/*
	 * @author : shjeon@skcomms.co.kr
	 * @date : 2011-06-22
	 * @description : 원하는 만큼의 한글(2byte) 영문(1byte) 계산하여 len 만큼 자른 문자열 반환.
	 * */
	ByteLeft: function(str,len){
		var inc = 0;
		var nbytes = 0;
		var msg = "";
		var msglen = str.length;

		for (i=0; i<msglen; i++) {
			var ch = str.charAt(i);
			
			if (escape(ch).length > 4) 
			{
				inc = 2;
			} 
			else if (ch == '\n') 
			{
				if (str.charAt(i-1) != '\r') 
				{
					inc = 1;
				}
			} 
			else if (ch == '<' || ch == '>') 
			{
				inc = 4;
			} 
			else 
			{
				inc = 1;
			}
			if ((nbytes + inc) > len)
			{
				break;
			}
			
			nbytes += inc;
			msg += ch;
		}

		return msg;
	}
};
