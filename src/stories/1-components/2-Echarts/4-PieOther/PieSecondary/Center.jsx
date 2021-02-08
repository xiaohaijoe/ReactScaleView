import React from 'react';
import './Center.less';

const Center = ({ children }) => {
  return (
    <>
      <div className={'center-box-content'}>{children}</div>
      <span className={'center-box-circle'}></span>
      <span className={'center-box-circle'}></span>
      <span className={'center-box-circle'}></span>
      <span className={'center-box-circle'}></span>
    </>
  );
};

export default Center;
