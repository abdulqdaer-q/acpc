export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Set up permissions for public access
    const publicPermissions = await strapi
      .query('plugin::users-permissions.permission')
      .findMany({
        where: {
          role: {
            type: 'public',
          },
        },
      });

    // Allow public access to contact messages and volunteer applications (create only)
    const publicActions = [
      'api::contact-message.contact-message.create',
      'api::volunteer-application.volunteer-application.create',
      'api::team.team.find',
      'api::team.team.findOne',
    ];

    for (const action of publicActions) {
      const [controller, actionName] = action.split('.').slice(-2);
      const permission = publicPermissions.find(
        (p) => p.action === action
      );

      if (permission && !permission.enabled) {
        await strapi.query('plugin::users-permissions.permission').update({
          where: { id: permission.id },
          data: { enabled: true },
        });
      }
    }

    // Set up permissions for custom user routes
    const authenticatedRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'authenticated' },
    });

    const authenticatedPermissions = await strapi
      .query('plugin::users-permissions.permission')
      .findMany({
        where: {
          role: {
            type: 'authenticated',
          },
        },
      });

    // Enable authenticated user actions
    const authenticatedActions = [
      'plugin::users-permissions.user.updateProfile',
      'plugin::users-permissions.user.getMe',
      'api::volunteer-application.volunteer-application.find',
      'api::volunteer-application.volunteer-application.findOne',
      'api::volunteer-application.volunteer-application.update',
      'api::volunteer-application.volunteer-application.delete',
    ];

    for (const action of authenticatedActions) {
      const permission = authenticatedPermissions.find(
        (p) => p.action === action
      );

      if (permission && !permission.enabled) {
        await strapi.query('plugin::users-permissions.permission').update({
          where: { id: permission.id },
          data: { enabled: true },
        });
      }
    }
  },
};
