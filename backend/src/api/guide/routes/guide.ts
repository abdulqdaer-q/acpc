export default {
  routes: [
    {
      method: 'GET',
      path: '/guide',
      handler: 'guide.find',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};
