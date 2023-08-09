import type { CodegenConfig } from "@graphql-codegen/cli";
import { config } from "dotenv";
import path from "path";
config({
  // https://github.com/motdotla/dotenv#path
  path: path.resolve(process.cwd(), ".env.local"),
});

const codegenConfig: CodegenConfig = {
  overwrite: true,
  schema: process.env.API_ENDPOINT,
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

export default codegenConfig;
