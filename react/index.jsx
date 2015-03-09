var React = require('react');
var TopBar = require('./common/topbar.jsx');

var Index = React.createClass({

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
      <div>
        <TopBar />
        <br /><br />
        Get involved in exciting events Elgin has to offer.
        <br />
        <br />

        <form className="sign-up" onSubmit={this.handleSignUp}>
          <h3>Sign up</h3>
          Email: <input type="email" ref="email_address" /><br />
          Password: <input type="password" ref="password" /><br />
          First Name:<input type="text" ref="first_name" /><br />
          Last Name:<input type="text" ref="last_name" /><br />
          Student Number:<input type="number" ref="student_number" /><br />
          Class Of: <input type="number" ref="class_of" min="2015" /><br />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  },
  clicked: function(){
    console.log("click");
  }

});

module.exports = Index;
