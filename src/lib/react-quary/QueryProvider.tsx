// Imports
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new instance of QueryClient
const queryClient = new QueryClient();

/**
 * The `QueryProvider` component is a wrapper that provides the React Query client
 * to the entire application using `QueryClientProvider`.
 *
 * @component
 * @param {Object} children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} - Returns JSX representing the QueryClientProvider.
 */
export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
