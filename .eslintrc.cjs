module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // https://github.com/standard/eslint-config-standard-with-typescript
    "standard-with-typescript",
    // https://nextjs.org/docs/app/building-your-application/configuring/eslint#additional-configurations
    "next/core-web-vitals",
    // https://github.com/prettier/eslint-config-prettier
    "prettier",
  ],
  overrides: [
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
    project: true,
    tsconfigRootDir: __dirname,
  },
};
