<template>
  <div ref="topdom" style="width: 100%; height: 100%; position: relative">
    <div style="width: 300px; height: 100%; float: left">
      <div style="width: 100%; height: 50%; background-color: gray">
        <template v-for="comp in allComponents" :key="comp.compCode">
          <div style="width: 100%; height: 32px; line-height: 32px; cursor: pointer"
            :style="{ background: currentChooseCode === comp.compCode ? '#cdcdcd' : 'transparent' }" @click="chooseComp(comp.compCode)">
            分组:{{comp.groupName }}----组件名: {{ comp.name }}</div>
        </template>
      </div>
      <!-- ------------------------------------------------------- -->
      <div style="width: 100%; height: 50%; background-color: green">
        <template v-for="cpage in allCustomPages" :key="cpage.code">
          <div style="width: 100%; height: 32px; line-height: 32px; cursor: pointer"
            :style="{ background: currentChooseCode === cpage.code ? '#cdcdcd' : 'transparent' }" @click="choosePage(cpage.code)">
            自定义页面:{{cpage.name }} </div>
        </template>
      </div>
    </div>
    <div style="width: calc(100% - 300px); height: 100%; float: left">
      <div style="height: 100%; width: 100%; position: relative" ref="container"></div>
    </div>
  </div>
</template>

<script lang="ts">
import vue from 'vue'
import { ref, h, render, onMounted, createApp } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { getAllComponents, DCompInfo, findSystemCompByCode, findOrginCompInfo } from '@design-any/interface/dist/LayoutAttr/ComponentInfo'
import { CPageInfo, findAllCustomPages, findCustomPageByCode } from '@design-any/interface/dist/LayoutAttr/CustomPage'

import { designDrawDomReal } from '@design-any/interface/dist/utils/drawVueDom'

import { platform } from '@design-any/interface'

import ViewShell from './ViewShell.vue'
import { getCurrentInstance } from 'vue'

@Options({})
export default class App extends Vue {
  private allComponents: DCompInfo[] = []
  private allCustomPages: CPageInfo[] = []
  private currentChooseCode: string = ''
  private curentApp: any = null

  mounted() {
    const instance = getCurrentInstance()
    this.curentApp = instance.appContext.app
    this.loadCompJs()
  }

  private async loadCompJs() {
    this.allComponents = getAllComponents(platform.page)
    this.allCustomPages = findAllCustomPages()
    this.$forceUpdate()
  }

  private async chooseComp(compCode) {
    this.currentChooseCode = compCode
    let targetcomp = findSystemCompByCode(compCode)
    console.log(targetcomp)
    let vueComp = designDrawDomReal(this.$refs.container, ViewShell, false, {})
    await this.$nextTick()
    ;(vueComp as ViewShell).addComponent(targetcomp)
  }

  private async choosePage(code) {
    this.currentChooseCode = code
    let targetpage = findCustomPageByCode(code)
    let vueComp = designDrawDomReal(this.$refs.container, targetpage, false, {})
    await this.$nextTick()
  }
}
</script>
<style></style>
