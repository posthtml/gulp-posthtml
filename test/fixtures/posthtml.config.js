module.exports = (ctx) => ({
  parser: 'posthtml-sugarml',
  plugins: {
    'posthtml-include': ctx.options.include,
    'posthtml-content': false,
    'htmlnano': ctx.env === 'production' ? {} : false
  }
})
