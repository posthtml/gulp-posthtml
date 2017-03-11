// ------------------------------------
// #GULP - POSTHTML - TEST - INDEX
// ------------------------------------

const fs = require('fs')
const path = require('path')

const File = require('vinyl')

const fixture = (file) => {
  return new File({
    path: path.resolve('test/fixtures', file),
    contents: new Buffer(
      fs.readFileSync(path.resolve('test/fixtures', file), 'utf8')
    )
  })
}

const expected = (file) => {
  return fs.readFileSync(path.resolve('test/expect', file), 'utf8')
}

const posthtml = require('..')

test.skip('File', (t) => {
  const html = fixture('index.html')

  const plugin = posthtml([])

  plugin.write(html)

  plugin.on('data', (html) => {
    expect(html.contents.toString('utf8')).toEqual(expected('index.html'))
  })
})

test('Plugins', () => {
  const html = fixture('index.html')

  const plugins = [
    require('posthtml-include')({ root: './test/fixtures/components' })
  ]

  const plugin = posthtml(plugins)

  plugin.write(html)

  plugin.on('data', (html) => {
    expect(html.contents.toString('utf8')).toEqual(expected('result.html'))
  })
})

test('Options', () => {
  const html = fixture('index.sml')

  const plugins = []
  const options = { parser: require('posthtml-sugarml')() }

  const plugin = posthtml(plugins, options)

  plugin.write(html)

  plugin.on('data', (html) => {
    expect(html.contents.toString('utf8')).toEqual(expected('index.html'))
  })
})

test('Function', () => {
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
    expect(html.contents.toString('utf8')).toEqual(expected('result.html'))
  })
})

test('Config', () => {
  const html = fixture('index.sml')

  const ctx = { include: { root: './test/fixtures/components' } }

  const plugin = posthtml(ctx)

  plugin.write(html)

  plugin.on('data', (html) => {
    expect(html.contents.toString('utf8')).toEqual(expected('result.html'))
  })
})
