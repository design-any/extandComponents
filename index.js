const componentsFiles = require.context('./components', true, /\.(vue)$/)

componentsFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath)
  // Vue.component(getUuid(), value.default)
  return modules
}, {})
// *********************************************************

const pages = require.context('./pages', true, /\.(vue)$/)
pages.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath)
  // Vue.component(getUuid(), value.default)
  return modules
}, {})
