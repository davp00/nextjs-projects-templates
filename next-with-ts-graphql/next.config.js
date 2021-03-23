const commonEnv = {
  GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
};

module.exports = {
  env: {
    ...commonEnv,
  },
  publicRuntimeConfig: {
    ...commonEnv,
  },
};
