import { type SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(input) {
    return {
      name: "test-sst",
      region: "ap-northeast-1",
      profile: `nagisa-yamato-${input.stage === "production" ? "prod" : "dev"}`,
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site");
      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
    // https://docs.sst.dev/advanced/removal-policy#changing-the-removal-policy
    app.setDefaultRemovalPolicy("destroy");
  },
} satisfies SSTConfig;
