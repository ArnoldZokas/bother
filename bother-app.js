#!/usr/bin/env node
'use strict';

var bother = require('./src/bother'),
    discovery = require('ot-discovery'),
    program = require('commander'),
    pkg = require('./package.json');

program
    .version(pkg.version)
    .option('-s, --service <service>', 'Name of the service to bother')
    .option('-t, --time <time>', 'Number of seconds for which you want to bother the service')
    .parse(process.argv);

var discoServer = program.args;
var service = program.service || 'restaurant';
var time = program.time;
var disco = new discovery(discoServer, {
        logger: {
            log: function (log) {},
            error: function (error) {}
        }
    });

disco.connect(function(err){

    if(err){
        throw err;
    }

    var bothering = setInterval(function() {bother.start(disco, service)}, 10);

    if(time){
        setTimeout(function(){
            clearInterval(bothering);
            process.exit(0);
        }, time * 1000);
    }
});