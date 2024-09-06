import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export const onCreateWebpackConfig = async ({ actions, getConfig }) => {
  const config = getConfig();

  config.resolve.plugins = config.resolve.plugins || [];
  config.resolve.plugins.push(
    new TsconfigPathsPlugin({
      configFile: './tsconfig.json',
    })
  );

  actions.replaceWebpackConfig(config);
};
