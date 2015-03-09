


var menuItems = [
    { route: 'get-started', text: 'Get Started' },
    { route: 'css-framework', text: 'CSS Framework' },
    { route: 'components', text: 'Components' },
    { type: mui.MenuItem.Types.SUBHEADER, text: 'Resources' },
    { type: mui.MenuItem.Types.LINK, payload: 'https://github.com/callemall/material-ui', text: 'GitHub' },
    { type: mui.MenuItem.Types.LINK, payload: 'http://facebook.github.io/react', text: 'React' },
    { type: mui.MenuItem.Types.LINK, payload: 'https://www.google.com/design/spec/material-design/introduction.html', text: 'Material Design' }
  ];

var AppLeftNav = React.createClass({displayName: "AppLeftNav",

  getInitialState: function() {
    return {
      selectedIndex: 0
    };
  },

  render: function() {
    var header = React.createElement("div", {className: "logo", onClick: this._onHeaderClick}, "material ui");

    return (
      React.createElement(mui.LeftNav, {
        ref: "leftNav"})
    );
  },

  toggle: function() {
    this.refs.leftNav.toggle();
  },

  _getSelectedIndex: function() {
    return 0;
    var currentItem;

    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.isActive(currentItem.route)) return i;
    };
  },

  _onLeftNavChange: function(e, key, payload) {
    // this.transitionTo(payload.route);
  },

  _onHeaderClick: function() {
    // this.transitionTo('root');
    this.refs.leftNav.close();
  }

});


