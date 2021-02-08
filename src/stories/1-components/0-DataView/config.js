export default {
  container: {
    width: 1920,
    height: 1080,
    scaleType: 'FULL_SCREEN',
  },
  headerChart: {
    id: 'headerChart',
    style: {
      top: 0,
      left: 0,
      width: '100%',
      height: 200,
    },
    mode: 'adaptWidth',
    contentStyle: {
      background: 'rgba(0,0,0,0.5)',
    },
    transition: {
      anim: 'slide',
      from: 'top',
      timeout: 250,
    },
  },
  leftChart: {
    id: 'leftChart',
    style: {
      left: 0,
      bottom: 0,
      width: 400,
    },
    mode: 'scaleXFix',
    contentStyle: {
      background: 'rgba(0,0,0,0.5)',
    },
    transition: {
      anim: 'slide',
      from: 'left',
      timeout: 250,
    },
    relations: {
      layoutBelow: 'headerChart',
    },
  },
  rightChart: {
    id: 'rightChart',
    style: {
      right: 0,
      bottom: 0,
      width: 400,
    },
    mode: 'scaleXFix',
    contentStyle: {
      background: 'rgba(0,0,0,0.5)',
    },
    transition: {
      anim: 'slide',
      from: 'right',
      timeout: 250,
    },
    relations: {
      layoutBelow: 'headerChart',
    },
  },
};
