// ==UserScript==
// @exclude     *
// ==UserLibrary==
// @name        RequestQueue
// @description GM async functions
// @version     20
// @license     MIT
// ==/UserLibrary==
// @namespace   cuzi
// @homepageURL https://github.com/cvzi/RequestQueue/
// ==/UserScript==

// ==OpenUserJS==
// @author      cuzi
// ==/OpenUserJS==

"use strict";

function RequestQueue() {

  var running = [];

  var defaultFunction;
  if(typeof GM != "undefined" && "xmlHttpRequest" in GM) {
    defaultFunction = GM.xmlHttpRequest;
  } else {
    defaultFunction = function(a,b,c,d) { return GM_xmlhttpRequest(a,b,c,d);}
  }


  this.add = function(req,fun,thisArg) {
      running.push(req);
    req.__result = req.__fun.call(req.__thisArg,req);
    req.__fun = typeof(fun) === 'function'?fun:defaultFunction;
    req.__thisArg = thisArg;

    req.__org_onload = req.onload;
    req.onload = function(response) {
      if(req.__org_onload) req.__org_onload(response);
      };
    req.__org_onerror = req.onerror;
    req.onerror = function(response) {
      if(req.__org_onerror) req.__org_onerror(response);
      };
  };

  this.abortRunning = function() {
    for(var i = 0; i < running.length; i++) {
      if(running[i] && typeof running[i].__result.abort === 'function') {
        running[i].__result.abort();
      }
    }
  };

  this.abort = function() {
    this.abortRunning();
  };

}
