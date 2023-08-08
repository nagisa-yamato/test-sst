import { graphql } from "@/gql/generated";

export const InfoFragment = graphql(`
  fragment Info on Info {
    count
    next
    pages
    prev
  }
`);
