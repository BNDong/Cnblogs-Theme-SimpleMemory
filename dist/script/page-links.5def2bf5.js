"use strict";(self.webpackChunkCnblogs_Theme_SimpleMemory=self.webpackChunkCnblogs_Theme_SimpleMemory||[]).push([[9583],{1099:function(i,n,l){l.r(n),l.d(n,{default:function(){return o}});var a=l(8103),e='<div class="links-item"> <img src="##avatar##"> <p class="links-info"> <span class="links-info-name">##name##</span> <span class="links-info-text">##introduction##</span> </p> <div class="links-icon"> <a href="##url##" target="_blank" title="访问链接"><i class="iconfont ##icon##"></i></a> </div> </div>';function o(i){(0,a.default)(i),(()=>{if(i.__config.links.page.length){let n=$("#cnblogs_post_body"),l="";l+='<div id="links-box">',$.each(i.__config.links.page,(function(n){let a=i.__config.links.page[n];l+=i.__tools.batchTempReplacement(e,[["avatar",void 0!==a.avatar?a.avatar:""],["name",void 0!==a.name?a.name:""],["introduction",void 0!==a.introduction?a.introduction:""],["url",void 0!==a.url?a.url:""],["icon",n%3==0?"icon-zhifeiji":n%3==1?"icon-like_fill":"icon-flashlight_fill"]])})),l+="</div>";let a=$(".articleSuffix-flg");a.length?a.before(l):n.append(l)}})()}}}]);