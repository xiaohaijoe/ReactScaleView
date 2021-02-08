import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Pie, useFormatter } from '@src/components/common/Echarts';
import Center from './Center';
const PrimaryPie = React.forwardRef(({ center, ...restProps }, ref) => {
  const chartRef = useRef(null);
  const centerContainer = useRef(document.createElement('div')).current;
  const color = useRef([
    '#3a70ff',
    '#02c1f0',
    '#68d751',
    '#ffc330',
    '#ff8d57',
    '#ff4d4f',
  ]).current;
  // 自定义series样式
  const series = useRef([
    {
      itemStyle: {
        normal: {
          borderWidth: 5,
          borderRadius: 5,
        },
      },
    }, // 下标0为data
    {
      name: '',
      type: 'pie',
      radius: ['50%', '51%'],
      center: ['50%', '50%'],
      label: { show: false },
      itemStyle: {
        normal: {
          color: 'rgba(174,206,255,0.6)',
        },
      },
      hoverAnimation: false,
      data: [100],
      tooltip: { show: false },
    }, // 外框
  ]).current;
  // 自定义legend
  const legend = useRef({ show: false }).current;
  const myFormatter = useFormatter();
  // 自定义tooltip样式
  const tooltip = useRef({
    formatter: myFormatter(e => (
      <>
        {e[0].data.name}: {e[0].data.value}
      </>
    )),
  }).current;
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
      <Pie.Default
        ref={chartRef}
        {...restProps}
        seriesGap
        color={color}
        series={series}
        legend={legend}
        tooltip={tooltip}
      ></Pie.Default>
    </>
  );
});

export default PrimaryPie;
