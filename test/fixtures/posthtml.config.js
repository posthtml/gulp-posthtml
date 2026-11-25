module.exports = (ctx) => ({
  plugins: {
    'posthtml-include': ctx.options.include
  }
})
