


var RaisedButton = mui.RaisedButton;

var Index = React.createClass({displayName: "Index",

  handleSignUp: function(e){
    e.preventDefault();
    var formData = {
      first_name: this.refs.first_name.getDOMNode().value.trim(),
      last_name: this.refs.last_name.getDOMNode().value.trim(),
      email_address: this.refs.email_address.getDOMNode().value.trim(),
      password: this.refs.password.getDOMNode().value.trim(),
      student_number: this.refs.student_number.getDOMNode().value.trim(),
      class_of: this.refs.class_of.getDOMNode().value.trim()
    };
    // console.log(formData);
    $.post("/signup/json", formData, function(data){
      console.log(data);
    },'json');
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(RaisedButton, {label: "Default", primary: true}), 
        React.createElement(TopBar, null), 
        React.createElement("br", null), React.createElement("br", null), 
        "Get involved in exciting events Elgin has to offer.", 
        React.createElement("br", null), 
        React.createElement("br", null), 

        React.createElement("form", {className: "sign-up", onSubmit: this.handleSignUp}, 
          React.createElement("h3", null, "Sign up"), 
          "Email: ", React.createElement("input", {type: "email", ref: "email_address"}), React.createElement("br", null), 
          "Password: ", React.createElement("input", {type: "password", ref: "password"}), React.createElement("br", null), 
          "First Name:", React.createElement("input", {type: "text", ref: "first_name"}), React.createElement("br", null), 
          "Last Name:", React.createElement("input", {type: "text", ref: "last_name"}), React.createElement("br", null), 
          "Student Number:", React.createElement("input", {type: "number", ref: "student_number"}), React.createElement("br", null), 
          "Class Of: ", React.createElement("input", {type: "number", ref: "class_of", min: "2015"}), React.createElement("br", null), 
          React.createElement("input", {type: "submit", value: "Sign Up"})
        )
      )
    );
  },
  clicked: function(){
    console.log("click");
  }

});


