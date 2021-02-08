# 1. 组件导入

```
import { ScaleViewContainer, ScaleViewItem } from '@/components/common/ScaleView';
```

<br>

# 2. 参数说明

## 2.1 ScaleViewContainer

### config 容器设置(必选)

```
config = {
  width: Integer, // (必选)容器宽度；如 1920，
  height: Integer, // (必选)容器高度；如 1080，
  scaleType: String, // (必选)缩放方式：FULL_SCREEN(适应全屏)|ADAPT_WIDTH(宽度铺满，高度按比例缩放)|ADAPT_HEIGHT(高度铺满，宽度按比例缩放)
}
```

### style 容器样式

```
style = {
  background: xxx,
  ...
}
```

### className 容器 class

```
className = {styles.container}
```

### contentStyle 容器内容区域样式

```
contentStyle = {
  background: xxx,
  ...
}
```

### contentClass 容器内容区域 class

```
contentClass = {styles.content}
```

## 2.2 ScaleViewItem

### style 基础样式(必选)

```
style = {
  top: Integer, // (必选)离容器顶部距离，单位像素；如 200,
  left: Integer, // (必选)离容器左边部距离，单位像素；如 200,
  width: Integer|String, // (必选)Item 宽度，单位像素；如 200|200px|100%，
  height: Integer|String, // (必选)Item 高度，单位像素；如 200|200px|100%，
}
```

### transition 进场过渡动画(非必选)

```
transition = {
  anim: String, // (必选)item 进场方式；slide(滑动)|opacity(渐变)
  from: String, // (非必选)item 进场起始位置，仅当 anim=slide 时有效；left(默认，从左边进场)|top(从顶部进场)|right(从右边进场)|bottom(从底部进场)
  timeout: Number, // (非必选)动画执行时间,默认250
  delay: Number, // (非必选)延迟执行,默认0
}
```

### mode 缩放模式(非必选，默认 standard)

#### mode = "standard"

```
mode = "standard" // 跟随容器缩放，不改变 item 的 width、height、scale（默认）
```

#### mode = "fixed"

```
mode = "fixed" // 跟随容器缩放，自动改变 item 的 width、height、scale。内容不会变形，但会被裁剪；使 item 大小不依赖 scale，而是通过改变宽高来适配；建议仅在地图上使用；
```

#### mode = "scaleXFix"

```
mode = "scaleXFix" // 跟随容器缩放，不改变 item 的 width、height，不改变 scaleY，自动改变 scaleX。内容不会变形。保持 scaleY，通过调整 scaleX 来保持内容不变形。
```

#### mode = "scaleYFix"

```
mode = "scaleYFix" // 跟随容器缩放，不改变 item 的 width、height，不改变 scaleX，自动改变 scaleY。内容不会变形。保持 scaleX，通过调整 scaleY 来保持内容不变形。
```

#### mode = "adaptWidth"

```
mode = "adaptWidth" // 跟隨容器縮放，宽度相对固定，高度自动缩放。当 container.scaleX / container.scaleY > 1 时，自动改变 width、scaleX；当 container.scaleX / container.scaleY < 1 时，自动改变 scaleY，内容不会变形；
```

#### mode = "adaptHeight"

```
mode = "scaleYFix" // 跟随容器缩放，高度相对固定，宽度自动缩放。当 container.scaleX / container.scaleY > 1 时，自动改变 scaleX；当 container.scaleX / container.scaleY < 1 时，自动改变 height, scaleY，内容不会变形；
```

### relations 相对布局关系(非必选)

```
relations={{
  layoutAbove: 'chartId', // 当前item位于chartId上方（覆盖style.bottom的值）
  layoutBelow: 'chartId', // 当前item位于chartId下方（覆盖style.top的值）
  toLeftOf: 'chartId', // 当前item位于chartId左方（覆盖style.right的值）
  toRightOf: 'chartId', // 当前item位于chartId右方（覆盖style.left的值）
  alignLeft: 'chartId', // 当前item左边界与chartId左边界对齐（覆盖style.left的值）
  alignRight: 'chartId', // 当前item右边界与chartId右边界对齐（覆盖style.right的值）
  alignTop: 'chartId', // 当前item上边界与chartId上边界对齐（覆盖style.top的值）
  alignBottom: 'chartId', // 当前item下边界与chartId下边界对齐（覆盖style.bottom的值）
}}
```

<br>

## 3. 完整例子

```
<ScaleViewContainer config={{
  width: 1920,
  height: 1080,
  scaleType: 'FULL_SCREEN'
}}>
  <ScaleViewItem
    id="chart1"
    style={{
      left: 200,
      top: 200,
      width: 300,
      height: 300,
    }}
    mode = 'scaleXFix'
    transition = {{
      anim: 'slide',
      from: 'left',
      timeout: 300,
      delay: 250,
    }}
    contentStyle = {{
      background: 'rgba(0, 0, 0, 0.5)'
    }}
  >
  </ScaleViewItem>
  <ScaleViewItem config={{
    id: chart2,
    style: {
      left: 200, // 将被toRightOf覆盖
      top: 200, // 将被layoutBelow覆盖
      width: 300,
      height: 300,
    }
    mode: 'scaleXFix'
    transition: {
      anim: 'slide',
      from: 'left',
      timeout: 300,
      delay: 250,
    }
    relations: {
      layoutBelow: 'chart1', // 位于chart1正下方
      toRightOf: 'chart1', // 位于chart1 正右方
    }
  }}>
    <MyComponent/>
  </ScaleViewItem>
  <ScaleViewItem config={{
    id: chart3,
    style: {
      left: 200, // toRightOf覆盖style.left
      top: 200, // alignTop覆盖style.top
      width: 300,
      height: 300, // alignBottom会覆盖style.bottom，所以height不生效
    }
    mode: 'scaleYFix'
    transition: {
      anim: 'slide',
      from: 'left',
      timeout: 300,
      delay: 250,
    }
    relations: {
      alignTop: 'chart2', // 与chart2上边界对齐
      alignBottom: 'chart2', // 与chart2 下边界对齐
      toRightOf: 'chart2', // 位于chart2右边
    }
  }}>
    <MyComponent/>
  </ScaleViewItem>
</ScaleViewContainer>
```
