import { DefaultSeo } from 'next-seo';
import { MetaTag, OpenGraph, Twitter } from 'next-seo/lib/types';
import Head from 'next/head';
import * as React from 'react';

export const DefaultSEO: React.FC = () => {
  const title = 'Idlescape Utils';
  const description = 'Idlescape Utils';
  const siteName = 'Idlescape Utils';
  const url = 'https://idlescape-utils.eduardociciliato.com.br';
  const openGraph: OpenGraph = {
    title,
    description,
    images: [{ url }],
    site_name: siteName,
    url,
    type: 'website',
  };
  const twitter: Twitter = {
    cardType: 'summary',
  };
  const extraMeta: MetaTag[] = [
    { name: 'msapplication-TileImage', content: '/favicons/ms-icon-144x144.png' },
    { name: 'application-name', content: siteName },
  ];
  const sameAs: string[] = [];
  return (
    <>
      <DefaultSeo
        title={title}
        description={description}
        openGraph={openGraph}
        twitter={twitter}
        additionalMetaTags={extraMeta}
      />
      <Head>
        <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/android-icon-192x192.png"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      </Head>
    </>
  );
};
