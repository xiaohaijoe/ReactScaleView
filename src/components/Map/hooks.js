import React, { useEffect, useState } from 'react';
import Store from './Store';
export const useMap = (mapId = 'DEFAULT') => {
  const [map, setMap] = useState(Store.get(mapId) || []);
  useEffect(() => {
    const initialize = () => {
      setMap(Store.get(mapId));
    };
    Store.on(mapId, initialize);
    return () => {
      Store.off(mapId, initialize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return map;
};

const MapComponent = props => {
  const { children } = props;
  const map = useMap();
  return React.cloneElement(children, { map });
};

export const withMap = BaseComponent => {
  return props => (
    <MapComponent>
      <BaseComponent {...props}></BaseComponent>
    </MapComponent>
  );
};
