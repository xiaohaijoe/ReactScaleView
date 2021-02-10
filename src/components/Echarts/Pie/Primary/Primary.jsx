import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Default from '../Default';
import Center from './Center';
const PrimaryPie = React.forwardRef(({ center, ...restProps }, ref) => {
  const centerContainer = useRef(document.createElement('div')).current;
  const chartRef = useRef(null);
  useEffect(() => {
    if (ref) {
      ref.current = chartRef.current;
    }
    const el = ReactDOM.findDOMNode(chartRef.current);

    // 添加中间内容展示
    centerContainer.setAttribute(
      'style',
      'position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);margin: 0'
    );
    centerContainer.setAttribute('class', 'center-box');

    el.appendChild(centerContainer);
  }, [centerContainer, chartRef, ref]);
  return (
    <>
      {center &&
        ReactDOM.createPortal(
          React.createElement(Center, {
            children: typeof center === 'function' ? center() : center,
          }),
          centerContainer
        )}
      <Default ref={chartRef} {...restProps}></Default>
    </>
  );
});

export default PrimaryPie;
