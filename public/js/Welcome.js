

var Welcome = React.createClass({displayName: "Welcome",

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, "Welcome"), 
        React.createElement("input", {onClick: this.clicked, type: "button"})
      )
    );
  },
  clicked: function(){
    console.log("click");
  }

});


