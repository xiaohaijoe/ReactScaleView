import React, { useRef, useEffect, useState } from 'react';
import { Echarts } from '@src/components/common';
const { Pie } = Echarts;
const PieLegend = () => {
  const chartRef = useRef(null);
  const [dataSource, setDataSource] = useState([]);
  const [center, setCenter] = useState('');
  useEffect(() => {
    setDataSource([
      { name: '饼1', value: 1 },
      { name: '饼2', value: 2 },
    ]);
  }, []);

  const onChange = i => {
    const item = dataSource[i];
    setCenter(item ? item.value : '');
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Pie.Primary
        ref={chartRef}
        style={{ width: 200 }}
        seriesGap
        pieSource={[dataSource]}
        legend={{ show: false }} // 去掉默认legend
        center={<div>{center}</div>} // 设置居中显示内容
      ></Pie.Primary>
      <Pie.Legend targetElement={chartRef} onChange={onChange}>
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
                      width: 20,
                      height: 10,
                      background: color,
                    }}
                  ></span>
                  <span>
                    {n.name}: {n.value}
                  </span>
                </>
              );
            }}
          ></Pie.Legend.Option>
        ))}
      </Pie.Legend>
    </div>
  );
};

export default PieLegend;
