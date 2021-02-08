import React, { useEffect } from 'react';
import { ScaleView, Map } from '@/components';
import { Config } from './config';
import styles from './DataV2.module.less';
const { ScaleViewItem } = ScaleView;
const { useMap } = Map;

const DataV2 = props => {
  const [map, obj] = useMap('PRIMARY');
  useEffect(() => {
    console.log(map, obj);
  }, [map, obj]);
  function onGoDataV1() {
    props.history.push('/demo/data-v1');
  }
  function onGoDataV3() {
    props.history.push('/demo/data-v3');
  }
  return (
    <>
      <ScaleViewItem config={Config.mapChart}>
        <Map mapId='PRIMARY'></Map>
      </ScaleViewItem>
      <ScaleViewItem config={Config.leftChart} contentClass={styles.leftChart}>
        <button onClick={onGoDataV1}>切换路由1</button>
        <button onClick={onGoDataV3}>切换路由3</button>
      </ScaleViewItem>
      <ScaleViewItem config={Config.topChart} contentClass={styles.topChart}>
        Top Chart
      </ScaleViewItem>
      <ScaleViewItem config={Config.rightChart} contentClass={styles.rightChart}>
        Left Chart
      </ScaleViewItem>
    </>
  );
};

export default DataV2;
