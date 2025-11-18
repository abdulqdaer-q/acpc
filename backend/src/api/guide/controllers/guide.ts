export default {
  async find(ctx) {
    try {
      const guide = await strapi.entityService.findMany('api::guide.guide', {});
      ctx.send({ data: guide });
    } catch (error) {
      console.error('Guide fetch error:', error);
      ctx.throw(500, error);
    }
  },
};
