import { graphql } from "@/gql/generated";

export const EpisodesQueryDocument = graphql(`
  fragment Origin on Location {
    created
    dimension
    id
    name
    type
  }

  fragment CharacterEpisode on Episode {
    id
    name
    episode
  }

  fragment EpisodesCharacter on Character {
    type
    status
    species
    name
    image
    id
    gender
    created
    origin {
      ...Origin
    }
    episode {
      ...CharacterEpisode
    }
  }

  query Episodes($page: Int) {
    episodes(page: $page) {
      info {
        ...Info
      }
      results {
        air_date
        created
        episode
        id
        name
        characters {
          ...EpisodesCharacter
        }
      }
    }
  }
`);
