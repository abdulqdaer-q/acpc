export default {
  async beforeCreate(event) {
    const { data } = event.params;

    // Validate team has exactly 3 members
    if (data.team) {
      const team = await strapi.db.query('api::team.team').findOne({
        where: { id: data.team },
        populate: ['members'],
      });

      if (!team) {
        throw new Error('Team not found');
      }

      const memberCount = team.members?.length || 0;
      if (memberCount !== 3) {
        throw new Error(`Team must have exactly 3 members. Current team has ${memberCount} members.`);
      }

      // Check if team already registered for this contest
      const existingRegistration = await strapi.db
        .query('api::contest-registration.contest-registration')
        .findOne({
          where: {
            team: data.team,
            contest: data.contest,
          },
        });

      if (existingRegistration) {
        throw new Error('Team is already registered for this contest');
      }
    }

    // Set registration date to now if not provided
    if (!data.registration_date) {
      data.registration_date = new Date();
    }
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;

    // If team is being changed, validate the new team has exactly 3 members
    if (data.team) {
      const team = await strapi.db.query('api::team.team').findOne({
        where: { id: data.team },
        populate: ['members'],
      });

      if (!team) {
        throw new Error('Team not found');
      }

      const memberCount = team.members?.length || 0;
      if (memberCount !== 3) {
        throw new Error(`Team must have exactly 3 members. Current team has ${memberCount} members.`);
      }

      // Check if team already registered for this contest (excluding current registration)
      const existingRegistration = await strapi.db
        .query('api::contest-registration.contest-registration')
        .findOne({
          where: {
            id: { $ne: where.id },
            team: data.team,
            contest: data.contest,
          },
        });

      if (existingRegistration) {
        throw new Error('Team is already registered for this contest');
      }
    }
  },
};
