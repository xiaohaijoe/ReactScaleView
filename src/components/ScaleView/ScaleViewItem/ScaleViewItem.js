import React, { useState, useRef, useMemo } from "react";
import ReactDOM from "react-dom";

import {
  getCurrentStyleByRelations,
  getStyleByMode,
  getAttributesByMode,
} from "../util";
import { useNestification, useTransition } from "../hooks";
import ScaleViewContext from "../ScaleViewContext";
import Transition from "../Transition";
import "./ScaleViewItem.css";

const useScaleViewItem = (props) => {
  const { size, el, mode, transition, style } = props;
  const [containerStyle, setContainerStyle] = useState({});
  const transitionRef = useTransition({
    anim: "opacity",
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
    // console.log(relateStyle, modeStyle);
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

const Content = (props) => {
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
      {(status) => {
        return (
          <div
            style={{
              ...defaultContentStyle,
              ...transitionContentStyle[status],
              ...contentStyle,
            }}
            className={['scale-view-item__content', contentClass].filter(Boolean).join(' ')}
          >
            {children}
          </div>
        );
      }}
    </Transition>
  );
};

const Container = (props) => {
  const { config = {}, className, contentClass, size, children } = props;
  const style = { ...props.style, ...config.style };
  const contentStyle = { ...props.contentStyle, ...config.contentStyle };
  const mode = props.mode || config.mode || "";
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
        className={['scale-view-item__container', className].filter(Boolean).join(' ')}
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
    return ReactDOM.createPortal(renderContainer(), getContainer());
  } else {
    return renderContainer();
  }
};

const ScaleViewItem = (props) => {
  return (
    <ScaleViewContext.Consumer>
      {({ size }) => <Container {...props} size={size}></Container>}
    </ScaleViewContext.Consumer>
  );
};

export default ScaleViewItem;
