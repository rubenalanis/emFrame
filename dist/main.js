parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Focm":[function(require,module,exports) {
var e,t=function(e){return{cmpNames:[e+"Domains"],source:"tenants-mock",context:{airline:{code:"*"},product_scope:{name:"airTRFX",version:"2.0"},datasource:{step:"n/a",type:"n/a"},geo:{language:{},location:{}},modules:[],extra_info:{},ctx_version:"1.0"}}},o=function(o){var a=new XMLHttpRequest,n=t("emcid");a.open("POST","https://em-frontend-get.airtrfx.com/integration/settings/v1",!0),a.setRequestHeader("Content-type","application/json"),a.onreadystatechange=function(){if(4==a.readyState&&200==a.status){var t=JSON.parse(a.responseText);if(t.domains.includes(o)){var n=window.localStorage.getItem("emcid");if(!n){var i=function(e){var t,o,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n="[object Opera]"==Object.prototype.toString.call(window.opera),i="";if(window.crypto&&window.crypto.getRandomValues){for(o=new Uint32Array(e),window.crypto.getRandomValues(o),t=0;t<e;t++)i+=a[o[t]%a.length];return i}if(n){for(t=0;t<e;t++)i+=a[Math.floor(Math.random()*a.length)];return i}return Math.random().toString(36).substr(2,6)}(6);window.localStorage.setItem("emcid",i),n=window.localStorage.getItem("emcid")}/^"(.+(?="$))"$/.test(n)&&(n=n.replace(/^"(.+(?="$))"$/,"$1"),window.localStorage.setItem("emcid",n),n=window.localStorage.getItem("emcid")),e.postMessage({key:"emcid",value:n},"*")}else e.postMessage({key:"emcid",value:"n/a"},"*")}},a.send(JSON.stringify(n))},a=function(o,a){var n=new XMLHttpRequest,i=t("kpi");n.open("POST","https://em-frontend-get.airtrfx.com/integration/settings/v1",!0),n.setRequestHeader("Content-type","application/json"),n.onreadystatechange=function(){if(4==n.readyState&&200==n.status){var t=JSON.parse(n.responseText);if(!t.domains.includes(o))return;if("set"===a.method){var i=a.airline;window.localStorage.setItem("kpi",i)}else if("logout"===a.method)localStorage.removeItem("kpi");else if("get"===a.method){var r=window.localStorage.getItem("kpi");r?e.postMessage({key:"kpi",value:r},"*"):e.postMessage({key:"kpi",value:!1},"*")}}},n.send(JSON.stringify(i))},n=function(t){var n=t.data,i=n.key,r=n.opts;switch(e=t.source,i){case"emcid":o(t.origin);break;case"kpi":a(t.origin,r)}};window.addEventListener("message",n,!1);
},{}]},{},["Focm"], null)