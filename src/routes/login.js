var mongoose = require('mongoose');
var User = require('../schemas/User');

var authenticate = function(request, reply) {

  if (request.auth.isAuthenticated) {
    return reply({
      status: 'success'
    });
  }

  if (!request.payload.email_address ||
    !request.payload.password) {

    res = {
      status: 'fail',
      data: {
        message: 'Missing email or password'
      }
    };

    return reply(res);
  } else {
    User.findOne({
      email_address: request.payload.email_address
    }, 'password', function(err, obj) {

      var user = obj;
      if (!user) {

        res = {
          status: 'fail',
          data: {
            message: 'User does not exist'
          }
        };

        return reply(res);

      } else {
        user.comparePassword(request.payload.password, function(err, matches) {
          if (matches) {
            request.auth.session.set({
              userID: user._id
            });
            return reply({
              status: 'success'
            });
          } else {

            res = {
              status: 'fail',
              data: {
                message: 'Invalid email or password'
              }
            };

            return reply(res);
          }
        });
      }
    });
  }
};

var logout_json = function(request, reply) {

  request.auth.session.clear();
  return reply({
    status: 'success'
  });

};

var logout = function(request, reply) {

  logout_json(request, function(data){
    if (data.status === 'success') {
      return reply.redirect('/');
    } else {
      return reply('An unknown error occured');
    }
  });
};

// Options can be passed to plugins on registration
exports.register = function(server, options, next) {
  server.route([
  {
    method: 'GET',
    path: '/login',
    config: {
      handler: function(request, reply){

        if(request.auth.isAuthenticated){
          return reply.redirect('/home');
        }

        server.methods.genHtml(
          'Sign in · Elgin Park Clubs',
          'Login',
          {},
          '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>'+
          '<script src="js/login.js"></script>'+
          '<script src="js/common/topbar.js"></script>',
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
  },
  {
    method: 'POST',
    path: '/login/json',
    config: {
      handler: authenticate,
      auth: {
          mode: 'try',
          strategy: 'session'
      },
    }
  },
  {
    method: 'GET',
    path: '/logout/json',
    config: {
      handler: logout_json
    }
  },
  {
    method: 'GET',
    path: '/logout',
    config: {
      handler: logout
    }
  }]);

  // Callback, completes the registration process
  next();
}

// Required for all plugins
// If this were a npm module, one could do this:
// exports.register.attributes = require('package.json')
exports.register.attributes = {
  name: 'login-route', // Must be unique
  version: '1.0.0'
};
