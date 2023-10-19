import Head from 'next/head';
import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify';

const DefaultLayout: FC<{ children?: any }> = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Đấu giá</title>
        <meta name="description" content="For reading novel" />
        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        /> */}
        <link rel="icon" type="image/png" sizes="64x64" href="favicon.png" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {children}
    </>
  );
};

export const LayoutProvider: FC<{ children?: any }> = ({ children }) => {
  return (
    <>
      <DefaultLayout>
        {children}
        <ToastContainer />
      </DefaultLayout>
    </>
  );
};

export default DefaultLayout;
