// ------------------------------------
// #GULP - POSTHTML - TEST - INDEX
// ------------------------------------

const test = require('ava')

const join = require('path').join
const read = require('fs').readFileSync

const File = require('vinyl')

const posthtml = require('..')

const fixture = (file) => {
  return new File({
    path: join(process.cwd(), 'fixtures', file),
    contents: new Buffer(read(join(process.cwd(), 'fixtures', file), 'utf8'))
  })
}

const expect = (file) => {
  return read(join(process.cwd(), 'expect', file), 'utf8')
}

test('File', (t) => {
  const html = fixture('index.html')

  const plugin = posthtml([])

  plugin.write(html)

  plugin.on('data', (html) => {
    t.is(html.contents.toString('utf8'), expect('index.html'))
  })
})

test('Plugins', (t) => {
  const html = fixture('index.html')

  const plugins = [
    require('posthtml-include')({ root: './fixtures/components' })
  ]

  const plugin = posthtml(plugins)

  plugin.write(html)

  plugin.on('data', (html) => {
    t.is(html.contents.toString('utf8'), expect('result.html'))
  })
})

test('Options', (t) => {
  const html = fixture('index.sml')

  const plugins = []
  const options = { parser: require('posthtml-sugarml')() }

  const plugin = posthtml(plugins, options)

  plugin.write(html)

  plugin.on('data', (html) => {
    t.is(html.contents.toString('utf8'), expect('result.html'))
  })
})

test('Config', (t) => {
  const html = fixture('index.sml')

  const ctx = { include: { root: './fixtures/components' } }

  const plugin = posthtml(ctx)

  plugin.write(html)

  plugin.on('data', (html) => {
    t.is(html.contents.toString('utf8'), expect('result.html'))
  })
})
