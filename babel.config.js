module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        corejs: {version: 3, proposals: true},
        useBuiltIns: 'entry',
        targets: {
          chrome: 52,
          safari: 5,
          browsers: ['last 2 versions', 'safari 5']
        },
        loose: true
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    // Stage 2
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions'
  ]
}
