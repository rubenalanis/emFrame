parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Focm":[function(require,module,exports) {
var e,t,o=new XMLHttpRequest,i="https://em-frame.airtrfx.com/dist/whitelist.json";o.open("GET",i,!0),o.onreadystatechange=function(){4==o.readyState&&200==o.status&&(t=JSON.parse(o.responseText))},o.send();var r=function(o){if((t&&t.emcid||[]).includes(o)){var i=window.localStorage.getItem("emcid");if(!i){var r=function(e){var t,o,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r="[object Opera]"==Object.prototype.toString.call(window.opera),n="";if(window.crypto&&window.crypto.getRandomValues){for(o=new Uint32Array(e),window.crypto.getRandomValues(o),t=0;t<e;t++)n+=i[o[t]%i.length];return n}if(r){for(t=0;t<e;t++)n+=i[Math.floor(Math.random()*i.length)];return n}return Math.random().toString(36).substr(2,6)}(6);window.localStorage.setItem("emcid",r),i=window.localStorage.getItem("emcid")}/^"(.+(?="$))"$/.test(i)&&(i=i.replace(/^"(.+(?="$))"$/,"$1"),window.localStorage.setItem("emcid",i),i=window.localStorage.getItem("emcid")),e.postMessage({key:"emcid",value:i},"*")}else e.postMessage({key:"emcid",value:"n/a"},"*")},n=function(o,i){if((t&&t.kpi||[]).includes(o))if("set"===i.method){var r=i.airline;window.localStorage.setItem("kpi",r)}else if("logout"===i.method)localStorage.removeItem("kpi");else if("get"===i.method){var n=window.localStorage.getItem("kpi");n?e.postMessage({key:"kpi",value:n},"*"):e.postMessage({key:"kpi",value:!1},"*")}},a=function(o){var i=o.data,a=i.key,s=i.opts;switch(e=o.source,a){case"emcid":t?r(o.origin):setTimeout(function(){return r(o.origin)},1e3);break;case"kpi":t?n(o.origin,s):setTimeout(function(){return n(o.origin,s)},1e3)}};window.addEventListener("message",a,!1),Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(e,t){if(null==this)throw new TypeError('"this" is null or not defined');return"hello!"}});
},{}]},{},["Focm"], null)