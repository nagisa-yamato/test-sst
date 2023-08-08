import { createEpisodesQueryKey, fetchEpisodes } from "@/gql/queries/Episodes";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";

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
      <h1>Episodes</h1>
      <ul>
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
