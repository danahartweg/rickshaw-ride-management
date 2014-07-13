var filterTemplates = require('broccoli-template')
var uglifyJavaScript = require('broccoli-uglify-js')
var compileES6 = require('broccoli-es6-concatenator')
var compileSass = require('broccoli-sass')
var pickFiles = require('broccoli-static-compiler')
var mergeTrees = require('broccoli-merge-trees')
var findBowerTrees = require('broccoli-bower')
var findVendorTrees = require('broccoli-vendor')
var env = process.env.BROCCOLI_ENV || 'development';

function preprocess (tree) {
  tree = filterTemplates(tree, {
    extensions: ['hbs', 'handlebars'],
    compileFunction: 'Ember.Handlebars.compile'
  })

  return tree;
};

var app = 'app';
var styles = 'styles';
var config = 'config';
var vendor = 'vendor';

app = pickFiles(app, {
  srcDir: '/',
  destDir: 'appkit'
});
app = preprocess(app);

styles = pickFiles(styles, {
  srcDir: '/',
  destDir: 'appkit'
});
styles = preprocess(styles);

configTree = pickFiles(config, {
  srcDir: '/',
  destDir: 'config'
});
config = preprocess(config);

var sourceTrees = [app, styles, config, vendor];
sourceTrees = sourceTrees.concat(findBowerTrees(), findVendorTrees('vendor'));

var appAndDependencies = new mergeTrees(sourceTrees, { overwrite: true });

var appJs = compileES6(appAndDependencies, {
  loaderFile: 'loader.js',
  ignoredModules: [
    'ember/resolver'
  ],
  inputFiles: [
    'appkit/**/*.js'
  ],
  legacyFilesToAppend: [
    'environment.js',
    'environments/' + env + '.js',
    'handlebars.js',
    'ember.js',
    'ember-data.js',
    'ember-resolver.js',
    'jquery.cookie.js'
  ],
  wrapInEval: env !== 'production',
  outputFile: '/app.js'
});

var appCss = compileSass(sourceTrees, 'appkit/main.scss', '/app.min.css', { outputStyle: 'compressed' });
var normalizeCss = compileSass(sourceTrees, 'appkit/core/normalize.scss', '/normalize.min.css', { outputStyle: 'compressed' });

if (env === 'production') {
  appJs = uglifyJavaScript(appJs, {
    mangle: true,
    compress: true
  });
};

module.exports = mergeTrees([appJs, appCss, normalizeCss]);
