"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  session?: any;
}

export default function ReactQueryProvider({ children, session }: Props) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main>{children}</main>
    </QueryClientProvider>
  );
}
