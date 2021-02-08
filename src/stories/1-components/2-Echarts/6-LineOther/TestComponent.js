import React, { useState } from 'react';
import LinePrimary from './LinePrimary';

const TestComponent = () => {
  const [lineSource] = useState([
    [1, 1, 2, 3, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 12, 5],
    [2, 5, 7, 1, 7, 7, 5, 8],
  ]);
  const [xAxis] = useState({
    data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'],
  });
  const [yAxis] = useState([{ name: '数量' }]);
  return (
    <LinePrimary
      lineSource={lineSource}
      xAxis={xAxis}
      yAxis={yAxis}
      legend={{ show: true, data: ['一', '二', '三'] }}
    ></LinePrimary>
  );
};

export default TestComponent;
