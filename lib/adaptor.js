/*
 * cylon-mqtt adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
 */

'use strict';

var Cylon = require('cylon');
var mqtt = require('mqtt')

var Adaptor = module.exports = function Adaptor(opts) {
  Adaptor.__super__.constructor.apply(this, arguments);

  opts = opts || {};
  var extraParams = opts.extraParams || {};

  this.host = extraParams.host;
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {
  var conn = this.connection;
  this.client = mqtt.connect(this.host);

  this.client.on('message', function(topic, message) {
    conn.emit('message', topic, message);
  });

  callback(null);
};

Adaptor.prototype.disconnect = function(callback) {
  this.client.end();

  callback(null);
};

Adaptor.prototype.subscribe = function(topic) {
  this.client.subscribe(topic);
}

Adaptor.prototype.publish = function(topic, data) {
  this.client.publish(topic,data);
}

