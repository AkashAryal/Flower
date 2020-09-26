import React, { ReactElement } from 'react';

import styles from './LoadingRing.module.css';

const LoadingRing = (): ReactElement => (
  <div className={styles.LoadingRing}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default LoadingRing;
