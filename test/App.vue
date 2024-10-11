<template>
  <div ref="topdom" style="width: 100%; height: 100%; position: relative">
    <div style="width: 300px; height: 100%; float: left">
      <button @click="loadCompJs" style="width: 70%; height: 30px">动态加载组件</button>
      <div style="width: 100%; height: calc(100% - 30px)">
        <template v-for="comp in allComponents" :key="comp.compCode">
          <div style="width: 100%; height: 32px; line-height: 32px; cursor: pointer" :style="{ background: currentChooseCode === comp.compCode ? '#cdcdcd' : 'white' }" @click="chooseComp(comp.compCode)">{{ comp.groupName + '|' + comp.name }}</div>
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

import { designDrawDomReal } from '@design-any/interface/dist/utils/drawVueDom'
import ViewShell from './ViewShell.vue'
import { getCurrentInstance } from 'vue'

@Options({})
export default class App extends Vue {
  private allComponents: DCompInfo[] = []
  private currentChooseCode: string = ''
  private curentApp: any = null
  mounted() {
    const instance = getCurrentInstance()
    this.curentApp = instance.appContext.app
  }

  private async loadCompJs() {
    this.allComponents = getAllComponents()
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
}
</script>
<style></style>
