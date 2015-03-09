var Hapi = require('hapi');
var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@dogen.mongohq.com:10080/epsclubs');

var server = new Hapi.Server();
server.connection({
  port: 3000
});

/* Server Methods */

// Safely stringifies props
var safeStringify = function(obj, next) {
  return next(null,
    JSON.stringify(obj)
        .replace(/<\/script/g, '<\\/script')
        .replace(/<!--/g, '<\\!--'));
}

server.method('safeStringify', safeStringify);

// Generates a common <head>
var genHead = function(title, next){
  return next(null,
    '<head>'+
      '<title>'+title+'</title>'+
    '</head>');
}

server.method('genHead', genHead);

// Generates the html
var genHtml = function(title, template, props, scripts, next){

  server.methods.genHead(title, function(err, head){
    if (err) return next(err, null);

    var renderOpts = {
        runtimeOptions: {
            // doctype: '<!DOCTYPE html>',
            renderMethod: 'renderToString'
        }
    };

    server.render(template, props, renderOpts, (function(err, rendered){
      if (err) return next(err, null);
      server.methods.safeStringify(props,function(err, props){
        if (err) return next(err, null);
        return next(null,
          '<!DOCTYPE html><html>'+head+
            '<body>'+
              '<div id="content">'+rendered+'</div>'+
              '<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react.js"></script>'+
              '<script>window.React = React;</script>'+
              scripts+
              '<script> \
                if (typeof window !== "undefined") { \
                  React = window.React; \
                  \
                  React.render( \
                    React.createElement('+
                      template+', '+
                      props+
                    '), \
                    document.getElementById("content") \
                  ); \
                } \
              </script>'+
            '</body>'+
          '<html>'
        );
      });
    }).bind(this));
  });
}

server.method('genHtml', genHtml);

/* End Server Methods */

server.views({
    engines: {
        jsx: require('hapi-react-views')
    },
    relativeTo: __dirname,
    path: 'react'
});

server.register(require('hapi-auth-cookie'), function(err) {

  server.auth.strategy('session', 'cookie', {
    password: 'secret',
    cookie: 'unicorn_auth',
    isSecure: false
  });
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: true
        }
    }
});

var plugins = [
    { register: require('./src/routes/login') },
    { register: require('./src/routes/signup') },
    { register: require('./src/routes/welcome') }
];

server.register(plugins, function (err) {
    if (err) { throw err; }

    server.start(function () {
      console.log('info', 'Server running at: ' + server.info.uri);
    });
});
