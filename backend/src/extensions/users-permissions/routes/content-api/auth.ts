export default {
  routes: [
    {
      method: 'POST',
      path: '/auth/local/register',
      handler: 'auth.register',
      config: {
        prefix: '',
        middlewares: ['plugin::users-permissions.rateLimit'],
      },
    },
    {
      method: 'POST',
      path: '/auth/local/register-volunteer',
      handler: 'auth.registerVolunteer',
      config: {
        prefix: '',
        middlewares: ['plugin::users-permissions.rateLimit'],
      },
    },
  ],
};
