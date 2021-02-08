import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import Instance from './Instance';
import Store from './Store';
import { useMap, withMap } from './hooks';
import styles from './Map.module.less';

/**
 * 地图初始化，Map.initialize请在src/index.js或src/App.js中实现
 * @src/App.js或@src/index.js
 * Map.initialize = () => {
 *   return {
 *     DEFAULT: trigger => {
 *       const map = new window.AMap.Map('DEFAULT');
 *       map.on('complete', () => {
 *         trigger(map);
 *       });
 *     },
 *     // 支持多个地图实例，如果有其他地图实例
 *     MAP_CARELAND: trigger => {
 *       const point = new window.Careland.GbPoint(30.625173, 120.53799); //创建坐标点
 *       const map = new window.Careland.Map('map', point, 13, {
 *         enableAutoResize: true, //启用自动适应容器尺寸变化
 *         enableInertialDragging: true, //启用地图惯性拖拽
 *         style: 4,
 *       }); //实例化地图对象
 *       map.load(); //加载地图
 *       map.addEventListener('mapchange', () => {
 *         // 凯立德地图没有加载完成的回调，所以使用mapchange方法当作回调
 *         trigger(map);
 *       });
 *     }
 *   };
 * };
 */

/**
 * 实例化组件
 * // 渲染DEFAULT地图组件
 * <Map></Map>
 *
 * // 渲染其他ID地图组件
 * <Map mapId="MAP_CARELAND"></Map>
 */

/**
 * // 获取地图实例
 * const Comp = props => {
 *   const [map] = useMap();
 * }
 * // 或
 * const Comp = withMap(props) => {
 *  const { map } = props;
 * }
 */

const MapInit = props => {
  const { mapId, onLoaded } = props;
  useEffect(() => {
    const onTrigger = (...props) => {
      Store.set(mapId, props);
      onLoaded();
    };
    if (Map.initialize && typeof Map.initialize === 'function') {
      const initialize = Map.initialize();
      if (initialize[mapId]) {
        initialize[mapId].apply(null, [onTrigger]);
      } else {
        console.error(`找不到${mapId}的初始化方法`);
      }
    } else {
      console.error('找不到Map.initialize初始化方法');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div id={mapId} className={styles.map}></div>;
};

const Map = props => {
  const { mapId = 'DEFAULT' } = props;
  const [complete, setComplete] = useState(false);
  function onLoaded() {
    // MapInit地图实例化完成
    setComplete(true);
    Store.trigger(mapId);
  }
  function onMount() {
    // Instance实例化完成
    if (Store.get(mapId)) {
      setComplete(true);
      Store.trigger(mapId);
    }
  }
  return (
    <>
      <Instance mapId={mapId} mount={onMount}>
        <MapInit mapId={mapId} onLoaded={onLoaded} />
      </Instance>
      <Loading hidden={complete}></Loading>
    </>
  );
};
Map.useMap = useMap;
Map.withMap = withMap;

export default Map;
