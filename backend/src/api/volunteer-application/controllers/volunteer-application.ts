/**
 * volunteer-application controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::volunteer-application.volunteer-application',
  ({ strapi }) => ({
    // Override default create to automatically set the user
    async create(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized('You must be logged in to create a volunteer application');
      }

      // Set the user in the data
      ctx.request.body.data = {
        ...ctx.request.body.data,
        user: user.id,
      };

      const response = await super.create(ctx);
      return response;
    },

    // Override find to only show user's own applications (unless admin)
    async find(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized('You must be logged in');
      }

      // Filter by user if not admin
      if (!ctx.request.query.filters) {
        ctx.request.query.filters = {};
      }

      // Only show user's own applications
      ctx.request.query.filters = {
        ...ctx.request.query.filters,
        user: {
          id: {
            $eq: user.id,
          },
        },
      };

      const response = await super.find(ctx);
      return response;
    },
  })
);
