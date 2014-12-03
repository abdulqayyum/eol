/**
 * jquery.Jcrop.min.js v0.9.10 (build:20120429)
 * jQuery Image Cropping Plugin - released under MIT License
 * Copyright (c) 2008-2012 Tapmodo Interactive LLC
 * https://github.com/tapmodo/Jcrop
 */
!function(e){e.Jcrop=function(t,i){function n(e){return e+"px"}function s(e){return M.baseClass+"-"+e}function o(){return e.fx.step.hasOwnProperty("backgroundColor")}function a(t){var i=e(t).offset(),n=$("body").outerHeight()-$("body").innerHeight();return[i.left,i.top+n]}function r(e){return[e.pageX-H[0],e.pageY-H[1]]}function l(t){"object"!=typeof t&&(t={}),M=e.extend(M,t),e.each(["onChange","onSelect","onRelease","onDblClick"],function(e,t){"function"!=typeof M[t]&&(M[t]=function(){})})}function c(e,t){if(H=a(q),mt.setCursor("move"===e?e:e+"-resize"),"move"===e)return mt.activateHandlers(h(t),g);var i=dt.getFixed(),n=d(e),s=dt.getCorner(d(n));dt.setPressed(dt.getCorner(n)),dt.setCurrent(s),mt.activateHandlers(u(e,i),g)}function u(e,t){return function(i){if(M.aspectRatio)switch(e){case"e":i[1]=t.y+1;break;case"w":i[1]=t.y+1;break;case"n":i[0]=t.x+1;break;case"s":i[0]=t.x+1}else switch(e){case"e":i[1]=t.y2;break;case"w":i[1]=t.y2;break;case"n":i[0]=t.x2;break;case"s":i[0]=t.x2}dt.setCurrent(i),ft.update()}}function h(e){var t=e;return gt.watchKeys(),function(e){dt.moveOffset([e[0]-t[0],e[1]-t[1]]),t=e,ft.update()}}function d(e){switch(e){case"n":return"sw";case"s":return"nw";case"e":return"nw";case"w":return"ne";case"ne":return"sw";case"nw":return"se";case"se":return"nw";case"sw":return"ne"}}function p(e){return function(t){return M.disabled?!1:"move"!==e||M.allowMove?(H=a(q),st=!0,c(e,r(t)),t.stopPropagation(),t.preventDefault(),!1):!1}}function f(e,t,i){var n=e.width(),s=e.height();n>t&&t>0&&(n=t,s=t/e.width()*e.height()),s>i&&i>0&&(s=i,n=i/e.height()*e.width()),it=e.width()/n,nt=e.height()/s,e.width(n).height(s)}function m(e){return{x:e.x*it,y:e.y*nt,x2:e.x2*it,y2:e.y2*nt,w:e.w*it,h:e.h*nt}}function g(){var e=dt.getFixed();e.w>M.minSelect[0]&&e.h>M.minSelect[1]?(ft.enableHandles(),ft.done()):ft.release(),mt.setCursor(M.allowSelect?"crosshair":"default")}function v(e){if(M.disabled)return!1;if(!M.allowSelect)return!1;st=!0,H=a(q),ft.disableHandles(),mt.setCursor("crosshair");var t=r(e);return dt.setPressed(t),ft.update(),mt.activateHandlers(_,g),gt.watchKeys(),e.stopPropagation(),e.preventDefault(),!1}function _(e){dt.setCurrent(e),ft.update()}function b(){var t=e("<div></div>").addClass(s("tracker"));return e.browser.msie&&t.css({opacity:0,backgroundColor:"white"}),t}function w(e){X.removeClass().addClass(s("holder")).addClass(e)}function k(e,t){function i(){window.setTimeout(_,h)}var n=e[0]/it,s=e[1]/nt,o=e[2]/it,a=e[3]/nt;if(!ot){var r=dt.flipCoords(n,s,o,a),l=dt.getFixed(),c=[l.x,l.y,l.x2,l.y2],u=c,h=M.animationDelay,d=r[0]-c[0],p=r[1]-c[1],f=r[2]-c[2],m=r[3]-c[3],g=0,v=M.swingSpeed;x=u[0],y=u[1],o=u[2],a=u[3],ft.animMode(!0);var _=function(){return function(){g+=(100-g)/v,u[0]=x+g/100*d,u[1]=y+g/100*p,u[2]=o+g/100*f,u[3]=a+g/100*m,g>=99.8&&(g=100),100>g?(T(u),i()):(ft.done(),"function"==typeof t&&t.call(vt))}}();i()}}function C(e){T([e[0]/it,e[1]/nt,e[2]/it,e[3]/nt]),M.onSelect.call(vt,m(dt.getFixed())),ft.enableHandles()}function T(e){dt.setPressed([e[0],e[1]]),dt.setCurrent([e[2],e[3]]),ft.update()}function E(){return m(dt.getFixed())}function S(){return dt.getFixed()}function P(e){l(e),A()}function j(){M.disabled=!0,ft.disableHandles(),ft.setCursor("default"),mt.setCursor("default")}function D(){M.disabled=!1,A()}function N(){ft.done(),mt.activateHandlers(null,null)}function O(){X.remove(),R.show(),e(t).removeData("Jcrop")}function L(e,t){ft.release(),j();var i=new Image;i.onload=function(){var n=i.width,s=i.height,o=M.boxWidth,a=M.boxHeight;q.width(n).height(s),q.attr("src",e),V.attr("src",e),f(q,o,a),U=q.width(),Y=q.height(),V.width(U).height(Y),lt.width(U+2*rt).height(Y+2*rt),X.width(U).height(Y),pt.resize(U,Y),D(),"function"==typeof t&&t.call(vt)},i.src=e}function I(e,t,i){var n=t||M.bgColor;M.bgFade&&o()&&M.fadeTime&&!i?e.animate({backgroundColor:n},{queue:!1,duration:M.fadeTime}):e.css("backgroundColor",n)}function A(e){M.allowResize?e?ft.enableOnly():ft.enableHandles():ft.disableHandles(),mt.setCursor(M.allowSelect?"crosshair":"default"),ft.setCursor(M.allowMove?"move":"default"),M.hasOwnProperty("trueSize")&&(it=M.trueSize[0]/U,nt=M.trueSize[1]/Y),M.hasOwnProperty("setSelect")&&(C(M.setSelect),ft.done(),delete M.setSelect),pt.refresh(),M.bgColor!=ct&&(I(M.shade?pt.getShades():X,M.shade?M.shadeColor||M.bgColor:M.bgColor),ct=M.bgColor),ut!=M.bgOpacity&&(ut=M.bgOpacity,M.shade?pt.refresh():ft.setBgOpacity(ut)),J=M.maxSize[0]||0,Z=M.maxSize[1]||0,et=M.minSize[0]||0,tt=M.minSize[1]||0,M.hasOwnProperty("outerImage")&&(q.attr("src",M.outerImage),delete M.outerImage),ft.refresh()}var H,M=e.extend({},e.Jcrop.defaults),z=!1;e.browser.msie&&"6"===e.browser.version.split(".")[0]&&(z=!0),"object"!=typeof t&&(t=e(t)[0]),"object"!=typeof i&&(i={}),l(i);var F={border:"none",visibility:"visible",margin:0,padding:0,position:"absolute",top:0,left:0},R=e(t),W=!0;if("IMG"==t.tagName){if(0!=R[0].width&&0!=R[0].height)R.width(R[0].width),R.height(R[0].height);else{var B=new Image;B.src=R[0].src,R.width(B.width),R.height(B.height)}var q=R.clone().removeAttr("id").css(F).show();q.width(R.width()),q.height(R.height()),R.after(q).hide()}else q=R.css(F).show(),W=!1,null===M.shade&&(M.shade=!0);f(q,M.boxWidth,M.boxHeight);var U=q.width(),Y=q.height(),X=e("<div />").width(U).height(Y).addClass(s("holder")).css({position:"relative",backgroundColor:M.bgColor}).insertAfter(R).append(q);M.addClass&&X.addClass(M.addClass);var V=e("<div />"),K=e("<div />").width("100%").height("100%").css({zIndex:310,position:"absolute",overflow:"hidden"}),Q=e("<div />").width("100%").height("100%").css("zIndex",320),G=e("<div />").css({position:"absolute",zIndex:600}).dblclick(function(){var e=dt.getFixed();M.onDblClick.call(vt,e)}).insertBefore(q).append(K,Q);W&&(V=e("<img />").attr("src",q.attr("src")).css(F).width(U).height(Y),K.append(V)),z&&G.css({overflowY:"hidden"});var J,Z,et,tt,it,nt,st,ot,at,rt=M.boundary,lt=b().width(U+2*rt).height(Y+2*rt).css({position:"absolute",top:n(-rt),left:n(-rt),zIndex:290}).mousedown(v),ct=M.bgColor,ut=M.bgOpacity;H=a(q);var ht=function(){function e(){var e,t={},i=["touchstart","touchmove","touchend"],n=document.createElement("div");try{for(e=0;e<i.length;e++){var s=i[e];s="on"+s;var o=s in n;o||(n.setAttribute(s,"return;"),o="function"==typeof n[s]),t[i[e]]=o}return t.touchstart&&t.touchend&&t.touchmove}catch(a){return!1}}function t(){return M.touchSupport===!0||M.touchSupport===!1?M.touchSupport:e()}return{createDragger:function(e){return function(t){return t.pageX=t.originalEvent.changedTouches[0].pageX,t.pageY=t.originalEvent.changedTouches[0].pageY,M.disabled?!1:"move"!==e||M.allowMove?(st=!0,c(e,r(t)),t.stopPropagation(),t.preventDefault(),!1):!1}},newSelection:function(e){return e.pageX=e.originalEvent.changedTouches[0].pageX,e.pageY=e.originalEvent.changedTouches[0].pageY,v(e)},isSupported:e,support:t()}}(),dt=function(){function e(e){e=a(e),f=d=e[0],m=p=e[1]}function t(e){e=a(e),u=e[0]-f,h=e[1]-m,f=e[0],m=e[1]}function i(){return[u,h]}function n(e){var t=e[0],i=e[1];0>d+t&&(t-=t+d),0>p+i&&(i-=i+p),m+i>Y&&(i+=Y-(m+i)),f+t>U&&(t+=U-(f+t)),d+=t,f+=t,p+=i,m+=i}function s(e){var t=o();switch(e){case"ne":return[t.x2,t.y];case"nw":return[t.x,t.y];case"se":return[t.x2,t.y2];case"sw":return[t.x,t.y2]}}function o(){if(!M.aspectRatio)return l();var e,t,i,n,s=M.aspectRatio,o=M.minSize[0]/it,a=M.maxSize[0]/it,u=M.maxSize[1]/nt,h=f-d,g=m-p,v=Math.abs(h),y=Math.abs(g),_=v/y;return 0===a&&(a=10*U),0===u&&(u=10*Y),s>_?(t=m,i=y*s,e=0>h?d-i:i+d,0>e?(e=0,n=Math.abs((e-d)/s),t=0>g?p-n:n+p):e>U&&(e=U,n=Math.abs((e-d)/s),t=0>g?p-n:n+p)):(e=f,n=v/s,t=0>g?p-n:p+n,0>t?(t=0,i=Math.abs((t-p)*s),e=0>h?d-i:i+d):t>Y&&(t=Y,i=Math.abs(t-p)*s,e=0>h?d-i:i+d)),e>d?(o>e-d?e=d+o:e-d>a&&(e=d+a),t=t>p?p+(e-d)/s:p-(e-d)/s):d>e&&(o>d-e?e=d-o:d-e>a&&(e=d-a),t=t>p?p+(d-e)/s:p-(d-e)/s),0>e?(d-=e,e=0):e>U&&(d-=e-U,e=U),0>t?(p-=t,t=0):t>Y&&(p-=t-Y,t=Y),c(r(d,p,e,t))}function a(e){return e[0]<0&&(e[0]=0),e[1]<0&&(e[1]=0),e[0]>U&&(e[0]=U),e[1]>Y&&(e[1]=Y),[e[0],e[1]]}function r(e,t,i,n){var s=e,o=i,a=t,r=n;return e>i&&(s=i,o=e),t>n&&(a=n,r=t),[s,a,o,r]}function l(){var e,t=f-d,i=m-p;return J&&Math.abs(t)>J&&(f=t>0?d+J:d-J),Z&&Math.abs(i)>Z&&(m=i>0?p+Z:p-Z),tt/nt&&Math.abs(i)<tt/nt&&(m=i>0?p+tt/nt:p-tt/nt),et/it&&Math.abs(t)<et/it&&(f=t>0?d+et/it:d-et/it),0>d&&(f-=d,d-=d),0>p&&(m-=p,p-=p),0>f&&(d-=f,f-=f),0>m&&(p-=m,m-=m),f>U&&(e=f-U,d-=e,f-=e),m>Y&&(e=m-Y,p-=e,m-=e),d>U&&(e=d-Y,m-=e,p-=e),p>Y&&(e=p-Y,m-=e,p-=e),c(r(d,p,f,m))}function c(e){return{x:e[0],y:e[1],x2:e[2],y2:e[3],w:e[2]-e[0],h:e[3]-e[1]}}var u,h,d=0,p=0,f=0,m=0;return{flipCoords:r,setPressed:e,setCurrent:t,getOffset:i,moveOffset:n,getCorner:s,getFixed:o}}(),pt=function(){function t(e,t){f.left.css({height:n(t)}),f.right.css({height:n(t)})}function i(){return s(dt.getFixed())}function s(e){f.top.css({left:n(e.x),width:n(e.w),height:n(e.y)}),f.bottom.css({top:n(e.y2),left:n(e.x),width:n(e.w),height:n(Y-e.y2)}),f.right.css({left:n(e.x2),width:n(U-e.x2)}),f.left.css({width:n(e.x)})}function o(){return e("<div />").css({position:"absolute",backgroundColor:M.shadeColor||M.bgColor}).appendTo(p)}function a(){d||(d=!0,p.insertBefore(q),i(),ft.setBgOpacity(1,0,1),V.hide(),r(M.shadeColor||M.bgColor,1),ft.isAwake()?c(M.bgOpacity,1):c(1,1))}function r(e,t){I(h(),e,t)}function l(){d&&(p.remove(),V.show(),d=!1,ft.isAwake()?ft.setBgOpacity(M.bgOpacity,1,1):(ft.setBgOpacity(1,1,1),ft.disableHandles()),I(X,0,1))}function c(e,t){d&&(M.bgFade&&!t?p.animate({opacity:1-e},{queue:!1,duration:M.fadeTime}):p.css({opacity:1-e}))}function u(){M.shade?a():l(),ft.isAwake()&&c(M.bgOpacity)}function h(){return p.children()}var d=!1,p=e("<div />").css({position:"absolute",zIndex:240,opacity:0}),f={top:o(),left:o().height(Y),right:o().height(Y),bottom:o()};return{update:i,updateRaw:s,getShades:h,setBgColor:r,enable:a,disable:l,resize:t,refresh:u,opacity:c}}(),ft=function(){function t(t){var i=e("<div />").css({position:"absolute",opacity:M.borderOpacity}).addClass(s(t));return K.append(i),i}function i(t,i){var n=e("<div />").mousedown(p(t)).css({cursor:t+"-resize",position:"absolute",zIndex:i}).addClass("ord-"+t);return ht.support&&n.bind("touchstart.jcrop",ht.createDragger(t)),Q.append(n),n}function o(e){var t=M.handleSize;return i(e,S++).css({opacity:M.handleOpacity}).width(t).height(t).addClass(s("handle"))}function a(e){return i(e,S++).addClass("jcrop-dragbar")}function r(e){var t;for(t=0;t<e.length;t++)j[e[t]]=a(e[t])}function l(e){var i,n;for(n=0;n<e.length;n++){switch(e[n]){case"n":i="hline";break;case"s":i="hline bottom";break;case"e":i="vline right";break;case"w":i="vline"}$[e[n]]=t(i)}}function c(e){var t;for(t=0;t<e.length;t++)P[e[t]]=o(e[t])}function u(e,t){M.shade||V.css({top:n(-t),left:n(-e)}),G.css({top:n(t),left:n(e)})}function h(e,t){G.width(e).height(t)}function d(){var e=dt.getFixed();dt.setPressed([e.x,e.y]),dt.setCurrent([e.x2,e.y2]),f()}function f(e){return E?g(e):void 0}function g(e){var t=dt.getFixed();h(t.w,t.h),u(t.x,t.y),M.shade&&pt.updateRaw(t),E||y(),e?M.onSelect.call(vt,m(t)):M.onChange.call(vt,m(t))}function v(e,t,i){(E||t)&&(M.bgFade&&!i?q.animate({opacity:e},{queue:!1,duration:M.fadeTime}):q.css("opacity",e))}function y(){G.show(),M.shade?pt.opacity(ut):v(ut,!0),E=!0}function _(){k(),G.hide(),M.shade?pt.opacity(1):v(1),E=!1,M.onRelease.call(vt)}function w(){D&&Q.show()}function x(){return D=!0,M.allowResize?(Q.show(),!0):void 0}function k(){D=!1,Q.hide()}function C(e){ot===e?k():x()}function T(){C(!1),d()}var E,S=370,$={},P={},j={},D=!1;M.dragEdges&&e.isArray(M.createDragbars)&&r(M.createDragbars),e.isArray(M.createHandles)&&c(M.createHandles),M.drawBorders&&e.isArray(M.createBorders)&&l(M.createBorders),e(document).bind("touchstart.jcrop-ios",function(t){e(t.currentTarget).hasClass("jcrop-tracker")&&t.stopPropagation()});var N=b().mousedown(p("move")).css({cursor:"move",position:"absolute",zIndex:360});return ht.support&&N.bind("touchstart.jcrop",ht.createDragger("move")),K.append(N),k(),{updateVisible:f,update:g,release:_,refresh:d,isAwake:function(){return E},setCursor:function(e){N.css("cursor",e)},enableHandles:x,enableOnly:function(){D=!0},showHandles:w,disableHandles:k,animMode:C,setBgOpacity:v,done:T}}(),mt=function(){function t(){lt.css({zIndex:450}),ht.support&&e(document).bind("touchmove.jcrop",a).bind("touchend.jcrop",l),d&&e(document).bind("mousemove.jcrop",n).bind("mouseup.jcrop",s)}function i(){lt.css({zIndex:290}),e(document).unbind(".jcrop")}function n(e){return u(r(e)),!1}function s(e){return e.preventDefault(),e.stopPropagation(),st&&(st=!1,h(r(e)),ft.isAwake()&&M.onSelect.call(vt,m(dt.getFixed())),i(),u=function(){},h=function(){}),!1}function o(e,i){return st=!0,u=e,h=i,t(),!1}function a(e){return e.pageX=e.originalEvent.changedTouches[0].pageX,e.pageY=e.originalEvent.changedTouches[0].pageY,n(e)}function l(e){return e.pageX=e.originalEvent.changedTouches[0].pageX,e.pageY=e.originalEvent.changedTouches[0].pageY,s(e)}function c(e){lt.css("cursor",e)}var u=function(){},h=function(){},d=M.trackDocument;return d||lt.mousemove(n).mouseup(s).mouseout(s),q.before(lt),{activateHandlers:o,setCursor:c}}(),gt=function(){function t(){M.keySupport&&(o.show(),o.focus())}function i(){o.hide()}function n(e,t,i){M.allowMove&&(dt.moveOffset([t,i]),ft.updateVisible(!0)),e.preventDefault(),e.stopPropagation()}function s(e){if(e.ctrlKey||e.metaKey)return!0;at=e.shiftKey?!0:!1;var t=at?10:1;switch(e.keyCode){case 37:n(e,-t,0);break;case 39:n(e,t,0);break;case 38:n(e,0,-t);break;case 40:n(e,0,t);break;case 27:M.allowSelect&&ft.release();break;case 9:return!0}return!1}var o=e('<input type="radio" />').css({position:"fixed",left:"-120px",width:"12px"}),a=e("<div />").css({position:"absolute",overflow:"hidden"}).append(o);return M.keySupport&&(o.keydown(s).blur(i),z||!M.fixedSupport?(o.css({position:"absolute",left:"-20px"}),a.append(o).insertBefore(q)):o.insertBefore(q)),{watchKeys:t}}();ht.support&&lt.bind("touchstart.jcrop",ht.newSelection),Q.hide(),A(!0);var vt={setImage:L,animateTo:k,setSelect:C,setOptions:P,tellSelect:E,tellScaled:S,setClass:w,disable:j,enable:D,cancel:N,release:ft.release,destroy:O,focus:gt.watchKeys,getBounds:function(){return[U*it,Y*nt]},getWidgetSize:function(){return[U,Y]},getScaleFactor:function(){return[it,nt]},getOptions:function(){return M},ui:{holder:X,selection:G}};return e.browser.msie&&X.bind("selectstart",function(){return!1}),R.data("Jcrop",vt),vt},e.fn.Jcrop=function(t,i){var n;return this.each(function(){if(e(this).data("Jcrop")){if("api"===t)return e(this).data("Jcrop");e(this).data("Jcrop").setOptions(t)}else"IMG"==this.tagName?e.Jcrop.Loader(this,function(){e(this).css({display:"block",visibility:"hidden"}),n=e.Jcrop(this,t),e.isFunction(i)&&i.call(n)}):(e(this).css({display:"block",visibility:"hidden"}),n=e.Jcrop(this,t),e.isFunction(i)&&i.call(n))}),this},e.Jcrop.Loader=function(t,i,n){function s(){a.complete?(o.unbind(".jcloader"),e.isFunction(i)&&i.call(a)):window.setTimeout(s,50)}var o=e(t),a=o[0];o.bind("load.jcloader",s).bind("error.jcloader",function(){o.unbind(".jcloader"),e.isFunction(n)&&n.call(a)}),a.complete&&e.isFunction(i)&&(o.unbind(".jcloader"),i.call(a))},e.Jcrop.defaults={allowSelect:!0,allowMove:!0,allowResize:!0,trackDocument:!0,baseClass:"jcrop",addClass:null,bgColor:"black",bgOpacity:.6,bgFade:!1,borderOpacity:.4,handleOpacity:.5,handleSize:7,aspectRatio:0,keySupport:!0,createHandles:["n","s","e","w","nw","ne","se","sw"],createDragbars:["n","s","e","w"],createBorders:["n","s","e","w"],drawBorders:!0,dragEdges:!0,fixedSupport:!0,touchSupport:null,shade:null,boxWidth:0,boxHeight:0,boundary:2,fadeTime:400,animationDelay:20,swingSpeed:3,minSelect:[0,0],maxSize:[0,0],minSize:[0,0],onChange:function(){},onSelect:function(){},onDblClick:function(){},onRelease:function(){}}}(jQuery);