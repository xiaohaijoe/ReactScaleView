import React from 'react';
import { ScaleView } from '@src/components/common';

const { ScaleViewContext } = ScaleView;
const ContextDemo = props => {
  return (
    <ScaleViewContext.Consumer>
      {({ size }) => {
        return (
          <div style={{ fontSize: 40 }}>
            <div>size.scaleX: {size.scaleX}</div>
            <div>size.scaleY: {size.scaleY}</div>
            <div>size.width: {size.width}</div>
            <div>size.height: {size.height}</div>
          </div>
        );
      }}
    </ScaleViewContext.Consumer>
  );
};

export default ContextDemo;
