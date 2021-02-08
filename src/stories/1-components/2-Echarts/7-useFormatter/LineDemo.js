import React from 'react';
import { Echarts } from '@src/components/common';
const { Line, useFormatter } = Echarts;

const FormatterItem = props => {
  return (
    <div style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
      {props[0].map((n, i) => (
        <div key={i}>
          {n.axisValue}:{n.data}
        </div>
      ))}
    </div>
  );
};

const LineDemo = props => {
  const formatter = useFormatter();
  return (
    <Line.Default
      xAxis={{ data: ['2001', '2002', '2003', '2004', '2005', '2006', '2007'] }}
      yAxis={[{ name: '年份' }]}
      lineSource={[[1, 4, 5, 6, 2, 4, 6]]}
      barSource={[[2, 3, 4, 5, 6, 7, 2]]}
      tooltip={{
        backgroundColor: 'rgba(0,0,0,0)',
        formatter: formatter(<FormatterItem></FormatterItem>),
      }}
    ></Line.Default>
  );
};

export default LineDemo;
