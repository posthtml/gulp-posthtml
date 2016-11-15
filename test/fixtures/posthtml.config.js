module.exports = (ctx) => {
  return {
    parser: 'posthtml-sugarml',
    from: './fixtures/index.sml',
    to: './expect/index.html',
    plugins: {
      'posthtml-include': ctx.include,
      'posthtml-content': false,
      'htmlnano': ctx.env === 'production' ? {} : false
    }
  }
}
