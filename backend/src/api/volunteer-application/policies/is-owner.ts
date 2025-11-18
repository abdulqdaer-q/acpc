/**
 * `is-owner` policy
 * Ensures users can only modify their own volunteer applications
 */

export default (policyContext, config, { strapi }) => {
  const { id } = policyContext.params;
  const userId = policyContext.state.user?.id;

  // If no user is authenticated, deny access
  if (!userId) {
    return false;
  }

  // For update and delete operations, check if the application belongs to the user
  return strapi.db.query('api::volunteer-application.volunteer-application').findOne({
    where: {
      id,
      user: userId,
    },
  }).then((application) => {
    if (!application) {
      return false;
    }
    return true;
  });
};
