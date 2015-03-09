var React = require('React');
var mui = require('material-ui');
var AppBar = mui.AppBar;
var RaisedButton = mui.RaisedButton;

var TopBar = React.createClass({

  propTypes: {
    layout: React.PropTypes.string,
  },

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

    if (this.props.layout == 'login') {
      elements = (
        <RaisedButton primary={true} label="Sign In" className="top-bar-button--right"
          linkButton={true} href="/login"/>
      );
    } else if (this.props.layout == 'signup') {
      elements = (
        <RaisedButton primary={true} label="Sign Up" className="top-bar-button--right"
          linkButton={true} href="/signup"/>
      );
    }

    return (
      <div>
        <AppBar className="top-bar" title="Elgin Park Clubs" showMenuIconButton={false}>
          {elements}
        </AppBar>
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
