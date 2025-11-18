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

  // Add custom controllers
  plugin.controllers.auth = {
    ...plugin.controllers.auth,
    ...authControllers,
  };

  plugin.controllers.user = {
    ...plugin.controllers.user,
    ...userControllers,
  };

  // Add custom routes
  plugin.routes['content-api'].routes.push(...authRoutes.routes);
  plugin.routes['content-api'].routes.push(...userRoutes.routes);

  return plugin;
};
