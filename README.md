[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Tests][build]][build-url]
[![Coverage][cover]][cover-url]
[![Standard Code Style][style]][style-url]
[![Chat][chat]][chat-badge]

# Gulp PostHTML Plugin <img align="right" width="200" height="220" title="PostHTML" src="http://posthtml.github.io/posthtml/logo.svg">

## Install

```bash
npm i -D gulp-posthtml
```

PostHTML [plugins](https://www.npmjs.com/search?q=posthtml) should be installed separately.

## Usage

```js
import { task, src, dest } from 'gulp'
import posthtml from 'gulp-posthtml'

task('html', () => {
    const plugins = [
      require('posthtml-include')(root: './components'),
      require('posthtml-custom-elements')()
    ]
    const options = { parser: require('sugarml') }

    return src('src/*.html')
      .pipe(posthtml(plugins, options))
      .pipe(gulp.dest('dest'))
})
```

## Maintainers

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

## Contributing

See [PostHTML Guidelines](https://github.com/posthtml/posthtml/tree/master/docs) and [contribution guide](CONTRIBUTING.md).

## LICENSE

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/gulp-posthtml.svg
[npm-url]: https://npmjs.com/package/gulp-posthtml

[deps]: https://david-dm.org/posthtml/gulp-posthtml.svg
[deps-url]: https://david-dm.org/posthtml/gulp-posthtml

[build]: http://img.shields.io/travis/posthtml/gulp-posthtml.svg
[build-url]: https://travis-ci.org/posthtml/gulp-posthtml

[cover]: https://coveralls.io/repos/github/posthtml/gulp-posthtml/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/posthtml/gulp-posthtml?branch=master

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[chat]: https://badges.gitter.im/posthtml/posthtml.svg
[chat-badge]: https://gitter.im/posthtml/posthtml?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"
