import '@/styles/globals.css'
import "react-toastify/dist/ReactToastify.css";
import { cn } from '@/utils';
import type { AppProps } from 'next/app'
import { FontInter } from '@/assets/fonts';
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";



export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <main className={cn(FontInter.variable, 'font-inter', "min-h-screen")}>
        <Component {...pageProps} />
      </main>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>

  )

}
