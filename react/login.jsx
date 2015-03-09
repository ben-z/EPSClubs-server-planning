var React = require('react');
var TopBar = require('./common/topbar.jsx');

var Login = React.createClass({

  handleLogin: function(e){
    e.preventDefault();
    var formData = {
      email_address: this.refs.email_address.getDOMNode().value.trim(),
      password: this.refs.password.getDOMNode().value.trim(),
    };
    // console.log(formData);
    $.post("/login/json", formData, function(data){
      console.log(data);
    },'json');
  },

  render: function() {
    return (
      <div>
        <TopBar />
          <form className="sign-in-form" onSubmit={this.handleLogin} method="post" action="/login">
            <h3>Sign in</h3>
            Email: <input type="email" ref="email_address" /><br />
          Password: <input type="password" ref="password" />
            <input type="submit" name="login" value="Login" />
          </form>
      </div>
    );
  }

});

module.exports = Login;
