import { createEpisodesQueryKey, fetchEpisodes } from "@/gql/queries/Episodes";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { type GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Config } from "sst/node/config";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient();
  const variables = {
    page: typeof query.page === "string" ? Number(query.page) : 1,
  };

  await queryClient.prefetchQuery({
    queryKey: createEpisodesQueryKey(variables),
    queryFn: async ({ signal }) =>
      await fetchEpisodes({ signal, variables, url: Config.API_ENDPOINT }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Index(): JSX.Element {
  const router = useRouter();
  const variables = {
    page: typeof router.query.page === "string" ? Number(router.query.page) : 1,
  };
  const { data } = useQuery({
    queryKey: createEpisodesQueryKey(variables),
    queryFn: async ({ signal }) =>
      await fetchEpisodes({
        variables,
        signal,
      }),
    enabled: router.isReady,
  });

  return (
    <article>
      <h1 className="mb-4 text-2xl">Episodes</h1>
      <ul className="flex flex-col gap-y-2">
        {data?.episodes?.results?.map(
          (result) =>
            result?.id != null && (
              <li key={result.id}>
                <Link href={`/episode/${result.id}`}>
                  {result?.episode} - {result?.name}
                </Link>
              </li>
            ),
        )}
      </ul>
    </article>
  );
}
