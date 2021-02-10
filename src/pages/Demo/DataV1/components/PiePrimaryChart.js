import React, { useRef, useState } from 'react';
import { Pie } from '@/components/Echarts';

const PiePrimaryChart = props => {
  const chartRef = useRef(null);
  const [dataSource] = useState([
    { name: '饼1', value: 1 },
    { name: '饼2', value: 2 },
  ]);
  return (
    <>
      <div>primary主题：饼图中间文字，饼图间距，自定义legend</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Pie.Primary
          style={{ width: '50%' }}
          ref={chartRef}
          pieSource={[dataSource]}
          seriesGap
          legend={{ show: false }}
          center={<div>居中展示</div>}
        ></Pie.Primary>
        {/* 自定义legend */}
        <Pie.Legend targetElement={chartRef} style={{ width: '50%' }}>
          {dataSource.map((n, i) => (
            <Pie.Legend.Option
              key={i}
              value={i}
              component={color => {
                return (
                  <>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 10,
                        height: 10,
                        background: color,
                      }}
                    ></span>
                    <span>{n.name}</span>
                    <span>{n.value}</span>
                  </>
                );
              }}
            ></Pie.Legend.Option>
          ))}
        </Pie.Legend>
      </div>
    </>
  );
};

export default PiePrimaryChart;
