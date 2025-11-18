export default {
  routes: [
    {
      method: 'GET',
      path: '/schedule-events',
      handler: 'schedule-event.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/schedule-events/:id',
      handler: 'schedule-event.findOne',
      config: {
        auth: false,
      },
    },
  ],
};
