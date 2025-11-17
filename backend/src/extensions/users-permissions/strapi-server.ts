export default (plugin) => {
  // Extend the users-permissions plugin
  plugin.config = {
    ...plugin.config,
    jwt: {
      expiresIn: '7d',
    },
  };

  return plugin;
};
