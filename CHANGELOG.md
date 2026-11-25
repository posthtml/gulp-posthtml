# Change Log

All notable changes to this project will be documented in this file.

## Unreleased (4.0.0)

### Breaking Changes

* `posthtml` is now a peer dependency (`^0.16.0 || ^0.17.0`): install it next to `gulp-posthtml`. The previous release bundled `posthtml@^0.11`.
* Require Node.js `^20.19.0 || >=22.12.0`.
* `posthtml-load-config` 2: `posthtml.config.js` support follows its current format.

### Bug Fixes

* Emit errors from config loading and from the config function as `PluginError` instead of leaving the stream hanging ([#18](https://github.com/posthtml/gulp-posthtml/issues/18)).

### Development

* Replace `through2` with Node.js `stream.Transform`; update `plugin-error` to 2.
* Replace ava, nyc and standard with `node:test`, c8 and ESLint; drop the `posthtml-sugarml` test fixtures.
* Replace Travis CI with GitHub Actions.

<a name="3.0.4"></a>
## [3.0.4](https://github.com/posthtml/gulp-posthtml/compare/v3.0.3...v3.0.4) (2018-01-22)



<a name="3.0.3"></a>
## [3.0.3](https://github.com/posthtml/gulp-posthtml/compare/v3.0.2...v3.0.3) (2017-12-08)



<a name="3.0.0"></a>
# [3.0.0](https://github.com/posthtml/gulp-posthtml/compare/v1.5.2...v3.0.0) (2017-03-11)


### Features

* **index:** add config callback ([bdda211](https://github.com/posthtml/gulp-posthtml/commit/bdda211))
* **index:** add posthtml-load-config for autoload support ([800368f](https://github.com/posthtml/gulp-posthtml/commit/800368f))
* **index:** small refactor, add posthtml-load-config ([c7c631c](https://github.com/posthtml/gulp-posthtml/commit/c7c631c))
