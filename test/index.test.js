// ------------------------------------
// #GULP - POSTHTML - TEST - INDEX
// ------------------------------------

const test = require('ava')
const fs = require('fs')
const path = require('path')
const File = require('vinyl')

const fixture = (file) => {
  return new File({
    path: path.resolve('test/fixtures', file),
    contents: Buffer.from(
      fs.readFileSync(path.resolve('test/fixtures', file), 'utf8')
    )
  })
}

const expected = (file) => {
  return fs.readFileSync(path.resolve('test/expect', file), 'utf8')
}

const posthtml = require('..')

test.cb('File', t => {
  t.plan(2)
  const html = fixture('index.html')

  const plugin = posthtml([])

  plugin.write(html)

  plugin.on('data', (html) => {
    t.true(html.isBuffer())
    t.is(html.contents.toString('utf8'), expected('index.html'))
    t.end()
  })
})

test.cb('Plugins', t => {
  t.plan(2)
  const html = fixture('index.html')

  const plugins = [
    require('posthtml-include')({ root: './test/fixtures/components' })
  ]

  const plugin = posthtml(plugins)

  plugin.write(html)

  plugin.on('data', (html) => {
    t.true(html.isBuffer())
    t.is(html.contents.toString('utf8'), expected('html-result.html'))
    t.end()
  })
})

test.cb('Options', t => {
  t.plan(2)
  const html = fixture('index.sml')

  const cb = (file) => ({
    plugins: [
      require('posthtml-include')({ root: `${file.dirname}/components` })
    ],
    options: { parser: require('posthtml-sugarml')() }
  })

  const plugin = posthtml(cb)

  plugin.write(html)

  plugin.on('data', (html) => {
    t.true(html.isBuffer())
    t.is(html.contents.toString('utf8'), expected('sugar-result.html'))
    t.end()
  })
})

test.cb('Function', t => {
  t.plan(2)
  const html = fixture('index.sml')

  const cb = (file) => ({
    plugins: [
      require('posthtml-include')({ root: `${file.dirname}/components` })
    ],
    options: { parser: require('posthtml-sugarml')() }
  })

  const plugin = posthtml(cb)

  plugin.write(html)

  plugin.on('data', (html) => {
    t.true(html.isBuffer())
    t.is(html.contents.toString('utf8'), expected('sugar-result.html'))
    t.end()
  })
})

test.cb('Config', t => {
  t.plan(2)
  const html = fixture('index.sml')

  const ctx = { include: { root: './test/fixtures/components' } }

  const plugin = posthtml(ctx)

  plugin.write(html)

  plugin.on('data', (html) => {
    t.true(html.isBuffer())
    t.is(html.contents.toString('utf8'), expected('sugar-result.html'))
    t.end()
  })
})
