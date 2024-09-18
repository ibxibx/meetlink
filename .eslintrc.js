module.exports = {
  extends: ['react-app', 'react-app/jest'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: [
        ['babel-preset-react-app', false],
        'babel-preset-react-app/prod'
      ]
    }
  },
  rules: {
    // You can add custom rules here
  }
};