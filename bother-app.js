'use strict';

var discovery = require('ot-discovery');
var request = require('request');
var disco = new discovery('discovery-pp-sf.otenv.com', { logger: { log: function (log) {}, error: function (error) {}}});
var host;
var servers;

disco.connect(function(err, h, s){
    if(err){
        throw err;
    }

    host = h;
    servers = s;
    var counter = 0;

    while(counter < 100) {
        var service = disco.find('legacy-api-bridge');
        request(service + '/service_status', function(error, response){
            console.log(response.statusCode);
            if (!error && response.statusCode == 200) {
                console.log('I\'m hitting ' + service);
            }
        });
        counter++;
    }
});



