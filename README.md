# ReactScaleView

## Introduction

ScaleView 组件库基于 React 封装，主要用于构建大屏（全屏）数据展示页面即数据可视化<br>
利用响应式的适配方式，不管是在 PC 端，还是投放到大屏上，不管是 1440\*768，1080p，还是 2k，4k 甚至更大分辨率的屏幕，都只需要 1 次适配，多屏幕兼容。<br>

###

![name](./public/resource/demo1.gif)<br>

### 响应式布局

![name](./public/resource/demo2.gif)<br>
以 UI 设计图为基准，适配好一个尺寸，理论上可以支持任意相似屏幕比例的屏幕<br>

## Install

npm: <code>npm i react-scale-view</code><br>
或<br>
yarn: <code>yarn add react-scale-view</code><br>

## Demo

1. yarn install
2. yarn start

## storybook

1. yarn install
2. yarn storybook

## Use

### 1. 创建容器

根据 UI 的设计图，创建相应的画布大小，画布大小一般为 1920px\*1080px<br>
在父组件中引入 ScaleViewContainer，将对容器内的所有子组件进行缩放处理<br>

```javascript
// 1. 新建配置文件, 如./config.js
export default {
  container: {
    width: 1920, // (必选)容器宽度；如 1920，
    height: 1080, // (必选)容器高度；如 1080，
    scaleType: 'FULL_SCREEN',
  },
};

// 2. 实例化容器组件, 如./DemoDataV.js
import { ScaleViewContainer } from 'react-scale-view';
import Config from './config';

const DemoDataV = props => {
  return (
    <ScaleViewContainer
      config={Config.container}
      className={styles.scaleViewContainer}
    >
      <Switch>
        <Route
          path="/demo"
          exact
          render={() => <Redirect to="/demo/data-v1" />}
        />
        <Route path="/demo/data-v1" component={LoadableDataV1} />
        <Route path="/demo/data-v2" component={LoadableDataV2} />
        <Route path="/demo/data-v3" component={LoadableDataV3} />
      </Switch>
    </ScaleViewContainer>
  );
};

export default DemoDataV;
```

### 2. 创建子组件

```javascript
// 1. 新建配置文件, 在配置文件中配置每个需要适配的组件栏的配置
export default {
  topChart: {
    id: 'topChart',
    style: {
      left: 0,
      top: 0,
      right: 0,
      width: '100%',
      height: 200,
    },
    transition: {
      anim: 'slide',
      from: 'top',
      timeout: 300,
      delay: 300,
    },
    mode: 'adaptWidth',
  },
  leftChart: {
    id: 'leftChart',
    style: {
      left: 0,
      bottom: 0,
      width: 400,
    },
    transition: {
      anim: 'slide',
      from: 'left',
      timeout: 300,
      delay: 300,
    },
    mode: 'scaleXFix',
    relations: {
      layoutBelow: 'topChart',
    },
  },
  rightChart: {
    id: 'rightChart',
    style: {
      right: 0,
      bottom: 0,
      width: 460,
    },
    transition: {
      anim: 'slide',
      from: 'right',
      timeout: 300,
      delay: 300,
    },
    mode: 'scaleXFix',
    relations: {
      layoutBelow: 'topChart',
    },
  },
  mapChart: {
    style: {
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    },
    mode: 'fixed',
  },
};

// 2. 实例化组件，在页面中引入ScaleViewItem
import React, { useEffect } from 'react';
import { ScaleViewItem } from 'react-scale-view';
import { Map } from '@/components';
import Config from './config';
import styles from './DataV1.module.less';

const DataV1 = props => {
  return (
    <>
      <ScaleViewItem config={Config.mapChart}>
        <Map></Map>
      </ScaleViewItem>
      <ScaleViewItem config={Config.leftChart} contentClass={styles.leftChart}>
        LeftChart
      </ScaleViewItem>
      <ScaleViewItem config={Config.topChart} contentClass={styles.topChart}>
        Top Chart
      </ScaleViewItem>
      <ScaleViewItem
        config={Config.rightChart}
        contentClass={styles.rightChart}
      >
        Right Chart
      </ScaleViewItem>
    </>
  );
};

export default DataV1;
```

## Document

文档可参考 storybook，运行本项目命令 yarn storybook 即可看到相关文档

### ScaleViewContainer

使用 ScaleViewContainer 作为大屏的容器组件，可以根据当前浏览器的像素宽高，将容器内的组件统一按照某个计算比值进行缩放。用户只需要按照设计稿还原 UI，使用该组件，可以在任何分辨率的浏览器中按比例尽可能还原。
| 参数 | 说明 | 类型 | 默认值 | 必选 |
| ------------ | ---------------------------------------- | ------ | ------ | ---- |
| config | 设置容器画布（内容区域）的尺寸及缩放模式 | object | 无 | 是 |
| style | 容器的样式 | object | 无 | 否 |
| className | 容器的 class | class | 无 | 否 |
| contentStyle | 容器画布（内容区域）的样式 | object | 无 | 否 |
| contentClass | 容器画布（内容区域）的 class | class | 无 | 否 |

## config

| 参数      | 说明                                                                                                                                                 | 类型   | 默认值 |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ |
| width     | 容器宽度                                                                                                                                             | Number |        |
| height    | 容器高度                                                                                                                                             | Number |        |
| scaleType | 容器缩放模式：<code>FULL_SCREEN</code>适应全屏，<code>ADAPT_HEIGHT</code>宽度铺满，高度按比例缩放， <code>ADAPT_WIDTH</code>高度铺满，宽度按比例缩放 | String |        |
