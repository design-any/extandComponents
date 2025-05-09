#### 介绍

此库使用 vue3+typescript+webpack 编写。用于自定义 DesignAny 的插件，可以编写组件和页面。

#### 运行

1.yarn install （安装依赖包）

2.npm run test （运行测试页面）

3.npm run build:pro || npm run build:dev（打包插件，打包之后的插件在 dists 目录下，可以在 DesignAny 中导入。https://github.com/design-any/DesignAny-LowCode-Publish

#### 项目目录介绍

1.自定义组件，需要使用@DCompnentAttr 进行注解，继承自 EngineComponent

![image-20250507133659466](https://github.com/design-any/images/blob/main/image-20250507133659466.png)

1.自定义组件，需要使用@CPageAttr 进行注解，继承自 CustomPageBase

![image-20250507133748290](https://github.com/design-any/images/blob/main/image-20250507133748290.png)

#### 组件协议

DCompnentAttr（注解，用于标记当前文件是自定义组件）

| 字段      | 作用                                                                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| platform  | 用于标识该组件适用于那些平台，可选值:platform.page（页面）,platform.universal（通用）platform.server（工作流）platform.dynamicLayout（动态布局） |
| groupName | 组件分组，可以自行输入分组名称                                                                                                                   |
| name      | 组件名称                                                                                                                                         |
| compCode  | 组件的唯一编码，用于全局标识组件，需要用一个比较特殊的字符串，这样不会和其它组件冲突                                                             |
| icon      | 组件的图标                                                                                                                                       |

DPropAttr（注解，用于标记组件中的可设计属性）

| 字段            | 作用                                                                                                                                                                                                                                                                                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PropertySetting | 用于对属性进行注解的基类。方便设计器理解。可选的类有：Enum_Setting，Margin_Setting，Padding_Setting，Boolean_Setting，Text_Setting，Number_Setting，NumberList_Setting，TextList_Setting，Color_Setting，UploadFile_Setting，JsonContent_Setting，TimePickerFile_Setting，Behavior_Setting，PageInParams_Setting，TableColumn_Setting，AppPagesChoose_Setting，KeyValue_Setting |

#### 页面协议

CPageAttr（注解，用于标记当前文件时自定义页面）

| 字段 | 作用                                                                                 |
| ---- | ------------------------------------------------------------------------------------ |
| name | 页面的名称                                                                           |
| code | 页面的唯一编码，用于全局标识组件，需要用一个比较特殊的字符串，这样不会和其它页面冲突 |
