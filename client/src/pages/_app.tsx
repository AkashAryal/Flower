import React, { ReactElement } from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';

import PrivateComponent from '../components/PrivateComponent';

const App = (props: AppProps): ReactElement => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="https://developersam.com/favicon.ico" />
        <title>Flower</title>
      </Head>
      <RecoilRoot>
        <PrivateComponent>
          <Component {...pageProps} />
        </PrivateComponent>
      </RecoilRoot>
    </>
  );
};

export default App;
