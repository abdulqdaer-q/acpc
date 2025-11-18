export default {
  routes: [
    {
      method: 'GET',
      path: '/contests/active',
      handler: 'contest.findActive',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/contests',
      handler: 'contest.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/contests/:id',
      handler: 'contest.findOne',
      config: {
        auth: false,
      },
    },
  ],
};
