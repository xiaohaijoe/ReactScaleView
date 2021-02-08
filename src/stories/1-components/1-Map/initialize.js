import { Map } from '@src/components/common';
import { loadScript } from '@src/stories/utils/util';
(() => {
  const init = callback => {
    const dom = document.getElementById('amap-script');
    if (!dom) {
      const script = loadScript(
        'https://webapi.amap.com/maps?v=1.4.15&key=3bcf5ffad0dfb938584c040db30f7fa9',
        callback
      );
      script.id = 'amap-script';
    } else {
      callback();
    }
  };
  Map.initialize = () => {
    return {
      DEFAULT: trigger => {
        init(() => {
          const map = new window.AMap.Map('DEFAULT');
          map.on('complete', () => {
            trigger(map);
          });
        });
      },
      PRIMARY: trigger => {
        init(() => {
          const map = new window.AMap.Map('PRIMARY');
          map.on('complete', () => {
            trigger(map);
          });
        });
      },
    };
  };
})();
