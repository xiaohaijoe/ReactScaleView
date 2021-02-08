import React, { Component } from 'react';
import Styles from './Loading.module.less';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.style = {
      position: 'absolute',
      left: props.left || 0,
      right: props.right || 0,
      top: props.top || 0,
      bottom: props.bottom || 0,
    };
  }
  render() {
    let hidden = this.props.hidden || false;
    return (
      <div
        style={this.style}
        className={`${Styles.wrap} ${!hidden ? '' : Styles.hidden}`}
      >
        <div className={Styles.loading}></div>
      </div>
    );
  }
}
