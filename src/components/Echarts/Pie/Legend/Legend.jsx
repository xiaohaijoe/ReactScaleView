import React, { useEffect, useState } from 'react';
import Option from './Option';

// 饼状图图例
const Legend = ({
  targetElement,
  seriesIndex = 0,
  className,
  style,
  onChange,
  children,
}) => {
  const [el, setEl] = useState(null);
  useEffect(() => {
    if (!targetElement || !targetElement.current) {
      console.error('缺少targetElement参数');
      return;
    }
    setEl(targetElement.current);
  }, [targetElement]);

  if (!el) {
    return null;
  }

  // 饼状图是否存在间隔
  const isSeriesGap = () => {
    const { option } = el.props;
    const { series } = option;
    if (series[seriesIndex]) {
      return series[seriesIndex].data.some(n => n.isGap);
    }
    return false;
  };
  const mIsSeriesGap = isSeriesGap();
  // 获取option配置
  const { color, series } = el.props.option;

  // useEffect(() => {
  //   console.log(series, color);
  // }, [series, color]);

  const onMouseOver = props => {
    const instance = el.getEchartsInstance();
    const isGap = isSeriesGap();
    instance.dispatchAction({
      type: 'highlight',
      seriesIndex,
      // 如果有间隔，则触发下标value*2的饼
      dataIndex: isGap ? props.value * 2 : props.value,
    });
    onChange && onChange(props.value);
  };

  const onMouseOut = props => {
    const instance = el.getEchartsInstance();
    const isGap = isSeriesGap();
    instance.dispatchAction({
      type: 'downplay',
      seriesIndex,
      dataIndex: isGap ? props.value * 2 : props.value,
    });
    onChange && onChange();
  };

  return (
    <div className={className} style={style}>
      {React.Children.map(children, (child, i) => {
        return React.cloneElement(child, {
          color: color[i] || '',
          onMouseOver: () => onMouseOver(child.props),
          onMouseOut: () => onMouseOut(child.props),
        });
      })}
    </div>
  );
};

Legend.Option = Option;
export { Option };
export default Legend;
