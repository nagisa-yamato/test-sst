import { type EpisodeQueryVariables } from "@/gql/generated/graphql";
import { createEpisodeQueryKey, fetchEpisode } from "@/gql/queries/Episode";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function Episode(): JSX.Element {
  const router = useRouter();
  const variables: EpisodeQueryVariables = {
    episodeId: String(router.query.episodeId),
  };
  const { data } = useQuery({
    queryKey: createEpisodeQueryKey(variables),
    queryFn: async ({ signal }) => await fetchEpisode({ variables, signal }),
    enabled: router.isReady,
  });

  return (
    <article>
      <h1>{data?.episode?.name}</h1>
    </article>
  );
}
