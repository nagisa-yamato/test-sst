/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  fragment Info on Info {\n    count\n    next\n    pages\n    prev\n  }\n":
    types.InfoFragmentDoc,
  "\n  fragment EpisodeCharacter on Character {\n    id\n    image\n    name\n  }\n":
    types.EpisodeCharacterFragmentDoc,
  "\n  query Episode($episodeId: ID!) {\n    episode(id: $episodeId) {\n      air_date\n      episode\n      id\n      name\n      created\n      characters {\n        ...EpisodeCharacter\n      }\n    }\n  }\n":
    types.EpisodeDocument,
  "\n  query Episodes($page: Int) {\n    episodes(page: $page) {\n      info {\n        ...Info\n      }\n      results {\n        episode\n        id\n        name\n      }\n    }\n  }\n":
    types.EpisodesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment Info on Info {\n    count\n    next\n    pages\n    prev\n  }\n",
): (typeof documents)["\n  fragment Info on Info {\n    count\n    next\n    pages\n    prev\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment EpisodeCharacter on Character {\n    id\n    image\n    name\n  }\n",
): (typeof documents)["\n  fragment EpisodeCharacter on Character {\n    id\n    image\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Episode($episodeId: ID!) {\n    episode(id: $episodeId) {\n      air_date\n      episode\n      id\n      name\n      created\n      characters {\n        ...EpisodeCharacter\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Episode($episodeId: ID!) {\n    episode(id: $episodeId) {\n      air_date\n      episode\n      id\n      name\n      created\n      characters {\n        ...EpisodeCharacter\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Episodes($page: Int) {\n    episodes(page: $page) {\n      info {\n        ...Info\n      }\n      results {\n        episode\n        id\n        name\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Episodes($page: Int) {\n    episodes(page: $page) {\n      info {\n        ...Info\n      }\n      results {\n        episode\n        id\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
