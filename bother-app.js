#!/usr/bin/env node
'use strict';

var bother = require('./src/bother'),
    discovery = require('ot-discovery'),
    disco = new discovery('discovery-pp-sf.otenv.com', { logger: { log: function (log) {}, error: function (error) {}}}),
    InfiniteLoop = require('infinite-loop'),
    il = new InfiniteLoop(),
    program = require('commander'),
    pkg = require('./package.json');

program
    .version(pkg.version)
    .option('-s, --service <service>', 'Name of the service to bother')
    .option('-t, --times <times>', 'Number of times the service needs to be bothered')
    .parse(process.argv);

var service = program.service || 'restaurant';
var times = program.times || 100;

disco.connect(function(err){

    if(err){
        throw err;
    }

    il.add(bother.go, disco, service).run();
});