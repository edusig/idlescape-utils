module.exports = api => {
  api.cache(true);

  return {
    presets: ['next/babel'],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      [
        'styled-components',
        {
          ssr: true,
          preprocess: false,
          displayName: process.env.NODE_ENV !== 'production',
        },
      ],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@app/components': './src/components',
            '@app/app-components': './src/app-components',
            '@app/util': './src/lib/util',
            '@app/hooks': './src/lib/hooks',
            '@app/data': './src/lib/data',
            '@app/hooks': './src/lib/hooks',
            '@app/constants': './src/lib/constants',
            '@app/lib': './src/lib',
            '@app/styled-components': './src/styled-components',
            '@app/public': './public',
          },
        },
      ],
    ],
  };
};
