import React, { ReactElement } from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';

const App = (props: AppProps): ReactElement => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="https://developersam.com/favicon.ico" />
        <title>Flower</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
