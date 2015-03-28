var React = require('react');
var TopBar = require('./common/topbar.jsx');

var Home = React.createClass({

  render: function() {
    return (
      <div>
        <TopBar layout="user"/>
        <h2>Subscriptions</h2>
        <p>
          Clubs I follow
        </p>
        <img src="http://placehold.it/100" alt="" />
        <br />
        <b>CCYS</b>
        <p>
          CCYS raises awareness for cancer.
        </p>
        <img src="http://placehold.it/100" alt="" />
        <br />
        <b>Computer Club</b>
        <p>
          Computer Club is majestic.
        </p>

        <h2>Upcoming Events</h2>
        <table>
          <tr>
            <th>
              Club
            </th>
            <th>
              Name
            </th>
            <th>
              Date
            </th>
            <th>
              Notes
            </th>
          </tr>
          <tr>
            <td>
              CCYS
            </td>
            <td>
              Pizza Sale
            </td>
            <td>
              Friday, Mar 6, 2015
            </td>
            <td>
              Setup - 12:30, Clean up - 1:00
            </td>
          </tr>
        </table>
      </div>
    );
  }

});

module.exports = Home;
