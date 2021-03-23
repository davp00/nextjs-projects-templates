const { i18n } = require('./next-i18next.config')

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
  i18n
};
