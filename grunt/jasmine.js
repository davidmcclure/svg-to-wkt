

module.exports = {

  tests: {

    src: 'svg-to-wkt.js',

    options: {
      specs: 'test/spec/*.spec.js',
      helpers: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/lodash/dist/lodash.js',
        'test/helpers.js'
      ]
    }

  }

};
