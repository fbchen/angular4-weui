// import rollup from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: '../../../dist/publish-dist/angular-weui/es2015/index.es5.js',
  output: {
      file: '../../../dist/publish-dist/angular-weui/bundles/index.umd.js',
      format: 'umd',
      sourcemap: false,
      name: 'angular.weui',
      exports: 'named',
      globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        '@angular/forms': 'ng.forms',
        'rxjs/Observable': 'Rx',
        'rxjs/Subject': 'Rx',
        'rxjs/add/operator/debounceTime': 'Rx.Observable.prototype',
        'rxjs/add/operator/distinctUntilChanged': 'Rx.Observable.prototype'
      }
  },
  onwarn: function (warning) {
    // Suppress this error message... there are hundreds of them. Angular team says to ignore it.
    // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    // intercepts in some rollup versions
    if ( warning.message.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1 ) {
      return;
    }
    console.error(warning.message);
  },
  plugins: [
    nodeResolve({

      // the fields to scan in a package.json to determine the entry point
      // if this list contains "browser", overrides specified in "pkg.browser"
      // will be used
      mainFields: ['module', 'main', 'jsnext'],

      // some package.json files have a "browser" field which specifies
      // alternative files to load for people bundling for the browser. If
      // that's you, either use this option or add "browser" to the
      // "mainfields" option, otherwise pkg.browser will be ignored
      browser: true
    }),
    commonjs({
      include: '../../../node_modules/**'
    }),
    uglify()
  ]
}
