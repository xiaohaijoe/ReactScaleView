export const Config = {
  leftChart: {
    style: {
      left: 0,
      top: 0,
      width: 460,
    },
    transition: {
      anim: 'slide',
      from: 'left',
      timeout: 250,
    },
    mode: 'scaleXFix',
    relations: {
      layoutAbove: 'bottomChart',
    }
  },
  bottomChart: {
    id: 'bottomChart',
    style: {
      left: 0,
      bottom: 0,
      width: '100%',
      height: 200,
    },
    transition: {
      anim: 'slide',
      from: 'bottom',
      timeout: 250,
    },
    mode: 'adaptWidth',
  },
  rightChart: {
    style: {
      // right: 0,
      top: 0,
      width: 460,
      // height: '100%',
    },
    transition: {
      anim: 'slide',
      from: 'right',
      timeout: 250,
    },
    mode: 'scaleXFix',
    relations: {
      alignRight: 'bottomChart',
      layoutAbove: 'bottomChart',
    }
  },
};
