var React = require('react');

var Welcome = React.createClass({

  render: function() {
    return (
      <div>
        <h2>Welcome</h2>
        <input onClick={this.clicked} type="button" />
      </div>
    );
  },
  clicked: function(){
    console.log("click");
  }

});

module.exports = Welcome;
