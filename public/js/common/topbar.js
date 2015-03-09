

var AppBar = mui.AppBar;

var TopBar = React.createClass({displayName: "TopBar",

  render: function() {
    return (
      React.createElement("nav", null, 
        "Elgin Park Clubs |", 
        React.createElement("a", {href: "/"}, "Welcome"), " |", 
        React.createElement("a", {href: "/clubs"}, "Clubs"), " |", 
        React.createElement("a", {href: "/events"}, "Events"), " |", 
        React.createElement("a", {href: "/login"}, React.createElement("input", {type: "button", name: "sign-in", value: "Sign in"}))
      )
    );
  }

});


