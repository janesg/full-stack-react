const localtunnel = require('localtunnel');

// subdomain is just a random value that must be unique
localtunnel(5000, { subdomain: 'ayhzejwmswfv' }, function(err, tunnel) {
    console.log('LT running');
});