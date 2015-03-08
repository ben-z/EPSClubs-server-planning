var Hapi = require('hapi');
var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@dogen.mongohq.com:10080/epsclubs');

var server = new Hapi.Server();
server.connection({
  port: 3000
});

server.register(require('hapi-auth-cookie'), function(err) {

  server.auth.strategy('session', 'cookie', {
    password: 'secret',
    cookie: 'unicorn_auth',
    isSecure: false
  });
});

var plugins = [
    { register: require('./src/routes/login') },
    { register: require('./src/routes/signup') }
];

server.register(plugins, function (err) {
    if (err) { throw err; }

    server.start(function () {
        console.log('info', 'Server running at: ' + server.info.uri);
    });
});
