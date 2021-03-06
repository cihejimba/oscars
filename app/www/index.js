var views = require('./lib/views');
var path = require('path');
var apiView = require('./lib/api-view');
var nominees = require('./handlers/all');
var user = require('./handlers/user');

/*
 * This is where we set up our www routes
 *
 */
exports.register = function(plugin, options, next) {

  views(plugin);
  apiView(plugin);

  plugin.route([

    // assets
    { method: 'GET', path: '/dist/{param*}', handler: {
        directory: {
          path: './dist'
        }
      }
    },

    // pages
    { method: 'GET', path: '/', config: nominees.homepage },
    { method: 'GET', path: '/setup', config: nominees.setup },
    { method: 'GET', path: '/add', config: nominees.add },

    // user pages
    { method: 'GET', path: '/vote', config: user.vote },
    { method: 'GET', path: '/profile', config: user.profile },
    { method: 'GET', path: '/logout', config: user.logout },
  ]);

  next();

};

exports.register.attributes = {
  name: 'www'
};
