"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const queryClient = new QueryClient();

export default function App({children}: {children: React.ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider> {children} </ThemeProvider>
      <Toaster />
      {/* shadcn toaster built on top of hottoast */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}   
