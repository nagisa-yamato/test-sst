import { Config, NextjsSite, type StackContext } from "sst/constructs";

export default function Site({ stack }: StackContext): void {
  const API_ENDPOINT = new Config.Secret(stack, "API_ENDPOINT");

  const site = new NextjsSite(stack, "site", {
    bind: [API_ENDPOINT],
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });
}
