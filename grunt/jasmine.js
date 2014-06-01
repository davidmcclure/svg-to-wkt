

module.exports = {

  tests: {

    src: 'svg-to-wkt.js',

    options: {
      specs: 'tests/spec/*.spec.js',
      helpers: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/lodash/dist/lodash.js',
        'tests/helpers.js'
      ]
    }

  }

};
