exports.register = function(server, options, next) {
  server.route([{
    method: 'GET',
    path: '/',
    config: {
      handler: function(request, reply){

        if(request.auth.isAuthenticated){
          return reply.redirect('/home');
        }

        server.methods.genHtml(
          'Elgin Park Clubs', // Title
          'Index', // Template name (Welcome.js => Welcome)
          {}, // Props
          '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>'+
          '<script src="js/common/topbar.js"></script>'+
          '<script src="js/index.js"></script>',
          function(err, rendered){
            if(err) throw err;
            reply(rendered);
          }
        );

      },
      auth: {
          mode: 'try',
          strategy: 'session'
      },
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
