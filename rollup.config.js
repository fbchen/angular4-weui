// import rollup from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'dist/angular4-weui/index.js',
  dest: 'dist/angular4-weui/es2005/index.umd.js',
  sourceMap: false,
  format: 'iife',
  moduleName: 'angular.weui',
  onwarn: function (warning) {
    // Suppress this error message... there are hundreds of them. Angular team says to ignore it.
    // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    // intercepts in some rollup versions
    if ( warning.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1 ) {
      return;
    }
    console.error(warning.message);
  },
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/forms': 'ng.forms',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx',
    'rxjs/add/operator/debounceTime': 'Rx.Observable.prototype',
    'rxjs/add/operator/distinctUntilChanged': 'Rx.Observable.prototype'
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      module: true,
      main: true, // for commonjs modules that have an index.js
      browser: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    uglify()
  ]
}
