const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    //"bookMfe": "http://localhost:4300/remoteEntry.js",
    //"authMfe": "http://localhost:4200/remoteEntry.js",    
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
