#### 介绍

此库使用 vue3+typescript+webpack 编写。用于自定义 DesignAny 的插件，可以编写组件和页面。

#### 运行

1.yarn install （安装依赖包）

2.npm run test （运行测试页面）

3.npm run build:pro || npm run build:dev（打包插件，打包之后的插件在 dists 目录下，可以在 DesignAny 中导入。https://github.com/design-any/release.git

#### 项目目录介绍

1.自定义组件，需要使用@DCompnentAttr 进行标记，继承自 EngineComponent

![image-20250507133659466](https://github.com/design-any/images/blob/main/image-20250507133659466.png)

1.自定义组件，需要使用@CPageAttr 进行标记，继承自 CustomPageBase

![image-20250507133748290](https://github.com/design-any/images/blob/main/image-20250507133748290.png)

#### 组件协议

#### 页面协议
