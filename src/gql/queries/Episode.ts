import { graphql } from "@/gql/generated";

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
