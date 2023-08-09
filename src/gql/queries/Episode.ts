import { CLIENT_API_ENDPOINT } from "@/constants";
import { graphql } from "@/gql/generated";
import { type FetchArgsBase } from "@/types";
import { type QueryKey } from "@tanstack/react-query";
import { type OperationDefinitionNode } from "graphql";
import request from "graphql-request";
import {
  type EpisodeQuery,
  type EpisodeQueryVariables,
} from "../generated/graphql";

export const EpisodeCharacterFragment = graphql(`
  fragment EpisodeCharacter on Character {
    id
    image
    name
  }
`);

export const EpisodeQueryDocument = graphql(`
  query Episode($episodeId: ID!) {
    episode(id: $episodeId) {
      air_date
      episode
      id
      name
      created
      characters {
        ...EpisodeCharacter
      }
    }
  }
`);

interface FetchEpisodeArgs extends FetchArgsBase {
  variables: EpisodeQueryVariables;
}

export const fetchEpisode = async ({
  url = CLIENT_API_ENDPOINT,
  variables,
  signal,
}: FetchEpisodeArgs): Promise<EpisodeQuery> =>
  await request({
    url,
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
