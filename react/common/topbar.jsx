var React = require('React');
var mui = require('material-ui');
var AppBar = mui.AppBar;

var TopBar = React.createClass({

  render: function() {
    return (
      <nav>
        Elgin Park Clubs |
        <a href="/">Welcome</a> |
        <a href="/clubs">Clubs</a> |
        <a href="/events">Events</a> |
        <a href="/login"><input type="button" name="sign-in" value="Sign in" /></a>
      </nav>
    );
  }

});

module.exports = TopBar;
