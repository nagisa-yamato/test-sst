import { type EpisodeQuery } from "@/gql/generated/graphql";
import { EpisodeQueryDocument } from "@/gql/queries/Episode";
import { graphQLClient } from "@/lib/graphql-request";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Episode(): JSX.Element {
  const [data, setData] = useState<EpisodeQuery | null>(null);
  const router = useRouter();
  useEffect(() => {
    async function hoge(episodeId: string): Promise<void> {
      const episode = await graphQLClient.request(EpisodeQueryDocument, {
        episodeId,
      });
      setData(episode);
    }
    if (typeof router.query.episodeId === "string") {
      void hoge(router.query.episodeId);
    }
  }, [router.query.episodeId]);

  return <div>{JSON.stringify(data)}</div>;
}
