/**
 * resizeFixed
 * 跟随容器缩放，自动改变item的width、height、scale。
 * 内容不会变形，但会被裁剪；使item大小不依赖scale，而是通过改变宽高来适配；建议仅在地图上使用；
 */
export const getScalesWithFixed = props => {
  const { size, style } = props;
  const { scaleX, scaleY } = size;
  return {
    scale: [1 / scaleX, 1 / scaleY],
    style: {
      width: `calc(${style.width} * ${scaleX})`,
      height: `calc(${style.height} * ${scaleY})`,
    },
  };
};

/**
 * resizeScaleXFix
 * 跟随容器缩放，不改变 item 的 width、height，不改变 scaleY，自动改变 scaleX。
 * 内容不会变形。保持 scaleY，通过调整 scaleX 来保持内容不变形。
 */
export const getScalesWithScaleXFix = props => {
  const { size } = props;
  const { scaleX, scaleY } = size;
  return [scaleY / scaleX, 1];
};

/**
 * resizeScaleYFix
 * 跟随容器缩放，不改变 item 的 width、height，不改变 scaleX，自动改变 scaleY。
 * 内容不会变形。保持 scaleX，通过调整 scaleY 来保持内容不变形。
 */
export const getScalesWithScaleYFix = props => {
  const { size } = props;
  const { scaleX, scaleY } = size;
  return [1, scaleX / scaleY];
};

/**
 * resizeAdaptWidth
 * 跟隨容器縮放，宽度相对固定，高度自动缩放。
 * 当container.scaleX / container.scaleY > 1 时，自动改变width,scaleX；
 * 当container.scaleX / container.scaleY < 1 时，自动改变scaleY，内容不会变形；
 */
export const getScalesWithAdaptWidth = props => {
  const { size, style } = props;
  const { scaleX, scaleY } = size;
  const ratio = scaleX / scaleY;
  if (ratio >= 1) {
    return {
      scale: [1 / ratio, 1],
      style: {
        width: `calc(${style.width} * ${ratio})`,
      },
    };
  } else {
    return {
      scale: [1, ratio],
    };
  }
};

/**
 * resizeAdaptHeight
 * 跟随容器缩放，高度相对固定，宽度自动缩放。
 * 当container.scaleX / container.scaleY > 1 时，自动改变scaleX；
 * 当container.scaleX / container.scaleY < 1 时，自动改变height, scaleY，内容不会变形；
 */
export const getScalesWithAdaptHeight = props => {
  const { size, style } = props;
  const { scaleX, scaleY } = size;
  const ratio = scaleX / scaleY;
  if (ratio >= 1) {
    return {
      scale: [1 / ratio, 1],
    };
  } else {
    return {
      scale: [1, ratio],
      style: {
        width: `calc(${style.height} * ${ratio})`,
      },
    };
  }
};

// 获取变换原点
export function getTransformOrigin(style, transition) {
  let { transformOrigin } = style;
  // 默认取已设原点
  if (transformOrigin) {
    return {
      transformOrigin,
    };
  }
  if (transition && transition.from) {
    switch (transition.from) {
      case 'top':
        return { transformOrigin: '0 0' };
      case 'bottom':
        return { transformOrigin: '0 100%' };
      case 'left':
        return { transformOrigin: '0 50%' };
      case 'right':
        return {
          transformOrigin: '100% 50%',
        };
      default:
        return { transformOrigin: '50% 50%' };
    }
  }
  return { transformOrigin: '0% 0%' };
}

// 滚动进入初始化
export function getSlideStyle(from, delay, timeout) {
  let transitionStyle = {};
  let defaultTransform = '';
  switch (from) {
    case 'left':
      defaultTransform = { transform: 'translateX(-100%)', opacity: 0 };
      transitionStyle = {
        entering: { transform: 'translateX(0)', opacity: 1 },
        entered: { transform: 'translateX(0)', opacity: 1 },
        exiting: { transform: 'translateX(-100%)', opacity: 0 },
        exited: { transform: 'translateX(-100%)', opacity: 0 },
      };
      break;
    case 'right':
      defaultTransform = { transform: 'translateX(100%)', opacity: 0 };
      transitionStyle = {
        entering: { transform: 'translateX(0)', opacity: 1 },
        entered: { transform: 'translateX(0)', opacity: 1 },
        exiting: { transform: 'translateX(100%)', opacity: 0 },
        exited: { transform: 'translateX(100%)', opacity: 0 },
      };
      break;
    case 'top':
      // defaultTransform = 'translateY(-100%)';
      defaultTransform = { transform: 'translateY(-100%)', opacity: 0 };
      transitionStyle = {
        entering: { transform: 'translateY(0)', opacity: 1 },
        entered: { transform: 'translateY(0)', opacity: 1 },
        exiting: { transform: 'translateY(-100%)', opacity: 0 },
        exited: { transform: 'translateY(-100%)', opacity: 0 },
      };
      break;
    case 'bottom':
      // defaultTransform = 'translateY(100%)';
      defaultTransform = { transform: 'translateY(100%)', opacity: 0 };
      transitionStyle = {
        entering: { transform: 'translateY(0)', opacity: 1 },
        entered: { transform: 'translateY(0)', opacity: 1 },
        exiting: { transform: 'translateY(100%)', opacity: 0 },
        exited: { transform: 'translateY(100%)', opacity: 0 },
      };
      break;
    default:
      break;
  }
  return {
    defaultTransitionStyle: {
      transition: `all ${timeout}ms ease-in`,
      ...defaultTransform,
    },
    transitionStyle,
  };
}

// 渐变进入初始化
export function getOpacityStyle(delay, timeout) {
  // let opacity = 0;
  const defaultTransform = { opacity: 0 };
  let transitionStyle = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };
  return {
    defaultTransitionStyle: {
      transition: `opacity ${timeout}ms ease-in-out`,
      ...defaultTransform,
    },
    transitionStyle,
  };
}

// 获取dom元素样式
const getStyleByElement = el => {
  // console.log(el);
  if (!el) {
    return {};
  }
  // 获取id元素的变换属性
  const scale = getTransformScaleArray(el.style.transform);
  const transformOrigin = el.style.transformOrigin.split(' ');
  return {
    left: el.offsetLeft,
    top: el.offsetTop,
    width: el.offsetWidth,
    height: el.offsetHeight,
    scaleX: scale[0],
    scaleY: scale[1],
    parent: el.offsetParent,
    transformOrigin,
    node: el,
  };
};

// 根据id获取dom元素样式
const getStyleById = async (id, mId) => {
  const findElement = async id => {
    return new Promise(resolve => {
      let el = null;
      const recycle = (id, times = 0) => {
        el = document.getElementById(id);
        if (!el) {
          if (times === 3) {
            resolve(null);
          }
          setTimeout(() => {
            recycle(id, times + 1);
          }, 0);
        } else {
          resolve(el);
        }
      };
      recycle(id, 0);
    });
  };
  if (id === mId) {
    // 不能相对于本身进行布局, 会造成死循环
    console.error('relationId不能是组件本身');
    return {};
  }
  const el = await findElement(id);
  if (!el) {
    console.error('找不到相对组件或关系不正确');
    return {};
  }
  return getStyleByElement(el);
};

// 获取目标组件transformOriginY的值
const getTargetOriginYRatio = rect => {
  const { transformOrigin, height } = rect;
  if (transformOrigin[1].endsWith('%')) {
    const origin = parseFloat(transformOrigin[1]) / 100;
    return origin;
  } else {
    const origin = parseFloat(transformOrigin[1]) / height;
    return origin;
  }
};

// 获取目标组件transformOriginX的值
const getTargetOriginXRatio = rect => {
  const { transformOrigin, width } = rect;
  if (transformOrigin[0].endsWith('%')) {
    const origin = parseFloat(transformOrigin[0]) / 100;
    return origin;
  } else {
    const origin = parseFloat(transformOrigin[0]) / width;
    return origin;
  }
};

// 根据相对关系，确认当前组件的尺寸
export const getCurrentStyleByRelations = async props => {
  const {
    relations = {},
    id: mId,
    scales: mScales,
    transformOrigin: mTransformOrigin,
    size: mSize,
    el: mElem,
  } = props;
  // console.log(props);
  const ids = [...new Set(Object.values(relations))];
  if (ids.length === 0) {
    return {};
  }

  // 根据相对关系确定当前组件的样式
  const calculateStyleByRelations = async () => {
    return new Promise(resolve => {
      const afterStyle = {}; // 重新计算后的布局样式
      const list = Object.entries(relations);
      if (list.length === 0) {
        resolve(afterStyle);
      }
      let mLeft = null;
      let mRight = null;
      let mTop = null;
      let mBottom = null;
      // 遍历布局关系
      list.forEach(async (rel, i) => {
        const rect = await getStyleById(rel[1], mId);
        const offsetYRadio = getTargetOriginYRatio(rect);
        const offsetXRadio = getTargetOriginXRatio(rect);
        let offsetY = 0; // 偏移量
        let offsetX = 0;
        switch (rel[0]) {
          case 'layoutBelow':
            // 位于rel[1]元素正下方
            offsetY = rect.height * (1 - rect.scaleY) * (1 - offsetYRadio);
            mTop = rect.top + rect.height - offsetY;
            break;
          case 'layoutAbove':
            // 位于rel[1]元素的正上方
            offsetY = rect.height * (1 - rect.scaleY) * offsetYRadio;
            mBottom = rect.parent.offsetHeight - rect.top - offsetY;
            break;
          case 'toLeftOf':
            // 位于rel[1]元素左边
            offsetX = rect.width * (1 - rect.scaleX) * offsetXRadio;
            mRight = rect.parent.offsetWidth - rect.left - offsetX;
            break;
          case 'toRightOf':
            // 位于rel[1]元素右边
            offsetX = rect.width * (1 - rect.scaleX) * (1 - offsetXRadio);
            mLeft = rect.left + rect.width - offsetX;
            break;
          case 'alignLeft':
            // 左边界与rel[1]元素的左边界对齐
            offsetX = rect.width * (1 - rect.scaleX) * offsetXRadio;
            mLeft = rect.left + offsetX;
            break;
          case 'alignRight':
            // 右边界rel[1]元素的右边界对齐
            offsetX = rect.width * (1 - rect.scaleX) * offsetXRadio;
            mRight =
              rect.parent.offsetWidth -
              rect.left -
              rect.width * rect.scaleX -
              offsetX;
            break;
          case 'alignTop':
            // 上边界与rel[1]上边界对齐
            offsetY = rect.height * (1 - rect.scaleY) * offsetYRadio;
            mTop = rect.top + offsetY;
            break;
          case 'alignBottom':
            // 下边界与rel[1]下边界对齐
            offsetY = rect.height * (1 - rect.scaleY) * offsetYRadio;
            mBottom =
              rect.parent.offsetHeight -
              rect.top -
              rect.height * rect.scaleY -
              offsetY;
            break;
          default:
            break;
        }

        if (list.length === i + 1) {
          // 返回结果，重新计算位置
          const getTransformOrigin = () => {
            const transformOrigin =
              mElem.current.style.transformOrigin ||
              mTransformOrigin.transformOrigin;
            return transformOrigin.split(' ');
          };

          const resetTransformOffset = () => {
            const transformOrigin = getTransformOrigin();
            let originX = 0; // x方向锚点
            let originY = 0; // y方向锚点
            // 视口宽高
            const { width: screenWidth, height: screenHeight } = mSize;
            // 当前组件的缩放比例
            const scaleX = mScales[0];
            const scaleY = mScales[1];

            const { width, height } = mElem.current.style;
            const boxWidth = parseInt(width) || screenWidth - mLeft - mRight;
            const boxHeight = parseInt(height) || screenHeight - mTop - mBottom;
            // 把锚点转成百分比
            if (transformOrigin[0].endsWith('%')) {
              originX = parseFloat(transformOrigin[0]) / 100;
            } else {
              originX = parseFloat(transformOrigin[0]) / boxWidth;
            }
            if (transformOrigin[1].endsWith('%')) {
              originY = parseFloat(transformOrigin[1]) / 100;
            } else {
              originY = parseFloat(transformOrigin[1]) / boxHeight;
            }

            if (mLeft != null) {
              const offsetLeft = boxWidth * (1 - scaleX) * originX;
              mLeft = mLeft - offsetLeft;
              afterStyle.left = mLeft;
            }

            if (mRight != null) {
              const offsetRight = boxWidth * (1 - scaleX) * (1 - originX);
              mRight = mRight - offsetRight;
              afterStyle.right = mRight;
            }

            if (mTop != null) {
              const offsetTop = boxHeight * (1 - scaleY) * originY;
              mTop = mTop - offsetTop;
              afterStyle.top = mTop;
            }

            if (mBottom != null) {
              const offsetBottom = boxHeight * (1 - scaleY) * (1 - originY);
              mBottom = mBottom - offsetBottom;
              afterStyle.bottom = mBottom;
            }
          };
          resetTransformOffset();
          resolve(afterStyle);
        }
      });
    });
  };
  return calculateStyleByRelations();
};

export const getStyleByMode = props => {
  const { relateStyle, el, transition, scales, afterStyle } = props;
  let modeStyle = { ...afterStyle, ...relateStyle };
  const elem = el.current || {};
  // const { transform } = elem.style;
  // const translate = getTransformTranslate(transform);
  const { transform } = modeStyle;
  return {
    ...modeStyle,
    transform: `scale(${scales[0]}, ${scales[1]}) ${transform || ''}`,
    ...getTransformOrigin({ ...elem.style, ...afterStyle }, transition),
  };
};

export const getAttributesByMode = props => {
  const { mode, size, transition, style } = props;
  // const style = el.current ? el.current.style : {};
  let scales = [];
  let afterStyle = style;
  let res = {};
  switch (mode) {
    case 'fixed':
      res = getScalesWithFixed({ size, style });
      scales = res.scale;
      afterStyle = { ...afterStyle, ...res.style };
      break;
    case 'scaleXFix':
      scales = getScalesWithScaleXFix({ size });
      break;
    case 'scaleYFix':
      scales = getScalesWithScaleYFix({ size });
      break;
    case 'adaptWidth':
      res = getScalesWithAdaptWidth({ size, style });
      scales = res.scale;
      afterStyle = { ...afterStyle, ...res.style };
      break;
    case 'adaptHeight':
      res = getScalesWithAdaptHeight({ size, style });
      scales = res.scale;
      afterStyle = { ...afterStyle, ...res.style };
      break;
    default:
      scales = [1, 1];
      break;
  }

  const transformOrigin = getTransformOrigin(style, transition);
  return { scales, transformOrigin, afterStyle };
};

// 防抖函数
export function debounce(fn, delay) {
  let handle = null;
  return function(...e) {
    // 取消之前的延时调用
    clearTimeout(handle);
    handle = setTimeout(() => {
      fn.call(this, ...e);
    }, delay);
  };
}

export function getTransformScaleArray(transform) {
  const patt = /scale\((.*)\)/;
  const res = patt.exec(transform);
  if (res) {
    return res[1].split(',').map(parseFloat);
  } else {
    return [1, 1];
  }
}
