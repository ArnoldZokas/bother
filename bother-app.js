#!/usr/bin/env node
'use strict';

var discovery = require('ot-discovery');
var request = require('request');
var program = require('commander');
var pkg = require('./package.json');
var disco = new discovery('discovery-pp-sf.otenv.com', { logger: { log: function (log) {}, error: function (error) {}}});
var host;
var servers;

program
    .version(pkg.version)
    .option('-s, --service <service>', 'Name of the service to bother')
    .option('-t, --times <times>', 'Number of times the service needs to be bothered')
    .parse(process.argv);

var service = program.service || 'restaurant';
var times = program.times || 100;

disco.connect(function(err, h, s){
    if(err){
        throw err;
    }

    host = h;
    servers = s;
    var counter = 0;

    console.log(disco.findAll(service));

    while(counter < times) {
        var url = disco.find(service);
        request(url + '/service-status', function(error, response){
            console.log('I\'m hitting ' + url + ' which is returning a ' + response.statusCode + ' status code.');
        });
        counter++;
    }
});



