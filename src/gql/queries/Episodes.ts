import { graphql } from "@/gql/generated";

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
