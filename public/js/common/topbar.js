

var AppBar = mui.AppBar;

var TopBar = React.createClass({displayName: "TopBar",
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
      React.createElement("div", null, 

        React.createElement("nav", null, 
          "Elgin Park Clubs |", 
          React.createElement("a", {href: "/"}, "Welcome"), " |", 
          React.createElement("a", {href: "/clubs"}, "Clubs"), " |", 
          React.createElement("a", {href: "/events"}, "Events"), " |", 
          React.createElement("a", {href: "/login"}, React.createElement("input", {type: "button", name: "sign-in", value: "Sign in"}))
        )

      )
    );
  }

});

var NavigationMenuIcon = React.createClass({displayName: "NavigationMenuIcon",

  render: function() {
    return (
      React.createElement(SvgIcon, null, 
        React.createElement("path", {d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"})
      )
    );
  }

});


