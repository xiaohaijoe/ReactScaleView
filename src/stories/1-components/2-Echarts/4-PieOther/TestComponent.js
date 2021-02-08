import React, { useState } from 'react';
import PieSecodary from './PieSecondary';

const TestComponent = () => {
  const [dataSource] = useState([
    { name: '饼1', value: 2 },
    { name: '饼2', value: 2 },
    { name: '饼3', value: 2 },
  ]);
  return (
    <PieSecodary
      pieSource={[dataSource]}
      center={
        <div
          style={{
            fontSize: 20,
            color: '#e0eaff',
          }}
        >
          yes
        </div>
      }
    ></PieSecodary>
  );
};

export default TestComponent;
