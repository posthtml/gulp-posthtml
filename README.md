# gulp-posthtml
[![npm version](https://badge.fury.io/js/gulp-posthtml.svg)](http://badge.fury.io/js/gulp-posthtml)

## Install 
```
npm install --save-dev gulp-posthtml
```
PostHTML [plugins](https://www.npmjs.com/search?q=posthtml) should be installed separately.

## Usage

```js
var gulp = require('gulp');
var posthtml = require('gulp-posthtml');

gulp.task('posthtml', function () {
    var plugins = [
        require('posthtml-doctype')('<!DOCTYPE html>'),
        require('posthtml-custom-elements')()
    ];

    var options = { closingSingleTag: 'slash' };

    return gulp.src('./html/*.html')
        .pipe(posthtml(plugins, options))
        .pipe(gulp.dest('./dest'));
});
```
