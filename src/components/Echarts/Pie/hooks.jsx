import { useState, useEffect } from 'react';
import { deepMerge } from '../utils';

const setSeriesGap = (data, color, seriesGap) => {
  if (!seriesGap) {
    return data;
  }
  const newData = [];
  let gapData = {
    value: 0,
    name: '',
    // 表示间隔
    isGap: true,
    // 不允许展示tooltip
    tooltip: {
      show: false,
    },
    label: {
      show: false,
    },
    labelLine: {
      show: false,
    },
    itemStyle: {
      normal: {
        color: 'rgba(0,0,0,0)',
      },
    },
  };
  if (typeof seriesGap === 'object') {
    gapData = seriesGap;
  }
  data.forEach((n, i) => {
    newData.push({
      ...n,
    });
    newData.push(gapData);
  });
  return newData;
};
const calcOption = ({
  pieSource = [
    [
      {
        value: 100,
        name: '',
      },
    ],
  ],
  title,
  grid,
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
  tooltip,
  legend,
  series = [],
  seriesGap = false, // 数据与数据之间的间隔
}) => {
  return {
    title: deepMerge({}, title),
    grid: deepMerge({}, grid),
    color: (() => {
      return deepMerge([], color);
    })(),
    tooltip: (() => {
      return deepMerge(
        {
          trigger: 'item',
        },
        tooltip
      );
    })(),
    legend: deepMerge({}, legend),
    series: (() => {
      let ll = pieSource.map((data, index) => {
        const dataSource = setSeriesGap(data, color, seriesGap);
        return deepMerge(
          {
            name: `pie${index}`,
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['48', '58'],
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            minAngle: 5,
            data: dataSource,
          },
          series[index]
        );
      });
      ll.push(...series.slice(pieSource.length, series.length));
      return ll;
    })(),
  };
};

export const useOption = ({ pieSource, option, series, ...restProps }) => {
  const [mOption, setOption] = useState({});
  useEffect(() => {
    let newOption = mOption;
    if (option) {
      newOption = deepMerge(mOption, option);
    } else {
      newOption = calcOption({ pieSource, series, ...restProps });
    }
    setOption(newOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pieSource, series, option]);
  return mOption;
};
