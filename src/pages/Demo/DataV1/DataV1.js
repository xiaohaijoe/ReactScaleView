import React, { useEffect, useState } from 'react';

import { ScaleView, Map} from '@/components';
import { Config } from './config';
import styles from './DataV1.module.less';
const { ScaleViewItem } = ScaleView;
const { useMap } = Map;

const DataV1 = props => {
  const [map] = useMap();
  useEffect(() => {
    // todo xxx
  }, [map]);
  function onGoDataV2() {
    props.history.push('/demo/data-v2');
  }
  function onGoDataV3() {
    props.history.push('/demo/data-v3');
  }
  return (
    <>
      <ScaleViewItem config={Config.mapChart}>
        <Map></Map>
      </ScaleViewItem>
      <ScaleViewItem config={Config.leftChart} contentClass={styles.leftChart}>
        <button onClick={onGoDataV2}>切换页面2</button>
        <button onClick={onGoDataV3}>切换页面2</button>
      </ScaleViewItem>
      <ScaleViewItem config={Config.topChart} contentClass={styles.topChart}>
        Top Chart
      </ScaleViewItem>
      <ScaleViewItem config={Config.rightChart} contentClass={styles.rightChart}>
        Right Chart
      </ScaleViewItem>
    </>
  );
};

export default DataV1;
