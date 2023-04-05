  'use strict';
  this.type = null;
  this.url = null;
  this.async = null;
  this.username = null;
  this.password = null;
  this.status = null;
  this.headers = {};
  this.readyState = null;
  this.abort = function () {
    this.readyState = 0;
  };
this.abort = function () {
    this.readyState = 0;
  };
  this.getResponseHeader = function (header) {
    let value = null;
    if (this.responseHeaders) {
      const regex = new RegExp(`^${header}: (.*)$`, 'igm');
      const result = [];
      let match = regex.exec(this.responseHeaders);
      while (match !== null) {
        result.push(match[1]);
        match = regex.exec(this.responseHeaders);
      }
      if (result.length > 0) {
        value = result.join(', ');
      }
    }
    return value;
  };

  this.setRequestHeader = function (name, value) {
    this.headers[name] = value;
  };

  this.send = function (data) {
    this.data = data;
    const that = this;
    if (typeof GM.xmlHttpRequest === 'undefined' && typeof GM_xmlhttpRequest === 'undefined') {
      throw new Error("You need to enable 'GM.xmlHttpRequest' or 'GM_xmlhttpRequest'.");
    }

    const agent = (typeof GM_xmlhttpRequest === 'undefined') ? GM.xmlHttpRequest : GM_xmlhttpRequest;

    agent({
      method: this.type,
      url: this.url,
      headers: this.headers,
      data: this.data,
      responseType: this.responseType,
      onload(rsp) {
        for (const k in Object.getOwnPropertyNames(rsp)) {
          that[Object.getOwnPropertyNames(rsp)[k]] = rsp[Object.getOwnPropertyNames(rsp)[k]];
        }

        if (that.onload) that.onload(); else that.onreadystatechange();
      },
      onerror(rsp) {
        for (const k in Object.getOwnPropertyNames(rsp)) {
          that[Object.getOwnPropertyNames(rsp)[k]] = rsp[Object.getOwnPropertyNames(rsp)[k]];
        }

        if (that.onload) that.onload(); else that.onreadystatechange();
      },
    });
  };
