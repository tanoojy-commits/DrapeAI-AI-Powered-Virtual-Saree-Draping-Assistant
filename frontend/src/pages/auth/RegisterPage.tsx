import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/utils/apiError";

const registerSchema = z
  .object({
    full_name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Enter a valid email."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must include one uppercase letter.")
      .regex(/[a-z]/, "Password must include one lowercase letter.")
      .regex(/[0-9]/, "Password must include one number."),
    confirm_password: z.string().min(8, "Confirm your password."),
  })
  .refine((values) => values.password === values.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const { register: registerAccount } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(values: RegisterForm) {
    setFormError(null);
    setSuccessMessage(null);
    try {
      await registerAccount(values);
      setSuccessMessage("Account created. You can login now.");
      navigate("/login", { replace: true });
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    }
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-170px)] max-w-md items-center px-4 py-12">
      <Card className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-muted">Create a user account. Admin accounts are created separately.</p>
          <div className="mt-6 grid gap-4">
            <Input label="Name" error={errors.full_name?.message} {...register("full_name")} />
            <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
            <Input
              label="Password"
              type="password"
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              label="Confirm Password"
              type="password"
              error={errors.confirm_password?.message}
              {...register("confirm_password")}
            />
          </div>
          {formError ? <p className="mt-4 text-sm text-brand">{formError}</p> : null}
          {successMessage ? <p className="mt-4 text-sm text-green-700">{successMessage}</p> : null}
          <Button className="mt-6 w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Register"}
          </Button>
        </form>
      </Card>
    </section>
  );
}
