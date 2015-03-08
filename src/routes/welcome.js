exports.register = function(server, options, next) {
  server.route([{
    method: 'GET',
    path: '/welcome',
    config: {
      handler: function(request, reply){

        server.methods.genHtml(
          'Welcome', // Title
          'Welcome', // Template name (Welcome.js => Welcome)
          {}, // Props
          '<script src="js/welcome.js"></script>',
          function(err, rendered){
            reply(rendered);
          }
        );

      }
    }
  }]);

  // Callback, completes the registration process
  next();
}

// Required for all plugins
// If this were a npm module, one could do this:
// exports.register.attributes = require('package.json')
exports.register.attributes = {
  name: 'welcome-route', // Must be unique
  version: '1.0.0'
};
