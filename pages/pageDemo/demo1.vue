<template>
  <div style="height: 100%;width:100%">
    你好啊,我是页面1
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Component, Emit, Watch, Prop } from 'vue-property-decorator'

import { CPageAttr } from '@design-any/interface/dist/LayoutAttr/CustomPage'
import { CustomPageBase } from '@design-any/interface/dist/LayoutInterface/CustomPageBase'

@CPageAttr('demo页面1', 'demoCustomPage1')
@Options({})
export default class demoCustomPage1 extends CustomPageBase {
  mounted() {}
}
</script>

<style lang="less" scoped>
</style>
