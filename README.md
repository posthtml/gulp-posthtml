[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![code style][style]][style-url]
[![chat][chat]][chat-url]

<div align="center">
  <img width="100" height="200" src="https://worldvectorlogo.com/logos/gulp.svg">
  <a href="https://github.com/posthtml/posthtml">
    <img width="220" height="200" title="PosHTML" src="http://posthtml.github.io/posthtml/logo.svg">
  </a>
  <h1>Gulp PostHTML</h1>
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

### `Plugins`

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|`plugins`|`{Array}`|`[]`|PostHTML Plugins|

### `Options`

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|`options`|`{Object}`|`{}`|PostHTML Options|

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

### `Config`

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|`plugins`|`{Array}`|`[]`|PostHTML Plugins|
|`options`|`{Object}`|`{}`|PostHTML Options|

**gulpfile.js**
```js
import { task, src, dest } from 'gulp'

import rename from 'gulp-rename'
import posthtml from 'gulp-posthtml'


task('ssml', () => {
  const config = (file) => ({
    plugins: [ require('posthtml-include')({ root: file.dirname }) ],
    options: { parser: require('posthtml-sugarml')() }
  })

  return src('src/*.sml')
    .pipe(posthtml(config))
    .pipe(rename({ ext: '.html' }))
    .pipe(dest('dest'))
})
```

### [`posthtml.config.js`](https://github.com/posthtml/posthtml-load-config)

#### `Context`

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|`env`|`{String}`|`'development'`|process.env.NODE_ENV|
|`file`|`{Object}`|`dirname, basename, extname`|File|
|`options`|`{Object}`|`{}`|Options (Parser, Render, Plugin Options)|

**posthtml.config.js**
```js
module.exports = ({ file, options, env }) => ({
  parser: 'posthtml-sugarml'
  plugins: {
    'posthtml-include': { root: file.dirname },
    'posthtm-expressions': { locals: options.locals }
    'htmlnano': env === 'production' ? {} : false
  }
})
```

**gulpfile.js**
```js
import { task, src, dest } from 'gulp'

import rename from 'gulp-rename'
import posthtml from 'gulp-posthtml'


task('ssml', () => {
  const ctx = { locals: { a: 'Hello World!'} }

  return src('src/*.sml')
    .pipe(posthtml(ctx))
    .pipe(rename({ ext: '.html' }))
    .pipe(dest('dest'))
})
```

<h2 align="center">Maintainer</h2>

<table>
  <tbody>
   <tr>
    <td align="center">
      <img width="150" height="150"
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
      <img width="150" height="150"
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

[cover]: https://coveralls.io/repos/github/posthtml/gulp-posthtml/badge.svg
[cover-url]: https://coveralls.io/github/posthtml/gulp-posthtml

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[chat]: https://badges.gitter.im/posthtml/posthtml.svg
[chat-url]: https://gitter.im/posthtml/posthtml
