// ==UserScript==
// @exclude     *
// ==UserLibrary==
// @name        RequestQueue
// @description A simple queue for GM.xmlHttpRequest, GM_xmlhttpRequests or other async functions
// @version     6
// @license     MIT
// ==/UserLibrary==
// @namespace   cuzi
// @homepageURL https://github.com/cvzi/RequestQueue/
// ==/UserScript==

// ==OpenUserJS==
// @author      cuzi
// ==/OpenUserJS==

"use strict";
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms)),searchParams = new URLSearchParams(location.hash);
function RequestQueue() {
  var index = 0;
 // var pending = [];
  var running = [];

  var defaultFunction;
  if(typeof GM != "undefined" && "xmlHttpRequest" in GM) {
    defaultFunction = GM.xmlHttpRequest;
  } else {
    defaultFunction = function(a,b,c,d) { return GM_xmlhttpRequest(a,b,c,d);}
  }

 /* var fire = function() {
    if(pending.length > 0) {
      var req = pending.shift();
      running.push(req);
      req.__result = req.__fun.call(req.__thisArg,req);
      fire();
    }

  };*/

  var remove = function(id) {
    for(var i = 0; i < running.length; i++) {
      if(running[i].id == id) {
        running.splice(i, 1);
       // fire();
        break;
      }
    }
  };

  this.add = function(req,fun,thisArg) {
    req.id = index++;

    req.__fun = typeof(fun) === 'function'?fun:defaultFunction;
    req.__thisArg = thisArg;

    req.__org_onload = req.onload;
    req.onload = async function(response) {
        await sleep(2000)
     if(response.status === 0) {
        req.onabort(response);
        return;
      }
      remove(req.id);
      if(req.__org_onload) req.__org_onload(response);
      };

    req.__org_onerror = req.onerror;
    req.onerror = async function(response) {
        await sleep(2000)
      remove(req.id);
      if(req.__org_onerror) req.__org_onerror(response);
      };

    req.__org_onabort = req.onabort;
    req.onabort = async function(response) {
        await sleep(2000)
      remove(req.id);
      if(req.__org_onabort) req.__org_onabort(response);
      };
     req.__result = req.__fun.call(req.__thisArg,req);
     running.push(req);
  //  fire();
  };

  this.abortRunning = function() {
    for(var i = 0; i < running.length; i++) {
      if(running[i] && typeof running[i].__result.abort === 'function') {
        running[i].__result.abort();
      }
    }
  };

 /* this.abortPending = function() {
    pending = [];
  };*/

  this.abort = function() {
   // this.abortPending();
    this.abortRunning();
  };
  this.hasRunning = function() {
    return running.length > 0;
  }
}
