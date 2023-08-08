import { graphql } from "@/gql/generated";
import { graphQLClient } from "@/lib/graphql-request";
import { type FetchArgsBase } from "@/types";
import { type QueryKey } from "@tanstack/react-query";
import { type OperationDefinitionNode } from "graphql";
import {
  type EpisodesQuery,
  type EpisodesQueryVariables,
} from "../generated/graphql";

export const EpisodesQueryDocument = graphql(`
  query Episodes($page: Int) {
    episodes(page: $page) {
      info {
        ...Info
      }
      results {
        episode
        id
        name
      }
    }
  }
`);

interface FetchEpisodesArgs extends FetchArgsBase {
  variables: EpisodesQueryVariables;
}

export const fetchEpisodes = async ({
  variables,
  signal,
}: FetchEpisodesArgs): Promise<EpisodesQuery> =>
  await graphQLClient.request({
    document: EpisodesQueryDocument,
    variables,
    signal,
  });

export const createEpisodesQueryKey = (
  variables: EpisodesQueryVariables,
): QueryKey => [
  (EpisodesQueryDocument.definitions.at(0) as OperationDefinitionNode).name
    ?.value ?? "Episodes",
  variables,
];
