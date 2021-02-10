import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { ScaleView } from '@/components';
import Config from './config';
import styles from './Demo.module.less';
const { ScaleViewContainer } = ScaleView;

const LoadableDataV1 = Loadable({
  loader: () => import('@/pages/Demo/DataV1'),
  loading: () => null,
});

const LoadableDataV2 = Loadable({
  loader: () => import('@/pages/Demo/DataV2'),
  loading: () => null,
});

const LoadableDataV3 = Loadable({
  loader: () => import('@/pages/Demo/DataV3'),
  loading: () => null,
});

const DemoDataV = props => {
  return (
    <ScaleViewContainer
      config={Config.container}
      className={styles.scaleViewContainer}
    >
      <Switch>
        <Route
          path="/demo"
          exact
          render={() => <Redirect to="/demo/data-v1" />}
        />
        <Route path="/demo/data-v1" component={LoadableDataV1} isPrivate />
        <Route path="/demo/data-v2" component={LoadableDataV2} isPrivate />
        <Route path="/demo/data-v3" component={LoadableDataV3} isPrivate />
      </Switch>
    </ScaleViewContainer>
  );
};

export default DemoDataV;
