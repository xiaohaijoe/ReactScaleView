import React from 'react';
import { ScaleView } from '@/components';
import { Config } from './config';
import styles from './DataV3.module.less';
const { ScaleViewItem } = ScaleView;

const DataV3 = props => {
  function onGoDataV1() {
    props.history.push('/demo/data-v1');
  }
  function onGoDataV2() {
    props.history.push('/demo/data-v2');
  }
  return (
    <>
      <ScaleViewItem config={Config.leftChart} contentClass={styles.leftChart}>
        <button onClick={onGoDataV1}>切换路由1</button>
        <button onClick={onGoDataV2}>切换路由2</button>
      </ScaleViewItem>
      <ScaleViewItem config={Config.bottomChart} contentClass={styles.bottomChart}>
        Top Chart
      </ScaleViewItem>
      <ScaleViewItem config={Config.rightChart} contentClass={styles.rightChart}>
        Left Chart
      </ScaleViewItem>
    </>
  );
};

export default DataV3;
