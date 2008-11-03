/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 3.0.0pr1
*/
YUI.add("io",function(C){var E="io:xdrReady",q="io:start",G="io:complete",F="io:success",W="io:failure",j="io:abort",l=C.config.win,x=C.config.doc,t=0,M={"X-Requested-With":"XMLHttpRequest"},R={},f={},Q={flash:null},r=[],S=1,m=false;function L(Y,w){if(m===false||r.length<m){var d=i();r.push({uri:Y,id:d,cfg:w});}else{return false;}if(S===1){h();}return d;}function B(z){var d;for(var Y=0;Y<r.length;Y++){if(r[Y].id===z){d=r.splice(Y,1);var w=r.unshift(d[0]);break;}}}function h(){var Y=r.shift();g(Y.uri,Y.cfg,Y.id);}function J(Y){if(Y){m=Y;return Y;}else{return r.length;}}function c(){var Y=(r.length>m>0)?m:r.length;if(Y>1){for(var d=0;d<Y;d++){h();}}else{h();}}function T(){S=0;}function e(d){if(C.Lang.isNumber(d)){for(var Y=0;Y<r.length;Y++){if(r[Y].id===d){r.splice(Y,1);break;}}}}function g(w,AC){var AC=AC||{};var AB=X((arguments.length===3)?arguments[2]:null,AC);var Y=(AC.method)?AC.method.toUpperCase():"GET";var AA=(AC.data)?AC.data:null;if(AC.form){var z=u(AC.form);if(AA){z+="&"+AA;}if(Y==="POST"){AA=z;b("Content-Type","application/x-www-form-urlencoded");}else{if(Y==="GET"){w=n(w,z);}}}else{if(AA&&Y==="GET"){w=n(w,AC.data);}else{if(AA&&Y==="POST"){b("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");}}}if(AC.xdr){if(AC.on){f[AB.id]=AC.on;}if(AA&&Y!=="GET"){AC.data=AA;}AB.c.send(w,AC,AB.id);return AB;}if(AC.timeout){o(AB,AC);}AB.c.onreadystatechange=function(){N(AB,AC);};a(AB.c,Y,w);K(AB.c,(AC.headers||{}));k(AB,(AA||""),AC);AB.abort=function(){H(AB,AC);};AB.isInProgress=function(){return AB.c.readyState!==4&&AB.c.readyState!==0;};return AB;}function U(d,w){var Y=new C.Event.Target().publish("transaction:"+d);Y.subscribe(w.on[d],(w.context||this),w.arguments);return Y;}function V(Y){C.fire(E,Y);}function P(w,d){d.on=d.on||{};var Y;if(f[w]&&f[w].start){d.on.start=f[w].start;}C.fire(q,w);if(d.on.start){Y=U("start",d);Y.fire(w);}}function Z(d,w){w.on=w.on||{};var Y;C.fire(G,d.id,d.c);if(w.on.complete){Y=U("complete",w);Y.fire(d.id,d.c);}}function s(d,w){w.on=w.on||{};var Y;if(f[d.id]&&f[d.id].success){w.on.success=f[d.id].success;delete f[d.id];d.c.responseText=decodeURI(d.c.responseText);}C.fire(F,d.id,d.c);if(w.on.success){Y=U("success",w);Y.fire(d.id,d.c);}O(d,(w.xdr)?true:false);}function I(d,w){w.on=w.on||{};var Y;if(f[d.id]&&f[d.id].failure){w.on.failure=f[d.id].failure;delete f[d.id];d.c.responseText=decodeURI(d.c.responseText);}C.fire(W,d.id,d.c);if(w.on.failure){Y=U("failure",w);Y.fire(d.id,d.c);}O(d,(w.xdr)?true:false);}function H(d,w){w.on=w.on||{};var Y;if(d&&d.c&&!w.xdr){d.c.abort();if(w){if(w.timeout){D(d.id);}}}if(f[d.id]&&f[d.id].abort){w.on.abort=f[d.id].abort;delete f[d.id];}C.fire(j,d.id);if(w.on.abort){Y=U("abort",w);Y.fire(id);}O(d,(w.xdr)?true:false);}function y(){return(l.XMLHttpRequest)?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");}function p(w,z){var Y=C.Node.get("body");var d='<object id="yuiSwfIo" type="application/x-shockwave-flash" data="'+w+'" width="0" height="0">';d+='<param name="movie" value="'+w+'">';d+='<param name="FlashVars" value="yid='+z+'">';d+='<param name="allowScriptAccess" value="sameDomain">';d+="</object>";Y.appendChild(C.Node.create(d));Q.flash=x.getElementById("yuiSwfIo");}function i(){var Y=t;t++;return Y;}function X(Y,w){var d={};d.id=C.Lang.isNumber(Y)?Y:i();if(w&&w.xdr){d.c=Q[w.xdr.use];}else{d.c=y();}return d;}function n(Y,w){Y+=((Y.indexOf("?")==-1)?"?":"&")+w;return Y;}function b(Y,d){if(d){M[Y]=d;}else{delete M[Y];}}function A(Y){switch(Y.id){case"flash":p(Y.src,Y.yid);break;}}function K(w,Y){var d;for(d in M){if(M.hasOwnProperty(d)){Y[d]=M[d];}}for(d in Y){if(Y.hasOwnProperty(d)){w.setRequestHeader(d,Y[d]);}}}function a(w,Y,d){w.open(Y,d,true);}function k(w,Y,z){w.c.send(Y);P(w.id,z);}function o(Y,d){R[Y.id]=l.setTimeout(function(){H(Y,d);},d.timeout);}function D(Y){l.clearTimeout(R[Y]);delete R[Y];}function N(Y,d){if(Y.c.readyState===4){if(d.timeout){D(Y.id);}Z(Y,d);v(Y,d);}}function v(w,z){var Y;try{if(w.c.status&&w.c.status!==0){Y=w.c.status;}else{Y=0;}}catch(d){Y=0;}if(Y>=200&&Y<300||Y===1223){s(w,z);}else{I(w,z);}}function O(d,Y){if(l.XMLHttpRequest&&!Y){if(d.c){d.c.onreadystatechange=null;}}d.c=null;d=null;}function u(d){var AE="";var AC=(typeof d.id==="object")?d.id:x.getElementById(d.id);var AF=d.useDisabled||false;var AB=encodeURIComponent;var AD,w,AG,Y;for(var AA=0;AA<AC.elements.length;AA++){AD=AC.elements[AA];Y=AD.disabled;w=AD.name;AG=AD.value;if((AF)?w:(w&&Y)){}switch(AD.type){case"select-one":case"select-multiple":for(var z=0;z<AD.options.length;z++){if(AD.options[z].selected){if(C.UA.ie){AE+=AB(w)+"="+AB(AD.options[z].attributes["value"].specified?AD.options[z].value:AD.options[z].text)+"&";}else{AE+=AB(w)+"="+AB(AD.options[z].hasAttribute("value")?AD.options[z].value:AD.options[z].text)+"&";}}}break;case"radio":case"checkbox":if(AD.checked){AE+=AB(w)+"="+AB(AG)+"&";}break;case"file":case undefined:case"reset":case"button":break;case"submit":default:AE+=AB(w)+"="+AB(AG)+"&";}}return AE.substr(0,AE.length-1);}g.xdrReady=V;g.start=P;g.success=s;g.failure=I;g.abort=H;g.header=b;g.transport=A;g.queue=L;g.queue.size=J;g.queue.start=c;g.queue.stop=T;g.queue.promote=B;g.queue.purge=e;C.io=g;},"3.0.0");