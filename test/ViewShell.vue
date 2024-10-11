<template>
  <div
    :style="{
      width: component == null ? 0 : component.width,
      height: component == null ? 0 : component.height,
      'z-index': component == null ? 0 : component.zIndex,
      left: component == null ? 0 : component.left,
      top: component == null ? 0 : component.top,
      'margin-left': component == null ? 0 : component.margin_left + 'px',
      'margin-right': component == null ? 0 : component.margin_right + 'px',
      'margin-top': component == null ? 0 : component.margin_top + 'px',
      'margin-bottom': component == null ? 0 : component.margin_bottom + 'px',
      'padding-left': component == null ? 0 : component.padding_left + 'px',
      'padding-right': component == null ? 0 : component.padding_right + 'px',
      'padding-top': component == null ? 0 : component.padding_top + 'px',
      'padding-bottom': component == null ? 0 : component.padding_bottom + 'px',
      position: 'absolute',
      display: 'block',
      tabindex: '1'
    }"
  >
    <div style="width: 100%; height: 100%; tab-index: 1" :style="{ zIndex: 0, 'font-family': component == null ? '' : component.fontFamily, display: component && component.display ? 'block' : 'none' }">
      <div style="tab-index: 1" ref="compContent"></div>
    </div>

    <div v-if="component && component.disabled" class="disableDiv" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Emit, Watch, Prop } from 'vue-property-decorator'
import { ref, h, render, onMounted, createApp } from 'vue'
import { EngineComponent } from '@design-any/interface/dist/LayoutInterface'
import { designDrawDomReal } from '@design-any/interface/dist/utils/drawVueDom'

import { findOrginEvents } from '@design-any/interface/dist/LayoutAttr/EventInfo'
import { getAllComponents, DCompInfo, findSystemCompByCode, findOrginCompInfo } from '@design-any/interface/dist/LayoutAttr/ComponentInfo'
import { findOrginMethods } from '@design-any/interface/dist/LayoutAttr/MethodInfo'
import { findOrginProps } from '@design-any/interface/dist/LayoutAttr/PropertyInfo'
import ElementPlus from 'element-plus'

@Options({})
export default class ViewShell extends Vue {
  public renderContainer: any = {}
  public component: EngineComponent = null
  public positionval: string = null

  get themeClass(): string {
    if (!this.component) {
      return ''
    }
    return ''
  }

  mounted() {}

  destorymethod() {
    render(null, this.renderContainer)
    $(this.$el).remove()
    for (const key in (this as any).prototype) {
      delete (this as any).prototype[key]
    }
    for (const key in this) {
      delete this[key]
    }
  }

  public addComponent(comp: any) {
    if (this.component != null) {
      this.component.destorymethod()
    }
    let vueComp = this.designDrawDomReal(this.$refs.compContent, comp, false, {})
    console.log(vueComp)
    this.component = vueComp as any
    $(this.component.$el).css('width', '100%')
    $(this.component.$el).css('height', '100%')

    return this.component
  }

  private designDrawDomReal(dom, vueComp, isDesigning, vueProps) {
    // let divdom = window.document.createElement('div')
    // fragment.appendChild(divdom)
    let allprops = findOrginProps(vueComp)
    let methods = findOrginMethods(vueComp)
    let events = findOrginEvents(vueComp)
    let compInfo = findOrginCompInfo(vueComp)

    if (!vueProps) {
      vueProps = {}
    }
    vueProps.designerMethods = methods
    vueProps.properties = allprops
    vueProps.designerEvents = events
    vueProps.compInfo = compInfo
    vueProps.isDesigning = isDesigning

    let comp = h(vueComp, vueProps)
    let app = createApp({ render: () => comp })

    app.use(ElementPlus)
    app.mount(dom)
    //记录显然的目标dom,销毁时需要用到 render(null,renderContainer)
    ;(comp.component.proxy as any).renderContainer = dom
    return comp.component.proxy as Vue
  }
}
</script>

<style lang="less" scoped>
.disableDiv {
  background: rgba(0, 0, 0, 0.4);
}
</style>
