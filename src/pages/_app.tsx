import useCustomQueryClient from "@/hooks/useCustomQueryClient";
import "@/styles/globals.css";
import {
  Hydrate,
  QueryClientProvider,
  type DehydratedState,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type AppProps } from "next/app";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  // https://nextjs.org/docs/messages/google-fonts-missing-subsets#disable-preloading-for-that-font
  preload: false,
});

export default function App({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>): JSX.Element {
  const { customQueryClient } = useCustomQueryClient();

  return (
    <QueryClientProvider client={customQueryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <main className={`${notoSansJP.className} p-6`}>
          <Component {...pageProps} />
        </main>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}
