<template>
  <div style="height: 100%">
    <div :style="{ backgroundColor: background, borderWidth: isShowBorder ? '1px' : '0px', borderStyle: 'solid', borderColor: '#000000' }"
      style="height: 100%; display: table; table-layout: fixed; width: 100%">
      <span :style="{
          height: '100%',
          width: '100%',
          'font-weight': fontWeight,
          color: foreground,
          'font-size': fontSize + 'px',
          'font-style': fontStyle,
          'text-align': Horienten,
          'vertical-align': verticalAlign,
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
          display: 'table-cell',
          'white-space': space
        }" v-html="CurrentText"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Component, Emit, Watch, Prop } from 'vue-property-decorator'
import { EngineLayout, EngineComponent } from '@design-any/interface/dist/LayoutInterface'
import { DCompnentAttr } from '@design-any/interface/dist/LayoutAttr/ComponentInfo'

import {
  DPropAttr,
  PropertyGroupName,
  Number_Setting,
  Text_Setting,
  Boolean_Setting,
  Enum_Setting
} from '@design-any/interface/dist/LayoutAttr/PropertyInfo'
import { platform } from '@design-any/interface'

@DCompnentAttr(platform.page, 'Extand', 'demo1', 'DemoComponent_001', null)
@Options({})
export default class DemoComponent extends EngineComponent {
  isShowIndex: boolean = false
  isShowInput: boolean = false

  mounted() {
    this.width = '10%'
    this.height = '4%'
    this.background = 'white'
  }

  @DPropAttr(new Enum_Setting('FontWeight', PropertyGroupName.style, true, null, true, ['normal', 'bold', 'bolder', 'lighter']))
  private fontWeight: string = 'normal'

  @DPropAttr(new Enum_Setting('Font Style', PropertyGroupName.style, true, null, true, ['oblique', 'normal']))
  private fontStyle: string = 'normal'

  @DPropAttr(new Enum_Setting('Vertical Align', PropertyGroupName.style, true, null, true, ['top', 'middle', 'bottom']))
  private verticalAlign: string = 'middle'

  @DPropAttr(new Text_Setting('Text', PropertyGroupName.style, true))
  private CurrentText: string = 'Hellow World'

  @DPropAttr(new Enum_Setting('WhiteSpace', PropertyGroupName.style, true, null, true, ['nowrap', 'wrap']))
  private space: string = 'wrap'

  @DPropAttr(new Enum_Setting('TextAlign', PropertyGroupName.style, true, null, true, ['left', 'center', 'right']))
  private Horienten: string = 'center'

  @DPropAttr(new Boolean_Setting('ShowBorder', PropertyGroupName.style, true))
  private isShowBorder: boolean = false
}
</script>

<style lang="less" scoped>
span {
  background-color: transparent;
}
</style>
