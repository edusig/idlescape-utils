import * as React from 'react';
import { NextSeo, NextSeoProps } from 'next-seo';

export const SEO: React.FunctionComponent<NextSeoProps> = props => (
  <NextSeo titleTemplate="%s - Indlescape Utils" {...props} />
);
