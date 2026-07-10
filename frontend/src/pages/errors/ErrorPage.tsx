import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { PageContainer } from "@/components/ui/PageContainer";

export function ErrorPage() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : "Something went wrong.";

  return (
    <PageContainer className="grid min-h-screen place-items-center text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Error</p>
        <h1 className="mt-3 text-4xl font-bold">{message}</h1>
        <Link to="/" className="mt-8 inline-flex">
          <Button>Back home</Button>
        </Link>
      </div>
    </PageContainer>
  );
}

