import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://rickandmortyapi.com/graphql",
  // https://the-guild.dev/graphql/codegen/docs/config-reference/documents-field#document-scanner
  documents: "src/**/!(*.d).{ts,tsx}",
  ignoreNoDocuments: true,
  generates: {
    "src/gql/generated/": {
      preset: "client",
      plugins: [],
      config: {
        useTypeImports: true,
      },
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
    },
  },
  hooks: { afterOneFileWrite: ["prettier --write"] },
};

export default config;
