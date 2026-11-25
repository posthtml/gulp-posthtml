import js from '@eslint/js'
import globals from 'globals'

export default [
  { ignores: ['coverage/**'] },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node }
  }
]
