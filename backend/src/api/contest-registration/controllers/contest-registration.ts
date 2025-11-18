import { factories } from '@strapi/strapi';

// @ts-ignore
export default factories.createCoreController('api::contest-registration.contest-registration', ({ strapi }) => ({
  // Register a team for a contest
  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('You must be logged in to register a team');
    }

    const { team, contest } = ctx.request.body.data;

    if (!team || !contest) {
      return ctx.badRequest('Team and contest are required');
    }

    try {
      // Verify user owns the team
      const teamData = await strapi.db.query('api::team.team').findOne({
        where: { id: team, created_by_user: user.id },
        populate: ['members'],
      });

      if (!teamData) {
        return ctx.forbidden('You can only register your own team');
      }

      // Verify team status is approved
      if (teamData.status !== 'approved') {
        return ctx.badRequest('Team must be approved before registering for contests');
      }

      // Verify team has exactly 3 members
      const memberCount = teamData.members?.length || 0;
      if (memberCount !== 3) {
        return ctx.badRequest(`Team must have exactly 3 members. Your team has ${memberCount} members.`);
      }

      // Verify contest exists
      const contestData = await strapi.db.query('api::contest.contest').findOne({
        where: { id: contest },
      });

      if (!contestData) {
        return ctx.notFound('Contest not found');
      }

      // Check if registration is open
      const now = new Date();
      if (contestData.registration_start && new Date(contestData.registration_start) > now) {
        return ctx.badRequest('Registration has not started yet');
      }
      if (contestData.registration_end && new Date(contestData.registration_end) < now) {
        return ctx.badRequest('Registration has ended');
      }

      // Check max teams limit
      if (contestData.max_teams) {
        const registrationCount = await strapi.db
          .query('api::contest-registration.contest-registration')
          .count({
            where: {
              contest: contest,
              status: { $in: ['pending', 'approved'] },
            },
          });

        if (registrationCount >= contestData.max_teams) {
          return ctx.badRequest('Contest has reached maximum number of teams');
        }
      }

      // Create registration
      const registration = await strapi.db
        .query('api::contest-registration.contest-registration')
        .create({
          data: {
            team,
            contest,
            registration_date: new Date(),
            status: 'pending',
          },
          populate: ['team', 'contest'],
        });

      return registration;
    } catch (err) {
      if (err.message.includes('already registered')) {
        return ctx.badRequest(err.message);
      }
      ctx.throw(500, err);
    }
  },
}));
