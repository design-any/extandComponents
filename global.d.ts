declare module '*.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}
declare module '*.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}

import type { DefineComponent } from 'vue'
declare module '*.vue' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// **************vue内部变量申明*******
import Vuex, { Store, createStore } from 'vuex'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // $t: (key: string, params?: any) => string
    $store: Store<any>
  }
}
export {}
