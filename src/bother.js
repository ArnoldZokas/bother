'use strict';

var request = require('request');

exports.go = function(disco, service) {
    var url = disco.find(service);
    request(url + '/service-status', function(error, response){
        console.log('I\'m hitting ' + url + ' which is returning a ' + response.statusCode + ' status code.');
    });
};