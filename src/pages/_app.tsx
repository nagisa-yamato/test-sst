import useCustomQueryClient from "@/hooks/useCustomQueryClient";
import "@/styles/globals.css";
import {
  Hydrate,
  QueryClientProvider,
  type DehydratedState,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>): JSX.Element {
  const { customQueryClient } = useCustomQueryClient();

  return (
    <QueryClientProvider client={customQueryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}
