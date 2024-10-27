"use client";

import React from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./query"; 



export function ReactQueryProvider({ children }: React.PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}