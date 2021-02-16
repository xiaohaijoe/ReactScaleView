import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import {
  getCurrentStyleByRelations,
  getStyleByMode,
  getAttributesByMode,
} from '../util';
import { useNestification, useTransition } from '../hooks';
import ScaleViewContext from '../ScaleViewContext';
import Transition from '../ScaleViewTransition';
import { transitionShape, relationsShape } from './types';
import './ScaleViewItem.css';

const useScaleViewItem = props => {
  const { size, el, mode, transition, style } = props;
  const [containerStyle, setContainerStyle] = useState({});
  const transitionRef = useTransition({
    anim: 'opacity',
    delay: 0,
    timeout: 0,
    show: false,
    ...transition,
  });
  useMemo(async () => {
    // 1. 根据mode确认缩放比例
    const { scales, transformOrigin, afterStyle } = getAttributesByMode({
      mode,
      style,
      transition,
      size,
    });
    // 2. 根据relations确认相对关系style
    const relateStyle = await getCurrentStyleByRelations({
      scales,
      transformOrigin,
      ...props,
    });
    // 3. 根据mode确定组件style
    const modeStyle = getStyleByMode({
      el,
      afterStyle,
      relateStyle,
      scales,
      transition,
    });
    // 设置组件样式
    setContainerStyle(modeStyle);
    // 播放进场动画
    transitionRef.onEnter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);
  return {
    containerStyle,
    transitionProps: transitionRef.transitionProps,
    ...transitionRef.transitionStyle,
  };
};

const Content = props => {
  const {
    children,
    contentClass,
    contentStyle,
    defaultContentStyle,
    transitionContentStyle,
    transitionProps,
  } = props;

  return (
    <Transition in={transitionProps.show} timeout={transitionProps.timeout}>
      {status => {
        return (
          <div
            style={{
              ...defaultContentStyle,
              ...transitionContentStyle[status],
              ...contentStyle,
            }}
            className={['scale-view-item__content', contentClass]
              .filter(Boolean)
              .join(' ')}
          >
            {children}
          </div>
        );
      }}
    </Transition>
  );
};

const Container = props => {
  const { config = {}, className, contentClass, size, children } = props;
  const style = { ...props.style, ...config.style };
  const contentStyle = { ...props.contentStyle, ...config.contentStyle };
  const mode = props.mode || config.mode || '';
  const id = props.id || config.id;
  const relations = props.relations || config.relations || {};
  const getContainer = props.getContainer || config.getContainer;
  const containerEl = useRef(null);
  const transition = props.transition || config.transition || {};

  // 检查是否嵌套ScaleViewItem
  useNestification(containerEl);
  const resultParams = useScaleViewItem({
    size,
    el: containerEl,
    mode,
    relations,
    transition,
    style,
  });
  const {
    containerStyle,
    defaultContentStyle,
    transitionContentStyle,
    transitionProps,
  } = resultParams;
  const renderContainer = () => {
    return (
      <div
        id={id}
        data-symbol="data-view-item"
        style={{ ...containerStyle }}
        ref={containerEl}
        className={['scale-view-item__container', className]
          .filter(Boolean)
          .join(' ')}
      >
        <Content
          contentClass={contentClass}
          contentStyle={contentStyle}
          defaultContentStyle={defaultContentStyle}
          transitionContentStyle={transitionContentStyle}
          transitionProps={transitionProps}
        >
          {children}
        </Content>
      </div>
    );
  };
  if (getContainer) {
    return ReactDOM.createPortal(
      renderContainer(),
      typeof getContainer === 'function' ? getContainer() : getContainer
    );
  } else {
    return renderContainer();
  }
};

const ScaleViewItem = props => {
  return (
    <ScaleViewContext.Consumer>
      {({ size }) => <Container {...props} size={size}></Container>}
    </ScaleViewContext.Consumer>
  );
};

ScaleViewItem.propTypes = {
  /**
   * Set the ID of the Item Container.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Set the scale mode of the Item.
   * There are five scale mode: 'standard', 'fixed', 'scaleXFix', 'scaleYFix', 'adaptWidth', 'adaptHeight'.
   */
  mode: PropTypes.string,

  /**
   * Set the enter animation of the Item.
   * There are two animations: 'slide', 'opacity'.
   * When anim is 'slide', the item will slide in, and 'from' is required.
   * When opacity is 'opacity', the item will fade in.
   * 'timeout' means the duration of animation executing.
   * 'delay' means the delay time to execute the animation.
   *
   * @type { anim: string, from?: string, timeout: number, delay: number}
   */
  transition: transitionShape,

  /**
   * Set the relationship between the items.
   */
  relations: relationsShape,

  getContainer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  style: PropTypes.object,
  contentStyle: PropTypes.object,
  className: PropTypes.any,
  contentClass: PropTypes.any,
  /**
   * For the convenience of setting the item parameters, component provide 'config' props to unify them.
   * It's recommended to setting all the parameters in a config file.
   * like:
   * ./config.js
   * export default {
   *   header: {
   *     mode: 'scaleXFix',
   *     transition: {
   *       anim: 'slide',
   *       from: 'top',
   *       timeout: 300,
   *     },
   *   },
   *   otherChart: {...},
   * }
   *
   */
  config: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    mode: PropTypes.string,
    transition: transitionShape,
    relations: relationsShape,
    getContainer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    style: PropTypes.object,
    contentStyle: PropTypes.object,
  }),
};

ScaleViewItem.defaultProps = {};

export default ScaleViewItem;
