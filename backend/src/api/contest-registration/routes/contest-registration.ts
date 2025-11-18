export default {
  routes: [
    {
      method: 'POST',
      path: '/contest-registrations',
      handler: 'contest-registration.create',
    },
    {
      method: 'GET',
      path: '/contest-registrations',
      handler: 'contest-registration.find',
    },
    {
      method: 'GET',
      path: '/contest-registrations/:id',
      handler: 'contest-registration.findOne',
    },
  ],
};
