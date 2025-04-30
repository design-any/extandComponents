// *********************************************************
const componentsFiles = require.context('./components', true, /\.(vue)$/)
componentsFiles.keys().reduce((modules, modulePath) => {
  const value = componentsFiles(modulePath)
  // Vue.component(getUuid(), value.default)
  return modules
}, {})
// *********************************************************
const pageFiles = require.context('./pages', true, /\.(vue)$/)
pageFiles.keys().reduce((modules, modulePath) => {
  const value = pageFiles(modulePath)
  // Vue.component(getUuid(), value.default)
  return modules
}, {})
// *********************************************************
export default {}
