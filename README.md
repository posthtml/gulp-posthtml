[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Tests][travis]][travis-url]
[![Coverage][cover]][cover-url]

<div align="center">
  <img width="200" height="150" title="Gulp" src="https://worldvectorlogo.com/logos/gulp.svg" />
  <img width="220" height="150" title="PostHTML" src="http://posthtml.github.io/posthtml/logo.svg">
  <h1>Gulp PostHTML</h1>
</div>

<h2 align="center">Install</h2>

```bash
npm i -D gulp-posthtml
```

PostHTML [plugins](https://www.npmjs.com/search?q=posthtml) should be installed separately.

<h2 align="center">Usage</h2>

```js
import { task, src, dest } from 'gulp'
import posthtml from 'gulp-posthtml'

task('html', () => {
    const plugins = [
      require('posthtml-include')(root: './src/components'),
      require('posthtml-custom-elements')()
    ]
    const options = { parser: require('sugarml') }

    return src('src/*.html')
      .pipe(posthtml(plugins, options))
      .pipe(gulp.dest('dest'))
})
```

#### ! WIP Load Config

```json
{
  "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-posthtml": "^1.5.1",
    "posthtml-include": "^1.0.0",
    "posthtml-custom-elements": "^1.0.0",
  },
  "posthtml": {
    "parser": "sugarml",
    "plugins": {
      "posthtml-include": {"root": "./src/components"},
      "posthtml-custom-elements": null
    }
  }
}
```
```js
import { task, src, dest } from 'gulp'
import posthtml from 'gulp-posthtml'

task('html', () => {
    return src('src/*.html')
      .pipe(posthtml())
      .pipe(gulp.dest('dest'))
})
```

<h2 align="center">LICENSE</h2>

> MIT License (MIT)

> Copyright (c) 2016 PostHTML Ivan Voischev

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[npm]: https://img.shields.io/npm/v/gulp-posthtml.svg
[npm-url]: https://npmjs.com/package/gulp-posthtml

[deps]: https://david-dm.org/posthtml/gulp-posthtml.svg
[deps-url]: https://david-dm.org/posthtml/gulp-posthtml

[travis]: http://img.shields.io/travis/posthtml/gulp-posthtml.svg
[travis-url]: https://travis-ci.org/posthtml/gulp-posthtml

[cover]: https://coveralls.io/repos/github/posthtml/gulp-posthtml/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/posthtml/gulp-posthtml?branch=master
