export default {
  async create(ctx) {
    const userId = ctx.state.user.id;
    const { name, university, coach, members } = ctx.request.body.data;

    try {
      // Validate exactly 3 members
      if (!members || members.length !== 3) {
        return ctx.badRequest('Team must have exactly 3 members');
      }

      // Validate that all members have completed their profiles
      const userIds = members.map(m => m.user).filter(Boolean);
      if (userIds.length > 0) {
        const users = await strapi.query('plugin::users-permissions.user').findMany({
          where: { id: { $in: userIds } },
        });

        const incompletedUsers = users.filter(u => !u.profileCompleted);
        if (incompletedUsers.length > 0) {
          return ctx.badRequest('All team members must complete their profiles before joining a team');
        }
      }

      // Create the team
      const team = await strapi.entityService.create('api::team.team', {
        data: {
          name,
          university,
          coach,
          status: 'pending',
          createdByUser: userId,
        } as any,
      });

      // Create team members
      for (const member of members) {
        await strapi.entityService.create('api::team-member.team-member', {
          data: {
            ...member,
            team: team.id,
          },
        });
      }

      // Fetch the complete team with members
      const completeTeam = await strapi.entityService.findOne('api::team.team', team.id, {
        populate: {
          members: true,
          coach: {
            fields: ['id', 'username', 'email', 'fullNameArabic'],
          },
          createdByUser: {
            fields: ['id', 'username', 'email'],
          },
        },
      });

      ctx.send({ data: completeTeam });
    } catch (error) {
      console.error('Team creation error:', error);
      ctx.throw(500, error);
    }
  },

  async addMember(ctx) {
    const { teamId } = ctx.params;
    const memberData = ctx.request.body.data;

    try {
      // Get current team with members
      const team: any = await strapi.entityService.findOne('api::team.team', teamId, {
        populate: { members: true },
      });

      if (!team) {
        return ctx.notFound('Team not found');
      }

      // Check if team already has 3 members
      if (team.members && team.members.length >= 3) {
        return ctx.badRequest('Team already has 3 members (maximum limit)');
      }

      // Validate user profile completion if user is provided
      if (memberData.user) {
        const user = await strapi.query('plugin::users-permissions.user').findOne({
          where: { id: memberData.user },
        });

        if (!user || !user.profileCompleted) {
          return ctx.badRequest('User must complete their profile before joining a team');
        }
      }

      // Create the team member
      const member = await strapi.entityService.create('api::team-member.team-member', {
        data: {
          ...memberData,
          team: teamId,
        },
      });

      ctx.send({ data: member });
    } catch (error) {
      console.error('Add member error:', error);
      ctx.throw(500, error);
    }
  },

  async findMyTeams(ctx) {
    const userId = ctx.state.user.id;

    try {
      // Find teams created by the user
      const createdTeams = await strapi.db.query('api::team.team').findMany({
        where: {
          createdByUser: { id: userId },
        },
        populate: {
          members: {
            populate: {
              user: true,
            },
          },
          coach: true,
          createdByUser: true,
        },
      });

      // Find teams where user is a member
      const memberTeams = await strapi.db.query('api::team.team').findMany({
        where: {
          members: {
            user: { id: userId },
          },
        },
        populate: {
          members: {
            populate: {
              user: true,
            },
          },
          coach: true,
          createdByUser: true,
        },
      });

      // Find teams where user is the coach
      const coachedTeams = await strapi.db.query('api::team.team').findMany({
        where: {
          coach: { id: userId },
        },
        populate: {
          members: {
            populate: {
              user: true,
            },
          },
          coach: true,
          createdByUser: true,
        },
      });

      // Combine and deduplicate teams
      const allTeams = [...createdTeams, ...memberTeams, ...coachedTeams];
      const uniqueTeams = allTeams.filter((team, index, self) =>
        index === self.findIndex((t) => t.id === team.id)
      );

      ctx.send({ data: uniqueTeams });
    } catch (error) {
      console.error('Find my teams error:', error);
      ctx.throw(500, error);
    }
  },
};
