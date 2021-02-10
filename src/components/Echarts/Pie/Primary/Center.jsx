import React from 'react';
import './Center.less';

const Center = ({ children }) => {
  return (
    <>
      <div className={'center-box-content'}>{children}</div>
    </>
  );
};

export default Center;
