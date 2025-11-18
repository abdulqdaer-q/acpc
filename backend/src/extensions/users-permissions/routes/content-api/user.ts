export default {
  routes: [
    {
      method: 'PUT',
      path: '/users/profile',
      handler: 'user.updateProfile',
      config: {
        prefix: '',
      },
    },
    {
      method: 'GET',
      path: '/users/coaches',
      handler: 'user.getCoaches',
      config: {
        prefix: '',
      },
    },
    {
      method: 'GET',
      path: '/users/me',
      handler: 'user.getMe',
      config: {
        prefix: '',
      },
    },
  ],
};
