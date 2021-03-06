


var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var IconButton = mui.IconButton;
var Snackbar = mui.Snackbar;

var Index = React.createClass({displayName: "Index",

  getInitialState: function() {
    return {
      fNameErrorText: '',
      lNameErrorText: '',
      studentNumErrorText: '',
      classOfErrorText: '',
      emailAddressErrorText: '',
      passwordErrorText: '',
      notiBar: {
        message: '',
        action: '',
        href: '',
      },
    };
  },

  _handleFNameInputChange: function() {
    this.setState({
      fNameErrorText: this.refs.first_name.getValue().trim() ? '' : 'What\'s your first name?'
    });
  },

  _handleLNameInputChange: function() {
    this.setState({
      lNameErrorText: this.refs.last_name.getValue().trim() ? '' : 'What\'s your last name?'
    });
  },

  _handleStudentNumInputChange: function() {
    var value = this.refs.student_number.getValue().trim();
    var isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      studentNumErrorText: isNumeric ? '' : 'Must be a numeric value.'
    });
  },

  _handleClassOfInputChange: function() {
    var value = this.refs.class_of.getValue().trim();
    var isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      classOfErrorText: isNumeric ? '' : 'Must be a numeric value.'
    });
  },

  _handleEmailAddressInputChange: function() {
    var value = this.refs.email_address.getValue().trim();
    this.setState({
      emailAddressErrorText: value ? '' : 'An email address is required.'
    });
  },

  _handleEmailAddressInputBlur: function() {
    var value = this.refs.email_address.getValue().trim();
    if(!value)
      return this.setState({
        emailAddressErrorText:'An email address is required.'
      });
    var regex = /\S+@\S+\.\S+/;
    var isValid = regex.test(value);
    this.setState({
      emailAddressErrorText: isValid ? '' : 'Use a valid email please!'
    });
  },

  _handlePasswordInputBlur: function() {
    var value = this.refs.password.getValue().trim();
    if(!value)
      return this.setState({
        passwordErrorText:'A password is required.'
      });
    var regex = /^.{6,}$/;
    var isValid = regex.test(value);
    this.setState({
      passwordErrorText: isValid ? '' : 'Password must contain at least 6 characters.'
    });
  },

  handleSignUp: function(e){
    e.preventDefault();

    // Validate fields
    this._handleFNameInputChange();
    this._handleLNameInputChange();
    this._handleStudentNumInputChange();
    this._handleClassOfInputChange();
    this._handleEmailAddressInputBlur();
    this._handlePasswordInputBlur();

    if (!this.state.fNameErrorText &&
      !this.state.lNameErrorText &&
      !this.state.studentNumErrorText &&
      !this.state.classOfErrorText &&
      !this.state.emailAddressErrorText &&
      !this.state.passwordErrorText
      ) {

      var formData = {
        first_name: this.refs.first_name.getValue().trim(),
        last_name: this.refs.last_name.getValue().trim(),
        email_address: this.refs.email_address.getValue().trim(),
        password: this.refs.password.getValue().trim(),
        student_number: this.refs.student_number.getValue().trim(),
        class_of: this.refs.class_of.getValue().trim()
      };
      // console.log(formData);
      $.post("/signup/json", formData, (function(data){
        console.log(data);
        if(data.status==='success'){

          // Clear form
          this.refs.first_name.clearValue();
          this.refs.last_name.clearValue();
          this.refs.email_address.clearValue();
          this.refs.password.clearValue();
          this.refs.student_number.clearValue();
          this.refs.class_of.clearValue();

          this.setState({
            notiBar:{
              message:'Success!',
              action:'Check your email ->',
              href:data.data.href
            }
          });
        }else{

          var message = 'Error: '+data.data.message;
          var action = data.data.action ? data.data.action:'';
          var href = data.data.href ? data.data.href:'/';

          this.setState({notiBar:{message:message,action:action, href:href}});
        }
        this.refs.notiBar.show();
      }).bind(this),'json');
    }
  },

  _handleNotiBar: function(){
    window.location.href = this.state.notiBar.href
  },

  render: function() {

    var githubButton = (
      React.createElement(IconButton, {
        className: "github-icon-button", 
        iconClassName: "muidocs-icon-custom-github", 
        href: "https://github.com/callemall/material-ui", 
        linkButton: true})
    );

    var footer = (
      React.createElement("div", {className: "footer full-width-section mui-dark-theme"}, 
        React.createElement("p", null, 
          "Hand crafted with love by the engineers at ", React.createElement("a", {href: "http://call-em-all.com"}, "Call-Em-All"), " and our" + ' ' +
          "awesome ", React.createElement("a", {href: "https://github.com/callemall/material-ui/graphs/contributors"}, "contributors"), "."
        ), 
        githubButton
      )
    );

    return (
      React.createElement("div", null, 
        React.createElement(TopBar, {layout: "login"}), 
        React.createElement("div", {className: "main Grid Grid--gutters Grid--full large-Grid--1of2"}, 
          React.createElement("div", {className: "Grid-cell"}, 
            React.createElement("h3", null, "Get involved in exciting events", React.createElement("br", null), "Elgin has to offer.")
          ), 
          React.createElement("div", {className: "Grid-cell"}, 
            React.createElement("form", {className: "welcome-sign-up-form", onSubmit: this.handleSignUp}, 
              React.createElement("h3", null, "Sign up"), 
              React.createElement("div", {className: "Grid Grid--gutters Grid--1of2"}, 
                React.createElement("div", {className: "Grid-cell"}, 
                  React.createElement(TextField, {floatingLabelText: "First Name", 
                    ref: "first_name", 
                    onChange: this._handleFNameInputChange, 
                    onBlur: this._handleFNameInputChange, 
                    errorText: this.state.fNameErrorText}
                  )
                ), 
                React.createElement("div", {className: "Grid-cell"}, 
                  React.createElement(TextField, {floatingLabelText: "Last Name", 
                    ref: "last_name", 
                    onChange: this._handleLNameInputChange, 
                    onBlur: this._handleLNameInputChange, 
                    errorText: this.state.lNameErrorText}
                  )
                )
              ), 
              React.createElement("div", {className: "Grid Grid--gutters Grid--1of2"}, 
                React.createElement("div", {className: "Grid-cell"}, 
                  React.createElement(TextField, {hintText: "950123", floatingLabelText: "Student Number", ref: "student_number", type: "text", onChange: this._handleStudentNumInputChange, onBlur: this._handleStudentNumInputChange, errorText: this.state.studentNumErrorText})
                ), 
                React.createElement("div", {className: "Grid-cell"}, 
                  React.createElement(TextField, {hintText: "2015", floatingLabelText: "Class Of", ref: "class_of", type: "text", min: "2015", onChange: this._handleClassOfInputChange, onBlur: this._handleClassOfInputChange, errorText: this.state.classOfErrorText})
                )
              ), 
              React.createElement("div", {className: "Grid Grid--gutters Grid--1of2"}, 
                React.createElement("div", {className: "Grid-cell"}, 
                  React.createElement(TextField, {hintText: "someone@example.com", floatingLabelText: "Email", ref: "email_address", type: "email", onChange: this._handleEmailAddressInputChange, onBlur: this._handleEmailAddressInputBlur, errorText: this.state.emailAddressErrorText})
                ), 
                React.createElement("div", {className: "Grid-cell"}, 
                  React.createElement(TextField, {floatingLabelText: "Password", ref: "password", type: "password", onBlur: this._handlePasswordInputBlur, errorText: this.state.passwordErrorText})
                )
              ), 
              React.createElement(RaisedButton, {type: "submit", label: "Sign Up"})
            )
          )
        ), 
        React.createElement(Snackbar, {
          message: this.state.notiBar.message, 
          ref: "notiBar", 
          action: this.state.notiBar.action, 
          onActionTouchTap: this._handleNotiBar})
      )
    );
  },
  clicked: function(){
    console.log("click");
  }

});


