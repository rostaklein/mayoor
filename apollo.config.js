module.exports = {
  client: {
    includes: ['./frontend/src/**/*.ts', './frontend/src/**/*.tsx'],
    service: {
      name: 'mayoor',
      localSchemaFile: './frontend/src/schema.json',
    },
  },
};
