var React = require('React');
var mui = require('material-ui');
var AppBar = mui.AppBar;

var TopBar = React.createClass({
  getInitialState: function() {
    if (typeof window !== "undefined") {
      width = window.innerWidth
    } else {
      width = 1000;
    }
    return {
      windowWidth: width
    };
  },

  handleResize: function(e) {
    this.setState({windowWidth: window.innerWidth});
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  _onMenuIconButtonTouchTap: function() {
    this.refs.leftNav.toggle();
  },

  render: function() {

    return (
      <div>

        <nav>
          Elgin Park Clubs |
          <a href="/">Welcome</a> |
          <a href="/clubs">Clubs</a> |
          <a href="/events">Events</a> |
          <a href="/login"><input type="button" name="sign-in" value="Sign in" /></a>
        </nav>

      </div>
    );
  }

});

var NavigationMenuIcon = React.createClass({

  render: function() {
    return (
      <SvgIcon>
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
      </SvgIcon>
    );
  }

});

module.exports = TopBar;
