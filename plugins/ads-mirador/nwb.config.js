module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ADSMirador',
      externals: {
        react: 'React'
      }
    }
  }
}
