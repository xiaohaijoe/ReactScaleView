import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useOption } from '../hooks';

const DefaultPie = React.forwardRef((props, ref) => {
  const { style, className, ...restProps } = props;
  const option = useOption(restProps);
  return (
    <ReactEcharts
      ref={ref}
      option={option}
      className={className}
      style={style}
    ></ReactEcharts>
  );
});

export default DefaultPie;
