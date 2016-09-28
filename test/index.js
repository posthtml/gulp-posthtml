const test = require('ava')

const File = require('vinyl')
const readFileSync = require('fs').readFileSync

const posthtml = require('..')

test('1 - File', (t) => {
  const html = new File({
    contents: new Buffer(readFileSync('./fixtures/index.html'))
  })

  const plugin = posthtml([])

  plugin.write(html)

  plugin.on('data', (html) => {
    t.is(html.contents.toString('utf8'), readFileSync('./expect/index.html'))
  })
})

test('2 - Plugins', (t) => {
  const html = new File({
    contents: new Buffer(readFileSync('./fixtures/index.html'))
  })

  const plugins = [
    require('posthtml-include')({ root: './fixtures/components' })
  ]

  const plugin = posthtml(plugins)

  plugin.write(html)

  plugin.on('data', (html) => {
    t.is(html.contents.toString('utf8'), readFileSync('./expect/include.html'))
  })
})

test('3 - Options', (t) => {
  const html = new File({
    contents: new Buffer(readFileSync('./fixtures/index.pug'))
  })

  const plugins = []
  const options = { parser: require('posthtml-pug')({ pretty: true }) }

  const plugin = posthtml(plugins, options)

  plugin.write(html)

  plugin.on('data', (html) => {
    t.is(html.contents.toString('utf8'), readFileSync('./expect/index.html'))
  })
})
