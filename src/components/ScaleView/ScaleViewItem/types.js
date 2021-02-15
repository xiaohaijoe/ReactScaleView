import PropTypes from 'prop-types';

export const transitionShape = PropTypes.shape({
  anim: PropTypes.string.isRequired,
  from: PropTypes.string,
  timeout: PropTypes.number,
  delay: PropTypes.number,
});

export const relationsShape = PropTypes.shape({
  layoutBelow: PropTypes.string,
  layoutAbove: PropTypes.string,
  toLeftOf: PropTypes.string,
  toRightOf: PropTypes.string,
  alignTop: PropTypes.string,
  alignBottom: PropTypes.string,
  alignLeft: PropTypes.string,
  alignRight: PropTypes.string,
});
