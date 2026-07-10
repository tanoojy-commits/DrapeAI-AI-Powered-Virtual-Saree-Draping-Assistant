import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { PageContainer } from "@/components/ui/PageContainer";

export function NotFoundPage() {
  return (
    <PageContainer className="grid min-h-[calc(100vh-170px)] place-items-center text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">404</p>
        <h1 className="mt-3 text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-muted">The page you requested does not exist.</p>
        <Link to="/" className="mt-8 inline-flex">
          <Button>Back home</Button>
        </Link>
      </div>
    </PageContainer>
  );
}

