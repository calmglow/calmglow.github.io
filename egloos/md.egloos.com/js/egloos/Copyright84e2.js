/**
 * Copyright 2007 SK Communications. All rights reserved
 * @since 2007.03.26
 * @author okjungsoo
 * @requires prototype.js, Cookie.js
 * 
 * Copyright 구문을 출력해주는 클래스입니다. Copyright 마지막에 
 * http://stategloos.egloos.com/stat/stat.tiff과 뒤의 파라미터를 사용하여 어느페이지가
 * 어느정도 호출되었는지를 측정하는데 사용됩니다. 
 */

var Copyright = {
	copyrightTemplate: new Template(
		"	<div id=\"footer\">" +
		"	Copyrightⓒ ZUM internet. All rights reserved.  &nbsp; " +
		"	 <a href=\"http://www.egloos.com/rules/provision.php\">이용약관</a>" +
		"	 | <a href=\"http://www.egloos.com/rules/privacy.php\"><strong>개인정보취급방침</strong></a>" +
		"	 | <a href=\"#\" onclick=\"window.open('http://www.egloos.com/emailreject.php','','width=400, height=270');\">이메일 수집거부</a>" +
		"	 | <a href=\"http://help.zum.com/inquiry\">고객센터</a>" +
		"	</div>" +
		"	#{statImage}"
	),
	
	statImgTemplate: new Template(
		""	// 안쓰는 통계 url
	),
	
	
	initialize: function() {
		Event.observe(window, 'load', function(){			
			var footerDiv = $('footer');
			
			if(footerDiv) {
				this.appendStat(footerDiv);
			}else {
				var bodyTag = document.getElementsByTagName("body")[0];				
				var divElm = $(document.createElement("div"));
				divElm.update(this.getStatTag());
				bodyTag.appendChild(divElm);
			}
		}.bindAsEventListener(this));
	},
	
	
	/**
	 * 현재 페이지의 위치에 따라서, Copyright을 출력해 줍니다. 
	 * @deprecated /template/home_header.php를 사용하시기 바랍니다. 
	 * @param isTemplateOnly Copyright.js를 import한 것만으로 stat 이미지가 생성이 됩니다. 
	 * 			필요에 의해서 StatTag를 추가하시기를 원한다면 인자를 넘겨주세요. 
	 */
	print: function(isTemplateOnly) {
		if(typeof(isTemplateOnly) == 'undefined') {
			isTemplateOnly = true;
		}
		var statTag = (isTemplateOnly? "": this.getStatTag());
		var html = this.copyrightTemplate.evaluate({
			statImage: statTag
		});
	    document.writeln(html);
	}, 
	
	appendStat: function(footerDiv) {
		new Insertion.After(footerDiv, this.getStatTag());
	},

	/**
	 * 현재 페이지의 위치에 따라서, Copyright을 출력해 줍니다. 
	 */
	getStatTag: function() {
        return ''; 

	    if(typeof(document.location.href) == "unknown") {
	        url = "http://egloos.egloos.com/";
	    }else {
	        var url = document.location.href;
	    }
	    url = url.replace(/(http|https)\:\/\//gi,"");
	    var host = url.substring(0, url.indexOf("."));

		var spchost;
		var spcuri = "";

		switch(host){
			case "www":
			case "sec": //for test
				spchost = "www";
				spcuri = this._getSpcURIinWWW(url);
				break;
			case "valley":
				spchost = "valley";
				spcuri = this._getSpcURIinValley(url);
                if(!spcuri) {
                    spcuri = "http://sec.egloos.com/theme/all/";
                }                
				break;
			case "garden":
				spchost = "garden";			
				break;
			case "finder":
				spchost = "finder";
				if(this.include(url, "http://sec.egloos.com/per_finder.php")) {
					spcuri = "http://sec.egloos.com/per/";
				}
				break;
			case "apicenter":
				spchost = "www";
				spcuri = "http://sec.egloos.com/apicenter/";
				break;
			default:
				spchost = "egloo";
				spcuri = this._getSpcURI(url);
				break;
		}

        // ndr cookie set
        this.setNDR();

        var ud3 = Cookie.getCookie("UD3");
        if(ud3) {
            ud3 = ud3.match(/^[a-zA-Z0-9]+$/);
            if(ud3 == null) {
                ud3 = '';
            }
        }
        
        var ndrn = Cookie.getCookie("ndrn");
        if(ndrn) {
            ndrn = ndrn.match(/^[a-zA-Z0-9|=%]+$/);
            if(ndrn == null) {
                ndrn = '';
            }
        } else { 
            var ndrn = Cookie.getCookie("ndr");
            if(ndrn) {
                ndrn = ndrn.match(/^[a-zA-Z0-9|=%]+$/);
                if(ndrn == null) {
                    ndrn = '';
                }
            } 
        }
        var extParam = "??ndru3=" + ud3;
        extParam += "&ndrl3=" + ndrn;

        spcuri = spcuri + extParam;
        return this.statImgTemplate.evaluate({'spchost':spchost, 'spcuri':spcuri});
	}, 	
	
	_getSpcURIinWWW: function(url){
		var spcuri = "";

		if(this.include(url, "http://sec.egloos.com/www.egloos.com/index.php") || url == 'http://sec.egloos.com/www.egloos.com/' ) {
			spcuri = "";
		} else if(this.include(url, "http://sec.egloos.com/support.php")) {
			spcuri = "http://sec.egloos.com/support/";
		} else if(this.include(url, "/login") ||  this.include(url, "http://sec.egloos.com/popup_keyboard_security.php")) {
			spcuri = "http://sec.egloos.com/login/";
		} else if(this.include(url, "/signup") || this.include(url, "http://sec.egloos.com/emailreject.php")) {
			spcuri = "http://sec.egloos.com/signup/";
		}else if(this.include(url, "/post")) {
			spcuri = "http://sec.egloos.com/post/";
		}else if(this.include(url, "/recent")) {
			spcuri = "http://sec.egloos.com/recent/";
		}else if(this.include(url, "/popular")) {
			spcuri = "http://sec.egloos.com/popular/";
		}else if(this.include(url, "/popular")) {
			spcuri = "http://sec.egloos.com/popular/";
		}else if(this.include(url, "http://sec.egloos.com/adm/")) {
			spcuri = "http://sec.egloos.com/admin/";
			if(this.include(url, "http://sec.egloos.com/adm/photo/")) {
				spcuri += "http://sec.egloos.com/photo/";
			}else if(this.include(url, "http://sec.egloos.com/adm/stat/"))	{
				spcuri += "http://sec.egloos.com/stat/";
			}else if(this.include(url, "http://sec.egloos.com/adm/skin2/"))	{
				spcuri += "http://sec.egloos.com/design/";
			}
		}else if(this.include(url, "http://sec.egloos.com/egloo/")) {
			spcuri = "http://sec.egloos.com/egloo/";
			if(this.include(url, "http://sec.egloos.com/egloo/insert.php") || this.include(url, "http://sec.egloos.com/egloo/lifelog_insert_pp.php")) {
				spcuri += "http://sec.egloos.com/post/";
			}else if(this.include(url, "http://sec.egloos.com/egloo/lifelog_insert_pp.php")) {
				spcuri += "http://sec.egloos.com/post/";
			}
		}else if(this.include(url, "http://sec.egloos.com/photo/")) {
			spcuri = "http://sec.egloos.com/egloo/";
			if(this.include(url, "http://sec.egloos.com/photo/album_insert.php")) {
				spcuri += "http://sec.egloos.com/photo/";
			}
		}else if(this.include(url, "/eofeeling")) {
			spcuri = "http://sec.egloos.com/eofeeling/";
		}
		return spcuri;
	}, 
	
	_getSpcURIinValley: function(url){
		var spcuri = "";		

		if(this.include(url, "http://sec.egloos.com/gd_valley.php") 
				|| this.include(url, "/garden")) {
			spcuri = "http://sec.egloos.com/garden/";
		}else if(this.include(url, "/theme") 
				|| this.include(url, "http://sec.egloos.com/eg_valley.php?slt=theme")) {
            if( this.include(url, "/theme") ) {
                var idx = url.indexOf("http://sec.egloos.com/theme/") + "/theme/".length;
                var tempuri = url.substring(idx);
                var temp = tempuri.split("http://sec.egloos.com/");
                if(temp[0]) {
                    spcuri = "theme/"+ temp[0] + "/";
                } else {
    			    spcuri = "http://sec.egloos.com/theme/";
                }
            } else {
    			spcuri = "http://sec.egloos.com/theme/";
            }
		}else if(this.include(url, "/trackback")
				|| this.include(url, "http://sec.egloos.com/weeklytheme.php")) {
			spcuri = "http://sec.egloos.com/trackback/";
		}else if(this.include(url, "/tag") 
				|| this.include(url, "http://sec.egloos.com/eg_valley.php?slt=tag")) {
			spcuri = "http://sec.egloos.com/tag/";
		}else if(this.include(url, "/emotion")) {
			spcuri = "http://sec.egloos.com/emotion/";
		}else if(this.include(url, "/hotpotato")) {
			spcuri = "http://sec.egloos.com/hotpotato/";
		}else if(this.include(url, "/review")) {
			spcuri = "http://sec.egloos.com/review/";
		}else if(this.include(url, "/lifelog")) {
			spcuri = "http://sec.egloos.com/lifelog/";
		}else if(this.include(url, "/center")) {
			spcuri = "http://sec.egloos.com/center/";
		}else if(this.include(url, "http://sec.egloos.com/my_valley.php") 
				|| this.include(url, "http://sec.egloos.com/frm/") 
				|| this.include(url, "/my")) {
			spcuri = "http://sec.egloos.com/my/";
			if (this.include(url, "/adm")) {
				if (this.include(url, "http://sec.egloos.com/admin_announce.php")) {
					spcuri += "http://sec.egloos.com/admin_alert/";
				} else if (this.include(url, "http://sec.egloos.com/comment.php")) {
					spcuri += "http://sec.egloos.com/admin_comment/";
                } else if (this.include(url, "http://sec.egloos.com/egloo.php")) {
                    spcuri += "http://sec.egloos.com/admin_egloo/";
                } else if (this.include(url, "http://sec.egloos.com/rss.php")) {
                    spcuri += "http://sec.egloos.com/admin_rss/";
                } else if (this.include(url, "http://sec.egloos.com/tag.php")) {
                    spcuri += "http://sec.egloos.com/admin_tag/";
                } else if (this.include(url, "http://sec.egloos.com/recommend.php")) {
                    spcuri += "http://sec.egloos.com/admin_recommend/";
				}
			} else if(this.include(url, "http://sec.egloos.com/announce_list.php")) {
			    spcuri += "http://sec.egloos.com/alert/";
			} else if (this.include(url, "http://sec.egloos.com/comment_tracking.php")) {
			    spcuri += "http://sec.egloos.com/comment/";
			} else if (this.include(url, "http://sec.egloos.com/post_list.php")) {
			    if (this.include(url, "c=garden")) {
			        spcuri += "http://sec.egloos.com/garden/";
			    } else if (this.include(url, "c=rss")) {
			        spcuri += "http://sec.egloos.com/rss/";
			    } else if (this.include(url, "c=tag")) {
			        spcuri += "http://sec.egloos.com/tag/";
			    } else {
			        spcuri += "http://sec.egloos.com/addlink/";
			    }
			} else if (this.include(url, "http://sec.egloos.com/recommend.php")) {
			    if (this.include(url, "con=attention")) {
			        spcuri += "http://sec.egloos.com/popular/";
			    }
			    else {
			        spcuri += "http://sec.egloos.com/recommend/";
			    }
			} else if (this.include(url, "http://sec.egloos.com/lifelog_list.php")) {
			    spcuri += "http://sec.egloos.com/lifelog/";
			} else if (this.include(url, "http://sec.egloos.com/checkpost_list.php")) {
			    spcuri += "http://sec.egloos.com/checkpost/";
			}
		} else if (this.include(url, "http://sec.egloos.com/?url=")) {
            spcuri += "?url=/";
        } else if(this.include(url, "/reader")) {
            if( this.include(url, "/reader") ) {
                var idx = url.indexOf("http://sec.egloos.com/reader/") + "/reader/".length;
                var tempuri = url.substring(idx);
                var temp = tempuri.split("http://sec.egloos.com/");
                if(temp[0]) {
                    spcuri = "treader/"+ temp[0] + "/";
                } else {
    			    spcuri = "http://sec.egloos.com/treader/all/";
                }
            } else {
    			spcuri = "http://sec.egloos.com/treader/all/";
            }
        }
		return spcuri;
	}, 
	
	_getSpcURI: function(url){
		var spcuri = "";		
		if(this.include(url, "/photo")) {
			spcuri = "http://sec.egloos.com/photo/";
		}else if(this.include(url, "/garden")) {
			spcuri = "http://sec.egloos.com/garden/";
		}else if(this.include(url, "/lifelog")) {
			spcuri = "http://sec.egloos.com/lifelog/";
		}else if(this.include(url, "/lifelog")) {
			spcuri = "http://sec.egloos.com/lifelog/";
		}
		return spcuri;		
	}, 
	
    
	include: function(str, pattern) {
		return str.indexOf(pattern) > -1;
	},

    setNDR: function() {
        var Ctmpndr = Cookie.getCookie("tmpndr");
        var Ukey = Cookie.getCookie("u");
        if ( ( Ukey != null && Ukey != "" ) && ( Ctmpndr != null && Ctmpndr != "" )   )	{
            // ndr cookie set
            var Undr = "||" + unescape(Ctmpndr)
            Cookie.setCookie("ndrn", Undr , null, "http://sec.egloos.com/", ".egloos.com", false);
            // Ctmpndr delete
            var del_expired_data = new Date(2001,1,1);
            Cookie.setCookie("tmpndr", "" , del_expired_data, "http://sec.egloos.com/", ".egloos.com",false);
        }
    }
};

Copyright.initialize();


