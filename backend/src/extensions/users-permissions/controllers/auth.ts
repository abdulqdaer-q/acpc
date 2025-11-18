import { errors } from '@strapi/utils';
const { ApplicationError } = errors;

export default {
  async register(ctx) {
    const pluginStore = await strapi.store({ type: 'plugin', name: 'users-permissions' });
    const settings: any = await pluginStore.get({ key: 'advanced' });

    if (!settings.allow_register) {
      throw new ApplicationError('Register action is currently disabled');
    }

    const params = {
      ...ctx.request.body,
      provider: 'local',
    };

    // Set default role to 'user' for regular registration
    params.user_role = 'user';
    params.profile_completed = false;

    // Password is required
    if (!params.password) {
      throw new ApplicationError('Missing password');
    }

    const role = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: settings.default_role } });

    if (!role) {
      throw new ApplicationError('Impossible to find the default role');
    }

    // Check if username is taken
    const identifierFilter = {
      $or: [
        { email: params.email.toLowerCase() },
        { username: params.email.toLowerCase() },
      ],
    };

    const conflictingUserCount = await strapi.query('plugin::users-permissions.user').count({
      where: identifierFilter,
    });

    if (conflictingUserCount > 0) {
      throw new ApplicationError('Email or Username are already taken');
    }

    const newUser = {
      ...params,
      role: role.id,
      email: params.email.toLowerCase(),
      username: params.email.toLowerCase(),
      confirmed: !settings.email_confirmation,
    };

    const user = await strapi.query('plugin::users-permissions.user').create({
      data: newUser,
      populate: ['role'],
    });

    // Remove sensitive fields
    const sanitizedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      provider: user.provider,
      confirmed: user.confirmed,
      blocked: user.blocked,
      user_role: user.user_role,
      profile_completed: user.profile_completed,
    };

    if (settings.email_confirmation) {
      try {
        await strapi.plugin('users-permissions').service('user').sendConfirmationEmail(user);
      } catch (err) {
        throw new ApplicationError(err.message);
      }

      return ctx.send({ user: sanitizedUser });
    }

    const jwt = strapi.plugin('users-permissions').service('jwt').issue({
      id: user.id,
    });

    return ctx.send({
      jwt,
      user: {
        ...sanitizedUser,
        user_role: user.user_role,
        profile_completed: user.profile_completed,
      },
    });
  },

  async registerVolunteer(ctx) {
    const pluginStore = await strapi.store({ type: 'plugin', name: 'users-permissions' });
    const settings: any = await pluginStore.get({ key: 'advanced' });

    if (!settings.allow_register) {
      throw new ApplicationError('Register action is currently disabled');
    }

    const params = {
      ...ctx.request.body,
      provider: 'local',
    };

    // Set role to 'volunteer'
    params.user_role = 'volunteer';
    params.profile_completed = false;

    // Password is required
    if (!params.password) {
      throw new ApplicationError('Missing password');
    }

    const role = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: settings.default_role } });

    if (!role) {
      throw new ApplicationError('Impossible to find the default role');
    }

    // Check if username is taken
    const identifierFilter = {
      $or: [
        { email: params.email.toLowerCase() },
        { username: params.email.toLowerCase() },
      ],
    };

    const conflictingUserCount = await strapi.query('plugin::users-permissions.user').count({
      where: identifierFilter,
    });

    if (conflictingUserCount > 0) {
      throw new ApplicationError('Email or Username are already taken');
    }

    const newUser = {
      ...params,
      role: role.id,
      email: params.email.toLowerCase(),
      username: params.email.toLowerCase(),
      confirmed: !settings.email_confirmation,
    };

    const user = await strapi.query('plugin::users-permissions.user').create({
      data: newUser,
      populate: ['role'],
    });

    // Remove sensitive fields
    const sanitizedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      provider: user.provider,
      confirmed: user.confirmed,
      blocked: user.blocked,
      user_role: user.user_role,
      profile_completed: user.profile_completed,
    };

    if (settings.email_confirmation) {
      try {
        await strapi.plugin('users-permissions').service('user').sendConfirmationEmail(user);
      } catch (err) {
        throw new ApplicationError(err.message);
      }

      return ctx.send({ user: sanitizedUser });
    }

    const jwt = strapi.plugin('users-permissions').service('jwt').issue({
      id: user.id,
    });

    return ctx.send({
      jwt,
      user: {
        ...sanitizedUser,
        user_role: user.user_role,
        profile_completed: user.profile_completed,
      },
    });
  },
};
