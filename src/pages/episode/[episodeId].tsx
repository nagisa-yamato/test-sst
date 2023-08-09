import { getFragmentData } from "@/gql/generated";
import { type EpisodeQueryVariables } from "@/gql/generated/graphql";
import {
  EpisodeCharacterFragment,
  createEpisodeQueryKey,
  fetchEpisode,
} from "@/gql/queries/Episode";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { type GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Config } from "sst/node/config";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const queryClient = new QueryClient();
  const episodeId = params?.episodeId;
  if (typeof episodeId !== "string") {
    return {
      notFound: true,
    };
  }

  const variables = {
    episodeId,
  };
  await queryClient.prefetchQuery({
    queryKey: createEpisodeQueryKey(variables),
    queryFn: async ({ signal }) =>
      await fetchEpisode({ signal, variables, url: Config.API_ENDPOINT }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

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
    <article className="flex flex-col gap-y-4">
      <h1 className="text-2xl">{data?.episode?.name}</h1>
      <dl className="grid w-fit grid-cols-2">
        <dt>Episode</dt>
        <dd>{data?.episode?.episode}</dd>
        <dt>Air Date</dt>
        <dd>{data?.episode?.air_date}</dd>
      </dl>
      <section className="grid grid-flow-row auto-rows-auto grid-cols-1 gap-4 md:grid-cols-3">
        <h2 className="col-span-full text-xl">Characters</h2>
        {data?.episode?.characters.map((character) => {
          const characterFragment = getFragmentData(
            EpisodeCharacterFragment,
            character,
          );
          return (
            <Link
              key={characterFragment?.id}
              href={`/character/${String(characterFragment?.id)}`}
            >
              <section className="grid grid-rows-[1fr_min-content] gap-y-2">
                <div className="relative h-80 w-full">
                  <Image
                    src={characterFragment?.image ?? ""}
                    alt={`Image of ${String(characterFragment?.name)}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="justify-self-center">
                  {characterFragment?.name}
                </h3>
              </section>
            </Link>
          );
        })}
      </section>
    </article>
  );
}
