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

function RequestQueue(maxTotal) {
  maxTotal = parseInt(maxTotal)>0?parseInt(maxTotal):Number.POSITIVE_INFINITY;

  var index = 0; // incrementing, used for unique ids
  var finished = 0; // Number of finished requests
  var pending = [];
  var running = [];

  var defaultFunction;
  if(typeof GM != "undefined" && "xmlHttpRequest" in GM) {
    defaultFunction = GM.xmlHttpRequest;
  } else {
    defaultFunction = function(a,b,c,d) { return GM_xmlhttpRequest(a,b,c,d);}
  }

  var fire = function() {
    if(pending.length > 0 && finished < maxTotal) {
      var req = pending.shift();
      running.push(req);
      req.__result = req.__fun.call(req.__thisArg,req);
    }
      fire();
  };

  var remove = function(id) {
    for(var i = 0; i < running.length; i++) {
      if(running[i].id == id) {
        running.splice(i, 1);
        finished++;
        fire();
        break;
      }
    }
  };

  this.add = function(req,fun,thisArg) {
    req.id = index++;
    req.__fun = typeof(fun) === 'function'?fun:defaultFunction;
    req.__thisArg = thisArg;

    req.__org_onload = req.onload;
    req.onload = function(response) {
     if(response.status === 0) {
        req.onabort(response);
        return;
      }
      remove(req.id);
      if(req.__org_onload) req.__org_onload(response);
      };

    req.__org_onerror = req.onerror;
    req.onerror = function(response) {
      remove(req.id);
      if(req.__org_onerror) req.__org_onerror(response);
      };

    req.__org_onabort = req.onabort;
    req.onabort = function(response) {
      remove(req.id);
      if(req.__org_onabort) req.__org_onabort(response);
      };

    pending.push(req);
   fire();
  };

  this.abortRunning = function() {
    for(var i = 0; i < running.length; i++) {
      if(running[i] && typeof running[i].__result.abort === 'function') {
        running[i].__result.abort();
      }
    }
  };

  this.abortPending = function() {
    pending = [];
  };

  this.abort = function() {
    this.abortPending();
    this.abortRunning();
  };
  this.resetTotal = function() {
    finished = 0;
  }
  this.hasReachedTotal = function() {
    return finished >= maxTotal;
  }
  this.hasRunning = function() {
    return running.length > 0;
  }
}
