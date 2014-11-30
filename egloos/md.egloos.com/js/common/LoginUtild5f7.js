/**
 * @requires prototype.js, Popup.js, StringUtil.js
 */
var LoginUtil = {

    tab: 'egloos.com',

	runAuth: function(form) {
		if(StringUtil.hasNothing(form.userid) || StringUtil.hasNothing(form.userpwd)) {
			return false;
		}else if(StringUtil.getExactByteCount(form.userid, true) > 50){
			alert("입력된 아이디의 길이가 50byte가 넘습니다. 줄여주십시요.");
			return false;
		}else {
			form.action = "https://sec.egloos.com/login/sauthid.php";
			return true;
		}
	},
	runAuthMobile: function(form) {
		if(StringUtil.hasNothing(form.userid) || StringUtil.hasNothing(form.userpwd)) {
			return false;
		}else if(StringUtil.getExactByteCount(form.userid, true) > 50){
			alert("입력된 아이디의 길이가 50byte가 넘습니다. 줄여주십시요.");
			return false;
		}else {
			return true;
		}
	},

	runAuthMain: function(form) {

        
		if(this.tab == 'egloos.com') {
            if (StringUtil.hasNothing(form.userid) || StringUtil.hasNothing(form.userpwd)) {
    			return false;
            }
            if (StringUtil.getExactByteCount(form.userid, true) > 50)  {
	    		alert("입력된 아이디의 길이가 50byte가 넘습니다. 줄여주십시요.");
                return false;
            }
            form.frm.value = '';
		}
        
        if(this.tab == 'nate.com') {
            if (StringUtil.hasNothing(form.userid_nate) || StringUtil.hasNothing(form.userpwd_nate)) {
			    return false;
            }
            if (StringUtil.getExactByteCount(form.userid_nate, true) > 50)  {
	    		alert("입력된 아이디의 길이가 50byte가 넘습니다. 줄여주십시요.");
                return false;
            }

            form.userid.value = form.userid_nate.value;
            form.userpwd.value = form.userpwd_nate.value;
		} 

        form.submit();
	},
	
	findPassword: function() {
		Popup.openWindow('https://sec.egloos.com/info/findpwd_view.php', 'chkpwd', 400, 450, false, false, false, false);
	},

	findPasswordNate: function() {
		Popup.openWindow('https://sec.egloos.com/info/findpwd_view.php?num=1', 'chkpwd', 400, 450, false, false, false, false);

	},


    selectTab: function	(dom) {

        if (dom == 'nate.com') {
            $('frm').value = 'nate.com';
        } else {
            $('frm').value = '';
        }

        this.tab = dom;

        if (this.tab == 'egloos.com') {
           
            $('pcsaveid').disabled = false;
            $('lbtn').update('<button type="submit" name="lbtn" value="로그인" tabindex="3" onclick="statClick(\'egsm1\',\'RLT13\');">로그인</button>');
            $('tabBtnEgloos').className ='egloos_on';
            $('tabBtnNate').className = 'nate_off';
            $('tabLoginEgloos').style.display = 'block';
            $('tabLoginNate').style.display = 'none';

            $('findPwd').style.display = '';
            $('findPwdNate').style.display = 'none';

            if(getCookie('ps')) {
   		        $('userpwd').focus();
            } else {
      		    $('userid').focus();
            }

        } else if (this.tab == 'nate.com') {
            
            $('pcsaveid').disabled = true;
            $('lbtn').update('');
            $('tabBtnEgloos').className ='egloos_off';
            $('tabBtnNate').className = 'nate_on';
            $('tabLoginEgloos').style.display = 'none';
            $('tabLoginNate').style.display = 'block';

            $('findPwd').style.display = 'none';
            $('findPwdNate').style.display = '';

		    $('userid_nate').focus();

        }
    }
}
