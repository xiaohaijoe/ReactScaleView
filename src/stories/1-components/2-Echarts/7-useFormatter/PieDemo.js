import React, { useState } from 'react';
import { Echarts } from '@src/components/common';

const { Pie, useFormatter } = Echarts;

const FormatterItem = props => {
  const { data } = props[0];
  return (
    <div style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
      {data.name}: {data.value}
    </div>
  );
};
const PieDemo = props => {
  const formatter = useFormatter();
  const [dataSource] = useState([
    { name: '吴彦祖', value: 3 },
    { name: '李易峰', value: 3 },
  ]);
  return (
    <Pie.Default
      pieSource={[dataSource]}
      tooltip={{
        backgroundColor: 'rgba(0,0,0,0)',
        formatter: formatter(<FormatterItem></FormatterItem>),
      }}
    ></Pie.Default>
  );
};

export default PieDemo;
