module.exports = function(api) {
  api.cache(true);

  const plugins = ['babel-plugin-styled-components'];

  if (process.env['ENV'] === 'prod') {
    plugins.push('babel-plugin-transform-remove-console');
  }

  return {
    presets: ['babel-preset-expo'],
    plugins
  };
};
