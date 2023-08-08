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
  "\n  fragment Origin on Location {\n    created\n    dimension\n    id\n    name\n    type\n  }\n\n  fragment CharacterEpisode on Episode {\n    id\n    name\n    episode\n  }\n\n  fragment EpisodesCharacter on Character {\n    type\n    status\n    species\n    name\n    image\n    id\n    gender\n    created\n    origin {\n      ...Origin\n    }\n    episode {\n      ...CharacterEpisode\n    }\n  }\n\n  query Episodes($page: Int) {\n    episodes(page: $page) {\n      info {\n        ...Info\n      }\n      results {\n        air_date\n        created\n        episode\n        id\n        name\n        characters {\n          ...EpisodesCharacter\n        }\n      }\n    }\n  }\n":
    types.OriginFragmentDoc,
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
  source: "\n  fragment Origin on Location {\n    created\n    dimension\n    id\n    name\n    type\n  }\n\n  fragment CharacterEpisode on Episode {\n    id\n    name\n    episode\n  }\n\n  fragment EpisodesCharacter on Character {\n    type\n    status\n    species\n    name\n    image\n    id\n    gender\n    created\n    origin {\n      ...Origin\n    }\n    episode {\n      ...CharacterEpisode\n    }\n  }\n\n  query Episodes($page: Int) {\n    episodes(page: $page) {\n      info {\n        ...Info\n      }\n      results {\n        air_date\n        created\n        episode\n        id\n        name\n        characters {\n          ...EpisodesCharacter\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  fragment Origin on Location {\n    created\n    dimension\n    id\n    name\n    type\n  }\n\n  fragment CharacterEpisode on Episode {\n    id\n    name\n    episode\n  }\n\n  fragment EpisodesCharacter on Character {\n    type\n    status\n    species\n    name\n    image\n    id\n    gender\n    created\n    origin {\n      ...Origin\n    }\n    episode {\n      ...CharacterEpisode\n    }\n  }\n\n  query Episodes($page: Int) {\n    episodes(page: $page) {\n      info {\n        ...Info\n      }\n      results {\n        air_date\n        created\n        episode\n        id\n        name\n        characters {\n          ...EpisodesCharacter\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
