import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { GuideProvider } from "./providers/GuideProvider";
import Router from "./Router";
import { FormProvider, useForm } from "react-hook-form";

const queryClient = new QueryClient();

function App() {
  const methods = useForm()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FormProvider {...methods}>
          <GuideProvider>
            <Router />
          </GuideProvider>
        </FormProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
