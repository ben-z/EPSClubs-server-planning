


var Login = React.createClass({displayName: "Login",

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
      React.createElement("div", null, 
        React.createElement(TopBar, {layout: "signup"}), 
          React.createElement("form", {className: "sign-in-form", onSubmit: this.handleLogin, method: "post", action: "/login"}, 
            React.createElement("h3", null, "Sign in"), 
            "Email: ", React.createElement("input", {type: "email", ref: "email_address"}), React.createElement("br", null), 
          "Password: ", React.createElement("input", {type: "password", ref: "password"}), 
            React.createElement("input", {type: "submit", name: "login", value: "Login"})
          )
      )
    );
  }

});


