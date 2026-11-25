[![npm][npm]][npm-url]
[![node][node]][node-url]
[![tests][tests]][tests-url]

<div align="center">
  <img width="100" height="200" src="https://worldvectorlogo.com/logos/gulp.svg">
  <a href="https://github.com/posthtml/posthtml">
    <img width="220" height="200" title="PostHTML" src="http://posthtml.github.io/posthtml/logo.svg">
  </a>
  <h1>Gulp PostHTML</h1>
</div>

<h2 align="center">Install</h2>

```bash
npm i -D gulp-posthtml posthtml
```

`posthtml` is a peer dependency: install the version you want to use (`^0.16.0 || ^0.17.0`). Requires Node.js `^20.19.0 || >=22.12.0`.

<h2 align="center">Usage</h2>

`gulp-posthtml` accepts plugins and options in three forms.

### Plugins and options

```js
import gulp from 'gulp'
import posthtml from 'gulp-posthtml'
import include from 'posthtml-include'

const { src, dest } = gulp

export function html () {
  const plugins = [include({ root: 'src/components' })]
  const options = { closingSingleTag: 'slash' }

  return src('src/*.html')
    .pipe(posthtml(plugins, options))
    .pipe(dest('dest'))
}
```

`options` are [PostHTML options](https://github.com/posthtml/posthtml/blob/master/docs/core.md), including parser and render options. `from` and `to` default to the file path.

### A function of the file

Return `{ plugins, options }` (or a Promise of it) for each [Vinyl](https://github.com/gulpjs/vinyl) file:

```js
export function html () {
  return src('src/**/*.html')
    .pipe(posthtml((file) => ({
      plugins: [include({ root: file.dirname })],
      options: {}
    })))
    .pipe(dest('dest'))
}
```

### [`posthtml.config.js`](https://github.com/posthtml/posthtml-load-config)

Pass an object (or nothing) to load `posthtml.config.js`, searched from the file's directory upwards, or from the `config` directory if set. The object is available in the config as `ctx.options`:

**posthtml.config.js**

```js
module.exports = ({ file, options, env }) => ({
  plugins: {
    'posthtml-include': { root: file.dirname },
    'posthtml-expressions': { locals: options.locals },
    htmlnano: env === 'production' ? {} : false
  }
})
```

**gulpfile.js**

```js
export function html () {
  return src('src/*.html')
    .pipe(posthtml({ locals: { title: 'Hello World!' } }))
    .pipe(dest('dest'))
}
```

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|`config`|`{String}`|file directory|Directory to search for `posthtml.config.js`|
|`...`|`{*}`||Any values, available as `ctx.options`|

### Errors

Errors from plugins and config loading are emitted on the stream as [`PluginError`](https://github.com/gulpjs/plugin-error). Streaming files are not supported.

`.pipe()` does not forward errors, so with `.pipe()` a failing file leaves the task unfinished. Use `pipeline` to fail the task with the error:

```js
import { pipeline } from 'node:stream/promises'

export function html () {
  return pipeline(
    src('src/*.html'),
    posthtml([include({ root: 'src/components' })]),
    dest('dest')
  )
}
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

[tests]: https://github.com/posthtml/gulp-posthtml/actions/workflows/test.yml/badge.svg
[tests-url]: https://github.com/posthtml/gulp-posthtml/actions/workflows/test.yml
