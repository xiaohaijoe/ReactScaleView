import React, { useRef } from 'react';
import { Pie } from '@/components/Echarts';

const PiePolar = props => {
  const pieSource = useRef([
    [
      {
        value: 9,
        name: '周期巡查',
        total: 10,
        detail: { finish: 5, processing: 4, undo: 0 },
      },
    ],
    [
      {
        value: 5,
        name: '市民投诉',
        total: 10,
        detail: { finish: 4, processing: 0, undo: 1 },
      },
    ],
    [
      {
        value: 3,
        name: '支队指派',
        total: 10,
        detail: { finish: 3, processing: 0, undo: 0 },
      },
    ],
  ]).current;
  // const legend = useRef({ show: false }).current;
  // const tooltip = useRef({ show: false }).current;
  return (
    <>
      <div>polar主题：极坐标</div>
      <div>
        {/* 极坐标饼状图 */}
        <Pie.Polar pieSource={pieSource}></Pie.Polar>
      </div>
    </>
  );
};

export default PiePolar;
