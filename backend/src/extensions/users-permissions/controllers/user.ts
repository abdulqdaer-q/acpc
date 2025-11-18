export default {
  async updateProfile(ctx) {
    const userId = ctx.state.user.id;
    const {
      fullNameArabic,
      birthDate,
      tshirtSize,
      yearInUni,
      faculty,
      uniId,
    } = ctx.request.body;

    try {
      // Validate required fields for profile completion
      if (!fullNameArabic || !birthDate || !tshirtSize || !yearInUni || !faculty) {
        return ctx.badRequest('Missing required profile fields');
      }

      // Update user profile
      const updatedUser = await strapi.query('plugin::users-permissions.user').update({
        where: { id: userId },
        data: {
          fullNameArabic,
          birthDate,
          tshirtSize,
          yearInUni,
          faculty,
          uniId: uniId || null,
          profileCompleted: true,
        },
      });

      // Remove sensitive fields
      const sanitizedUser = {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        fullNameArabic: updatedUser.fullNameArabic,
        birthDate: updatedUser.birthDate,
        tshirtSize: updatedUser.tshirtSize,
        yearInUni: updatedUser.yearInUni,
        faculty: updatedUser.faculty,
        uniId: updatedUser.uniId,
        profileCompleted: updatedUser.profileCompleted,
        userRole: updatedUser.userRole,
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
        where: { userRole: 'coach' },
        select: ['id', 'username', 'email', 'fullNameArabic'],
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
        fullNameArabic: user.fullNameArabic,
        birthDate: user.birthDate,
        tshirtSize: user.tshirtSize,
        yearInUni: user.yearInUni,
        faculty: user.faculty,
        uniId: user.uniId,
        profileCompleted: user.profileCompleted,
        userRole: user.userRole,
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
