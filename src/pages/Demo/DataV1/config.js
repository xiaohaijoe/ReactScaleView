export const Config = {
  topChart: {
    id: "topChart",
    style: {
      left: 0,
      top: 0,
      right: 0,
      width: "100%",
      height: 200,
    },
    transition: {
      anim: "slide",
      from: "top",
      timeout: 300,
      delay: 300,
    },
    mode: "adaptWidth",
  },
  leftChart: {
    id: "leftChart",
    style: {
      left: 0,
      bottom: 0,
      width: 400,
    },
    transition: {
      anim: "slide",
      from: "left",
      timeout: 300,
      delay: 300,
    },
    mode: "scaleXFix",
    relations: {
      layoutBelow: "topChart",
    },
  },
  rightChart: {
    id: "rightChart",
    style: {
      right: 0,
      bottom: 0,
      width: 460,
    },
    transition: {
      anim: "slide",
      from: "right",
      timeout: 300,
      delay: 300,
    },
    mode: "scaleXFix",
    relations: {
      layoutBelow: "topChart",
    },
  },
  mapChart: {
    style: {
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
    },
    mode: "fixed",
  },
};
