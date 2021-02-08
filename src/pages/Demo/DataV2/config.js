export const Config = {
  leftChart: {
    id: 'leftChart',
    style: {
      left: 0,
      top: 0,
      width: 460,
      height: '100%',
    },
    transition: {
      anim: 'slide',
      from: 'left',
      timeout: 250,
    },
    mode: 'scaleXFix',
    relations: {
      layoutBelow: 'topChart',
    }
  },
  topChart: {
    id: 'topChart',
    style: {
      left: 0,
      top: 0,
      width: '100%',
      height: 200,
    },
    transition: {
      anim: 'slide',
      from: 'top',
      timeout: 250,
    },
    mode: 'adaptWidth',
  },
  rightChart: {
    style: {
      right: 0,
      top: 0,
      width: 460,
      height: 200,
    },
    transition: {
      anim: 'slide',
      from: 'top',
      timeout: 250,
    },
    mode: 'adaptHeight',
    relations: {
      layoutBelow: 'topChart',
      toRightOf: 'leftChart',
    }
  },
  mapChart: {
    style: {
      right: 0,
      bottom: 0,
      width: 960,
      height: 540,
      transformOrigin: '100% 100%'
    },
    mode: 'fixed',
  },
};
