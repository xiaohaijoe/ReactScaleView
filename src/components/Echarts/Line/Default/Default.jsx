import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useOption } from '../hooks';

const DefaultLine = props => {
  const { className, style, ...restProps } = props;
  const option = useOption(restProps);
  return (
    <ReactEcharts
      option={option}
      className={className}
      style={style}
    ></ReactEcharts>
  );
};

export default DefaultLine;
