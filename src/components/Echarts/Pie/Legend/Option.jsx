import React from 'react';
import cx from 'classnames';
import Style from './Legend.module.less';

const Option = ({ className, component, color, ...restProps }) => {
  return (
    <div className={cx([Style.option, className])} {...restProps}>
      {typeof component === 'function'
        ? component(color)
        : React.cloneElement(component, { color })}
    </div>
  );
};

export default Option;
