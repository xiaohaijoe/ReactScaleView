import React from 'react';
import Routes from '@/routes';
import { Map } from '@/components';

Map.initialize = () => {
  return {
    DEFAULT: trigger => {
      const map = new window.AMap.Map('DEFAULT');
      map.on('complete', () => {
        trigger(map);
      });
    },
    PRIMARY: trigger => {
      const map = new window.AMap.Map('PRIMARY');
      map.on('complete', () => {
        trigger(map, { aa: 123 });
      });
    },
  };
};

const App = props => {
  return <Routes />;
};
export default App;
