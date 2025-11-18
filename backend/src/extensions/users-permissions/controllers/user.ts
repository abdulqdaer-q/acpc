export default {
  async updateProfile(ctx) {
    const userId = ctx.state.user.id;
    const {
      full_name_arabic,
      birth_date,
      tshirt_size,
      year_in_uni,
      faculty,
      uni_id,
    } = ctx.request.body;

    try {
      // Validate required fields for profile completion
      if (!full_name_arabic || !birth_date || !tshirt_size || !year_in_uni || !faculty) {
        return ctx.badRequest('Missing required profile fields');
      }

      // Update user profile
      const updatedUser = await strapi.query('plugin::users-permissions.user').update({
        where: { id: userId },
        data: {
          full_name_arabic,
          birth_date,
          tshirt_size,
          year_in_uni,
          faculty,
          uni_id: uni_id || null,
          profile_completed: true,
        },
      });

      // Remove sensitive fields
      const sanitizedUser = {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        full_name_arabic: updatedUser.full_name_arabic,
        birth_date: updatedUser.birth_date,
        tshirt_size: updatedUser.tshirt_size,
        year_in_uni: updatedUser.year_in_uni,
        faculty: updatedUser.faculty,
        uni_id: updatedUser.uni_id,
        profile_completed: updatedUser.profile_completed,
        user_role: updatedUser.user_role,
      };

      ctx.send({ user: sanitizedUser });
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async getCoaches(ctx) {
    try {
      // Get all users with coach role
      const coaches = await strapi.query('plugin::users-permissions.user').findMany({
        where: { user_role: 'coach' },
        select: ['id', 'username', 'email', 'full_name_arabic'],
      });

      ctx.send({ data: coaches });
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async getMe(ctx) {
    const userId = ctx.state.user.id;

    try {
      const user = await strapi.query('plugin::users-permissions.user').findOne({
        where: { id: userId },
        populate: {
          role: true,
        },
      });

      if (!user) {
        return ctx.notFound('User not found');
      }

      // Remove sensitive fields
      const sanitizedUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name_arabic: user.full_name_arabic,
        birth_date: user.birth_date,
        tshirt_size: user.tshirt_size,
        year_in_uni: user.year_in_uni,
        faculty: user.faculty,
        uni_id: user.uni_id,
        profile_completed: user.profile_completed,
        user_role: user.user_role,
        confirmed: user.confirmed,
        blocked: user.blocked,
        role: user.role,
      };

      ctx.send({ user: sanitizedUser });
    } catch (error) {
      ctx.throw(500, error);
    }
  },
};
