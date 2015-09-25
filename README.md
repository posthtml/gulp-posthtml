# gulp-posthtml
[![npm version](https://badge.fury.io/js/gulp-posthtml.svg)](http://badge.fury.io/js/gulp-posthtml)

## Install 
```
npm install --save-dev gulp-posthtml
```
Install required PostHTML [plugins](https://www.npmjs.com/search?q=posthtml) separately.

## Usage

```js
var posthtml = require('gulp-posthtml');
var gulp = require('gulp');

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
