import Site from "@/stacks/site";
import { type SSTConfig } from "sst";

export default {
  config({ stage }) {
    return {
      name: "test-sst",
      region: "ap-northeast-1",
      profile: `nagisa-yamato-${stage ?? "dev"}`,
    };
  },
  stacks(app) {
    app.stack(Site);
    // https://docs.sst.dev/advanced/removal-policy#changing-the-removal-policy
    // Remove all resources when non-prod stages are removed
    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }
  },
} satisfies SSTConfig;
