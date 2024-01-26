import { GraphQLScalarType } from 'graphql';

// eslint-disable-next-line import/prefer-default-export
export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
});
