export default {
  routes: [
    {
      method: 'POST',
      path: '/teams',
      handler: 'team.create',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/teams/:teamId/members',
      handler: 'team.addMember',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/teams/my-teams',
      handler: 'team.findMyTeams',
      config: {
        policies: [],
      },
    },
  ],
};
