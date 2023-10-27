import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { cn } from "@/utils";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { useState, type ReactElement, type ReactNode } from "react";
import type { NextPage } from "next";
import type { AppPropsWithLayout } from "@/constants";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <main className={cn("font-inter", "min-h-screen")}>
        <Component {...pageProps} />
      </main>
      <ToastContainer />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
