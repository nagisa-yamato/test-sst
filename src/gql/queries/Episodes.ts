import { CLIENT_API_ENDPOINT } from "@/constants";
import { graphql } from "@/gql/generated";
import { type FetchArgsBase } from "@/types";
import { type QueryKey } from "@tanstack/react-query";
import { type OperationDefinitionNode } from "graphql";
import request from "graphql-request";
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
  url = CLIENT_API_ENDPOINT,
  variables,
  signal,
}: FetchEpisodesArgs): Promise<EpisodesQuery> =>
  await request({
    url,
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
