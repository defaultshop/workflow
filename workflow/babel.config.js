module.exports = function(api) {
  api.cache(true); 
  let newplugins = ['@babel/plugin-proposal-private-methods'];
  if (process.env.NODE_ENV === 'prod') {
    newplugins.push('transform-remove-console')
  }
  return {
    presets: ['@vue/app'],
    plugins: newplugins,
    sourceType: 'unambiguous',
  };
};
