"use strict";

const cp    = require('child_process');
const path  = require('path');

const once = function(fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}


const passthru = function(cmd /*, options, chain*/){
  var args = Array.from(arguments),
      chain    = once(args.pop()),
      cmd      = args.shift(),
      options  = args.shift() || {};

  if(Array.isArray(options))
    options = { args : options};

  options.stdio = ['inherit', 'inherit', 'inherit'];

  var ps   = cp.spawn(cmd, options.args || [], options);

  ps.on('error', chain);

  ps.on('close', function(exit) {
    var err = null;
    if(exit !== 0)
      err = "Bad exit code " + exit;
    return chain(err, exit);
  });
}


const phantomjs_bin = path.join(__dirname, 'bin', 'phantomjs');

module.exports = function(args, chain){
  return passthru(phantomjs_bin, args, chain);
}
