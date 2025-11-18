import { factories } from '@strapi/strapi';

// @ts-ignore
export default factories.createCoreController('api::contest.contest', ({ strapi }) => ({
  // Get active contest with schedule
  async findActive(ctx) {
    try {
      const activeContest = await strapi.db.query('api::contest.contest').findOne({
        where: { is_active: true },
        populate: ['schedule_events'],
      });

      if (!activeContest) {
        return ctx.notFound('No active contest found');
      }

      // Sort schedule events by day and start_time
      if (activeContest.schedule_events) {
        activeContest.schedule_events.sort((a, b) => {
          if (a.day !== b.day) {
            return a.day - b.day;
          }
          return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
        });
      }

      return activeContest;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
}));
