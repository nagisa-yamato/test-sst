import { graphql } from "@/gql/generated";
import { graphQLClient } from "@/lib/graphql-request";
import { type FetchArgsBase } from "@/types";
import { type QueryKey } from "@tanstack/react-query";
import { type OperationDefinitionNode } from "graphql";
import {
  type EpisodeQuery,
  type EpisodeQueryVariables,
} from "../generated/graphql";

export const EpisodeQueryDocument = graphql(`
  query Episode($episodeId: ID!) {
    episode(id: $episodeId) {
      air_date
      episode
      id
      name
      created
    }
  }
`);

interface FetchEpisodeArgs extends FetchArgsBase {
  variables: EpisodeQueryVariables;
}

export const fetchEpisode = async ({
  variables,
  signal,
}: FetchEpisodeArgs): Promise<EpisodeQuery> =>
  await graphQLClient.request({
    document: EpisodeQueryDocument,
    variables,
    signal,
  });

export const createEpisodeQueryKey = (
  variables: EpisodeQueryVariables,
): QueryKey => [
  (EpisodeQueryDocument.definitions.at(0) as OperationDefinitionNode).name
    ?.value ?? "Episode",
  variables,
];
