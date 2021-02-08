import React, { useState, useEffect, useRef } from "react";
import ScaleViewContext from "../ScaleViewContext";
import { debounce } from "../util.js";
import "./ScaleViewContainer.css";

const useContainerConfig = () => {
  const defaultConfig = {
    overflowX: "hidden",
    overflowY: "hidden",
  };
  const containerConfig = useRef(defaultConfig);
  const setContainerConfig = (props) => {
    containerConfig.current = {
      ...defaultConfig,
      ...props,
    };
  };
  return { containerConfig: containerConfig.current, setContainerConfig };
};

const useContentConfig = (props) => {
  const { config } = props;
  const defaultConfig = {
    width: config.width,
    height: config.height,
    transform: "scale(1,1)",
  };
  const contentConfig = useRef(defaultConfig);
  const setContentConfig = (props) => {
    contentConfig.current = {
      ...defaultConfig,
      ...props,
    };
  };
  return { contentConfig: contentConfig.current, setContentConfig };
};

const useResize = (props) => {
  const { config, el, container, content } = props;
  const [size, setSize] = useState({
    width: parseInt(config.width),
    height: parseInt(config.height),
    scaleX: 1,
    scaleY: 1,
  });
  const times = useRef(0);
  const refTimer = useRef(null);
  useEffect(() => {
    times.current = 1;
    return () => {
      times.current = 0;
    };
  }, []);
  useEffect(() => {
    const getElement = async () => {
      return new Promise((resolve) => {
        const recurise = () => {
          clearTimeout(refTimer.current);
          if (el.current) {
            resolve(el.current);
          } else {
            refTimer.current = setTimeout(() => {
              recurise();
            }, 0);
          }
        };
        recurise();
      });
    };
    const resize = async () => {
      const elem = await getElement();
      let winWidth = elem.clientWidth;
      let winHeight = elem.clientHeight;
      let { width, height, scaleX, scaleY } = size;
      let overflowX = "hidden";
      let overflowY = "hidden";
      switch (config.scaleType) {
        case "ADAPT_WIDTH": // 宽度铺满，高度按比例缩放
          scaleX = winWidth / width;
          scaleY = winWidth / width;
          overflowX = "auto";
          overflowY = "hidden";
          break;
        case "ADAPT_HEIGHT": // 高度铺满，宽度按比例缩放
          scaleX = winHeight / height;
          scaleY = winHeight / height;
          overflowX = "auto";
          overflowY = "hidden";
          break;
        default:
          // case "FULL_SCREEN": // 适应全屏
          scaleX = winWidth / width;
          scaleY = winHeight / height;
          break;
      }
      content.setContentConfig({
        transform: `scale(${scaleX}, ${scaleY})`,
      });
      container.setContainerConfig({ overflowX, overflowY });
      setSize({ scaleX, scaleY, width, height });
    };
    // 监听页面变动
    const deb = debounce(resize, 200);
    // 仅在第一次的时候监听
    if (times.current === 1) {
      // 节流
      window.addEventListener("resize", deb);
    }
    times.current++;
    resize();
    return () => {
      if (times.current === 0) {
        window.removeEventListener("resize", deb);
      }
      clearTimeout(refTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);
  return size;
};

const useScaleViewContainer = (props) => {
  const { config, el } = props;
  const container = useContainerConfig();
  const content = useContentConfig({ config });
  const size = useResize({ config, container, content, el });
  return {
    size,
    containerConfig: container.containerConfig,
    contentConfig: content.contentConfig,
  };
};

const ScaleViewContainer = (props) => {
  const {
    config,
    children,
    className,
    style,
    contentId,
    contentClass,
    contentStyle,
  } = props;
  const containerEl = useRef(null);
  const { containerConfig, contentConfig, size } = useScaleViewContainer({
    config,
    el: containerEl,
  });
  return (
    <ScaleViewContext.Provider value={{ size }}>
      <div
        ref={containerEl}
        className={['scale-view-container', className].filter(Boolean).join(' ')}
        style={{ ...containerConfig, ...style }}
      >
        <div
          id={contentId}
          className={['scale-view-container__content', contentClass].filter(Boolean).join(' ')}
          style={{ ...contentConfig, ...contentStyle }}
        >
          {children}
        </div>
      </div>
    </ScaleViewContext.Provider>
  );
};

export default ScaleViewContainer;
