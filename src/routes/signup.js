var mongoose = require('mongoose');
var User = require('../schemas/User');

var addUser = function(request, reply){

  // Double check if any field is missing
  if (!request.payload.email_address)
    return reply({status:'fail',data:{message:'Missing email address'}});
  if (!request.payload.password)
    return reply({status:'fail',data:{message:'Missing password'}});
  if (!request.payload.first_name)
    return reply({status:'fail',data:{message:'Missing first name'}});
  if (!request.payload.last_name)
    return reply({status:'fail',data:{message:'Missing last name'}});
  if (!request.payload.student_number)
    return reply({status:'fail',data:{message:'Missing student number'}});
  if (!request.payload.class_of)
    return reply({status:'fail',data:{message:'When do you graduate?'}});

  email_exists(request.payload.email_address, function(exists){
    if (exists) {
      return reply({status:'fail',data:{message:'Email Address exists'}});
    }

    var user = new User({
      email_address: request.payload.email_address,
      password: request.payload.password,
      first_name: request.payload.first_name,
      last_name: request.payload.last_name,
      student_number: request.payload.student_number,
      class_of: request.payload.class_of
    });

    user.save(function (err) {
      if (err){
        console.log(err);
        return reply({
          status: 'error',
          message: 'An unexpected error occured.'
        });
      }
      return reply({status:'success'}).code(201);
    });
  });
}

var email_exists = function(email_address, callback){
  User.findOne({
    email_address: email_address
  }, '_id', function(err, obj) {
    callback((obj)? true : false );
  });
}


exports.register = function(server, options, next) {
  server.route([{
    method: 'POST',
    path: '/signup/json',
    config: {
      handler: addUser
    }
  }]);

  // Callback, completes the registration process
  next();
}

// Required for all plugins
// If this were a npm module, one could do this:
// exports.register.attributes = require('package.json')
exports.register.attributes = {
  name: 'signup-route', // Must be unique
  version: '1.0.0'
};
