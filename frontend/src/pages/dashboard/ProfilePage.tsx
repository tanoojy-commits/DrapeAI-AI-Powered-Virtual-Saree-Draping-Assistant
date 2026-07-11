import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { useAuth } from "@/hooks/useAuth";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <PageContainer className="py-10">
      <h1 className="text-3xl font-bold">Profile</h1>
      <Card className="mt-6">
        <p className="font-semibold">{user?.full_name}</p>
        <p className="mt-2 text-sm text-muted">{user?.email}</p>
        <p className="mt-2 text-sm text-muted">Role: {user?.role}</p>
      </Card>
    </PageContainer>
  );
}

