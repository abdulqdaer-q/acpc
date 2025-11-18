/**
 * volunteer-application router
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/volunteer-applications',
      handler: 'volunteer-application.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/volunteer-applications/:id',
      handler: 'volunteer-application.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/volunteer-applications',
      handler: 'volunteer-application.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/volunteer-applications/:id',
      handler: 'volunteer-application.update',
      config: {
        policies: ['is-owner'],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/volunteer-applications/:id',
      handler: 'volunteer-application.delete',
      config: {
        policies: ['is-owner'],
        middlewares: [],
      },
    },
  ],
};
