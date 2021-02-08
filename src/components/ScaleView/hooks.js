import React, {
  useEffect,
  useState,
  useReducer,
  useRef,
  useContext,
} from "react";
import ScaleViewContext from "./ScaleViewContext";
import { getSlideStyle, getOpacityStyle } from "./util";

// ScaleView不允许嵌套使用
const useNestification = (itemRef) => {
  useEffect(() => {
    const node = itemRef.current;
    // 递归往父节点去找
    const findNode = function (node) {
      if (node === document.body) {
        return;
      }
      const { symbol } = node.dataset;
      if (symbol === "data-view-item") {
        console.error("ScaleViewItem不允许嵌套ScaleViewItem");
        return;
      }
      findNode(node.parentNode);
    };
    findNode(node.parentNode);
  }, [itemRef]);
};

const useTransition = (props) => {
  const [transitionProps, dispatch] = useReducer(reducer, props);
  const [transitionStyle] = useState(() => {
    return getTransitionStyles(props);
  });
  const timer = useRef(null);
  function getTransitionStyles(props) {
    const { anim = "opacity", from, delay = 0, timeout = 0 } = props;
    let styles = {};
    switch (anim) {
      case "slide":
        styles = getSlideStyle(from, delay, timeout);
        break;
      case "opacity":
        styles = getOpacityStyle(delay, timeout);
        break;
      default:
        break;
    }
    const { defaultTransitionStyle, transitionStyle } = styles;
    return {
      defaultContentStyle: defaultTransitionStyle,
      transitionContentStyle: transitionStyle,
    };
  }
  function reducer(state, action) {
    if (action) {
      return {
        ...state,
        show: true,
      };
    } else {
      return {
        ...state,
        show: false,
      };
    }
  }
  const onEnter = () => {
    const { delay } = transitionProps;
    timer.current = setTimeout(() => {
      dispatch(true);
    }, delay);
  };
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  return { transitionProps, transitionStyle, onEnter };
};

const useSize = () => {
  const { size } = useContext(ScaleViewContext);
  return size;
};

const withSize = (Component) => {
  return (props) => {
    const size = useSize();
    return <Component {...props} size={size}></Component>;
  };
};

export { useNestification, useTransition, useSize, withSize };
