import { CLIENT_API_ENDPOINT } from "@/constants";
import { HttpOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Config, NextjsSite, type StackContext } from "sst/constructs";

export default function Site({ stack }: StackContext): void {
  const API_ENDPOINT = new Config.Secret(stack, "API_ENDPOINT");
  const site = new NextjsSite(stack, "site", {
    bind: [API_ENDPOINT],
  });
  if (process.env.API_ENDPOINT === undefined) {
    throw new Error("API_ENDPOINT is not defined");
  }
  const apiEndpointUrl = new URL(process.env.API_ENDPOINT);
  // @see https://discord.com/channels/983865673656705025/1139033431825731705/1139090078585597983
  // @ts-expect-error 型定義が合わないらしい
  site.cdk?.distribution.addBehavior(
    CLIENT_API_ENDPOINT,
    new HttpOrigin(apiEndpointUrl.hostname, {
      originPath: apiEndpointUrl.pathname,
    }),
  );
  stack.addOutputs({
    SiteUrl: site.url,
  });
}
