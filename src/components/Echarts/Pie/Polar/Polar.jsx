import React, { useEffect, useState, useRef } from 'react';
import Default from '../Default';
import { deepMerge } from '../../utils';

// 极坐标饼状图
const PolarPie = React.forwardRef(
  (
    {
      style,
      className,
      series,
      pieSource,
      tooltip = { show: false },
      legend = { show: false },
      color = ['#3A70FF', '#02C1F0', '#68D751'], // 饼图颜色
      bgColor = '#111e34', // 背景颜色
      ...restProps
    },
    ref
  ) => {
    const [mSeries, setSeries] = useState([]);
    const chartRef = useRef(null);
    useEffect(() => {
      if (ref) {
        ref.current = chartRef.current;
      }
      const ss = [];
      pieSource.forEach((n, i) => {
        const percent = (n[0].value / n[0].total) * 0.75;
        const nagativePercent = 1 - percent;
        // const nagativePercent = n[0].value/n[0].total;
        const dataPie = {
          name: '',
          type: 'pie',
          // silent: true,
          z: 2,
          clockWise: true, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [73 - i * 15 + '%', 68 - i * 15 + '%'],
          center: ['50%', '50%'],
          label: {
            show: false,
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            borderWidth: 5,
          },
          data: [
            {
              value: nagativePercent,
              name: '',
              itemStyle: {
                color: 'rgba(0,0,0,0)',
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
            {
              value: percent,
              itemStyle: {
                color: color[i],
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
          ],
        };
        const bgPie = JSON.parse(JSON.stringify(dataPie));
        deepMerge(bgPie, {
          z: 1,
          data: [
            { value: 0.25 },
            { value: 0.75, itemStyle: { color: bgColor } },
          ],
        });
        ss.push(dataPie);
        ss.push(bgPie);
      });
      setSeries(ss);
    }, [pieSource, series]);
    return (
      <Default
        ref={chartRef}
        pieSource={pieSource}
        series={mSeries}
        legend={legend}
        tooltip={tooltip}
        className={className}
        style={style}
        {...restProps}
      ></Default>
    );
  }
);

export default PolarPie;
