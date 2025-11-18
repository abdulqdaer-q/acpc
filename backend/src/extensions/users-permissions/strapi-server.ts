import authControllers from './controllers/auth';
import userControllers from './controllers/user';
import authRoutes from './routes/content-api/auth';
import userRoutes from './routes/content-api/user';

export default (plugin) => {
  // Extend the users-permissions plugin
  plugin.config = {
    ...plugin.config,
    jwt: {
      expiresIn: '7d',
    },
  };

  // Store reference to the original auth controller factory
  const originalAuthController = plugin.controllers.auth;

  // Replace the auth controller with a new factory that merges original and custom methods
  plugin.controllers.auth = (params) => {
    const originalMethods = originalAuthController(params);
    return {
      ...originalMethods,
      ...authControllers,
    };
  };

  // User controller is a plain object, not a factory function, so we can merge directly
  plugin.controllers.user = {
    ...plugin.controllers.user,
    ...userControllers,
  };
  console.log({x: plugin.controllers.user, y: userControllers, z: userRoutes.routes})
  // Add custom routes
  plugin.routes['content-api'].routes.push(...authRoutes.routes);
  plugin.routes['content-api'].routes.push(...userRoutes.routes);

  return plugin;
};
