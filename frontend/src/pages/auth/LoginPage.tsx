import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/utils/apiError";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginForm) {
    setFormError(null);
    try {
      await login(values);
      const fallback = "/dashboard";
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
      navigate(from ?? fallback, { replace: true });
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    }
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-170px)] max-w-md items-center px-4 py-12">
      <Card className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-muted">Login to continue to your workspace.</p>
          <div className="mt-6 grid gap-4">
            <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
            <Input
              label="Password"
              type="password"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>
          {formError ? <p className="mt-4 text-sm text-brand">{formError}</p> : null}
          <Button className="mt-6 w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    </section>
  );
}
