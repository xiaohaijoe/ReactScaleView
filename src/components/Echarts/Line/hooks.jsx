import { useState, useEffect } from 'react';
import Echarts from 'echarts';
import { deepMerge } from '../utils';

function calcOption({
  grid,
  yAxis = [],
  color = [
    '#739DE9',
    '#7BD495',
    '#E57F64',
    '#54B0C8',
    '#A054C8',
    '#D9A76A',
    '#B37FEB',
    '#263EAE',
  ],
  xAxis,
  tooltip,
  legend,
  series = [],
  lineSource = [],
  barSource = [],
}) {
  return {
    grid: deepMerge({}, grid),
    color: deepMerge([], color),
    tooltip: deepMerge(
      {
        trigger: 'axis',
        backgroundColor: 'transparent',
        padding: 0,
        axisPointer: {
          lineStyle: {
            color: '#679DFF',
          },
        },
      },
      tooltip
    ),
    // 图例
    legend: deepMerge({}, legend),
    // 横坐标
    xAxis: deepMerge({}, xAxis),

    // 纵坐标
    yAxis: (() => {
      return deepMerge(
        [
          {
            type: 'value',
          },
        ],
        yAxis
      );
    })(),

    series: (() => {
      const ll = lineSource.map((data, index) => {
        return deepMerge(
          {
            name: ``,
            type: 'line',
            yAxisIndex: 0,
            smooth: true,
            data: data,
          },
          series[index]
        );
      });
      const bb = barSource.map((data, index) => {
        return deepMerge(
          {
            name: ``,
            type: 'bar',
            yAxisIndex: 0,
            smooth: true,
            barWidth: 12,
            data: data,
          },
          series[lineSource.length + index]
        );
      });
      return [...ll, ...bb];
    })(),
  };
}

export const useOption = ({
  lineSource,
  barSource,
  xAxis,
  yAxis,
  legend,
  series,
  tooltip,
  option,
  ...restProps
}) => {
  const [mOption, setOption] = useState({});
  useEffect(() => {
    let newOption = mOption;
    if (option) {
      newOption = deepMerge(mOption, option);
    } else {
      newOption = calcOption({
        lineSource,
        barSource,
        xAxis,
        yAxis,
        legend,
        series,
        tooltip,
        ...restProps,
      });
    }
    setOption(newOption);
  }, [lineSource, barSource, xAxis, yAxis, legend, series, tooltip, option]);
  return mOption;
};
