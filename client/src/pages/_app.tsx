/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { ReactElement } from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { RecoilRoot } from 'recoil';

import PrivateComponent from '../components/PrivateComponent';

import 'infima/dist/css/default/default.min.css';
import './index.css';

const themeAutoSwitcher = `(function() {
function t(theme){document.documentElement.setAttribute('data-theme', theme)}
if(window.matchMedia('(prefers-color-scheme: light)').matches)t('')
if(window.matchMedia('(prefers-color-scheme: dark)').matches)t('dark')
window.matchMedia('(prefers-color-scheme: dark)').addListener(({matches:m})=>t(m?'dark':''))
})();`;

const App = (props: AppProps): ReactElement => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="https://developersam.com/favicon.ico" />
        <title>Flower</title>
        <script
          type="text/javascript"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: themeAutoSwitcher }}
        />
      </Head>
      <RecoilRoot>
        <PrivateComponent>
          <>
            <nav className="navbar">
              <div className="navbar__inner">
                <div className="navbar__items">
                  <Link href="/">
                    <a className="navbar__brand">Flower</a>
                  </Link>
                </div>
                <div className="navbar__items navbar__items--right">
                  <Link href="/studies">
                    <a className="navbar__brand">Studies</a>
                  </Link>
                  <Link href="/create-study">
                    <a className="navbar__brand">Create Study</a>
                  </Link>
                  <Link href="/profile">
                    <a className="navbar__brand">Profile</a>
                  </Link>
                </div>
              </div>
            </nav>
            <Component {...pageProps} />
          </>
        </PrivateComponent>
      </RecoilRoot>
    </>
  );
};

export default App;
