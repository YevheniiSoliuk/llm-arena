import { Suspense } from "react";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Router />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
