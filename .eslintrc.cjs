module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // https://nextjs.org/docs/app/building-your-application/configuring/eslint#additional-configurations
    "next/core-web-vitals",
    // https://github.com/prettier/eslint-config-prettier
    "prettier",
  ],
  overrides: [
    {
      files: ["*.{ts,tsx}"],
      processor: "@graphql-eslint/graphql",
    },
    {
      files: ["*.graphql"],
      extends: ["plugin:@graphql-eslint/operations-recommended"],
      parserOptions: {
        operations: "./src/**/*.(ts|tsx)",
        schema: "https://rickandmortyapi.com/graphql",
      },
    },
    {
      extends: [
        // https://github.com/standard/eslint-config-standard-with-typescript
        "standard-with-typescript",
        "prettier",
      ],
      files: ["./**/*.{ts,tsx}"],
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
