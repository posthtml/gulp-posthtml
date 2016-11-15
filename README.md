[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![code style][style]][style-url]
[![chat][chat]][chat-url]

<div align="center">
  <img width="100" height="200"     src="https://worldvectorlogo.com/logos/gulp.svg">
  <a href="https://github.com/posthtml/posthtml">
    <img width="220" height="200" title="PosHTML"           src="http://posthtml.github.io/posthtml/logo.svg">
  </a>
  <h1>Gulp PostHTML</h1>
  <p>PostHTML Plugin for Gulp<p>
</div>

<h2 align="center">Install</h2>

```bash
npm i -D gulp-posthtml
```

<h2 align="center">Usage</h2>

```js
import { task, src, dest } from 'gulp'

import posthtml from 'gulp-posthtml'

task('html', () => {
  return src('src/*.html')
    .pipe(posthtml())
    .pipe(dest('dest'))
})
```

<h2 align="center">Options</h2>

### Plugins

**`plugins`**: **`{Array}`** PostHTML Plugins

### Options

**`options`**: **`{Object}`** PostHTML Options

:warning: `posthtml.config.js` will not be loaded, when `plugins` and/or `options` are specified.

**gulpfile.js**
```js
import { task, src, dest } from 'gulp'

import tap from 'gulp-tap'
import rename from 'gulp-rename'
import posthtml from 'gulp-posthtml'

task('html', () => {
  let path
  const plugins = [ require('posthtml-include')({ root: path }) ]
  const options = { parser: require('posthtml-sugarml')() }

  return src('src/*.html')
    .pipe(tap((file) => path = file.path))
    .pipe(posthtml(plugins, options))
    .pipe(rename({ ext: '.html' }))
    .pipe(dest('dest'))
})
```

### Config

##### Context

**`ctx`**: **{Object}** PostHTML Config

**posthtml.config.js**
```js
module.exports = (ctx) => {
  return {
    parser: ctx.ext == '.sml' ? 'posthtml-sugarml' : false,
    plugins: {
      'posthtml-include': ctx.include,
      'htmlnano': ctx.env === 'production' ? null : false
    }
  }
}
```

**gulpfile.js**
```js
import { task, src, dest } from 'gulp'

import tap from 'gulp-tap'
import rename from 'gulp-rename'
import posthtml from 'gulp-posthtml'


task('sml', () => {
  const ctx = { ext: '.sml', include: {} }

  return src('src/*.sml')
    .pipe(tap((file) => ctx.include.root = file.path))
    .pipe(posthtml(ctx))
    .pipe(rename({ ext: '.html' }))
    .pipe(dest('dest'))
})

task('html', () => {
  const ctx = { include: {} }

  return src('src/*.html')
    .pipe(tap((file) => ctx.include.root = file.path))
    .pipe(posthtml(ctx))
    .pipe(dest('dest'))
})
```

<h2 align="center">Maintainer</h2>

<table>
  <tbody>
   <tr>
    <td align="center">
      <img width="150 height="150"
      src="https://avatars.githubusercontent.com/u/1510217?v=3&s=150">
      <br />
      <a href="https://github.com/voischev">Ivan Voischev</a>
    </td>
   </tr>
  <tbody>
</table>

<h2 align="center">Contributors</h2>

<table>
  <tbody>
   <tr>
    <td align="center">
      <img width="150 height="150"
      src="https://avatars.githubusercontent.com/u/5419992?v=3&s=150">
      <br />
      <a href="https://github.com/michael-ciniawsky">Michael Ciniawsky</a>
    </td>
   </tr>
  <tbody>
</table>

[npm]: https://img.shields.io/npm/v/gulp-posthtml.svg
[npm-url]: https://npmjs.com/package/gulp-posthtml

[node]: https://img.shields.io/node/v/gulp-posthtml.svg
[node-url]: https://nodejs.org/

[deps]: https://david-dm.org/posthtml/gulp-posthtml.svg
[deps-url]: https://david-dm.org/posthtml/gulp-posthtml

[tests]: http://img.shields.io/travis/posthtml/gulp-posthtml.svg
[tests-url]: https://travis-ci.org/posthtml/gulp-posthtml

[cover]: https://coveralls.io/repos/github/posthtml/gulp-posthtml/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/posthtml/gulp-posthtml?branch=master

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[chat]: https://badges.gitter.im/posthtml/posthtml.svg
[chat-url]: https://gitter.im/posthtml/posthtml?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"
