import { GraphQLClient } from "graphql-request";

const apiEndpoint = process.env.API_ENDPOINT;
const isServer = typeof window === "undefined";

if (isServer && apiEndpoint === undefined) {
  throw new Error("API_ENDPOINT is not defined");
}

export const graphQLClient = new GraphQLClient(
  isServer && apiEndpoint !== undefined ? apiEndpoint : "/api/graphql",
);
