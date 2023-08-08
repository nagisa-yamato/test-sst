import { EpisodesQueryDocument } from "@/gql/queries/Episodes";
import { useGraphQL } from "@/lib/react-query";
import Link from "next/link";

export default function Index(): JSX.Element {
  const { data } = useGraphQL(EpisodesQueryDocument, {
    page: 1,
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
