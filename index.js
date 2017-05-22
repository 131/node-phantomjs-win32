"use strict";

const path  = require('path');
const passthru = require('nyks/child_process/passthru');

const phantomjs_bin = path.join(__dirname, 'bin', 'phantomjs');

module.exports = function(args, chain){
  return passthru(phantomjs_bin, args, chain);
}
