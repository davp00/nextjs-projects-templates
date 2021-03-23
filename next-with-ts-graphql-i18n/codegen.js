module.exports = {
  schema: [
    {
      [process.env.GRAPHQL_ENDPOINT]: {},
    },
  ],
  overwrite: true,
  documents: ['./apollo/**/*.tsx', './apollo/**/*.ts'],
  generates: {
    './apollo/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
