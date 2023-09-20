import '@/styles/globals.css'
import { FontInter } from '@/assets/fonts';

import { cn } from '@/utils';
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <main className={cn(FontInter.variable, 'font-inter', "min-h-screen")}>
        <Component {...pageProps} />
      </main>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>

  )

}
