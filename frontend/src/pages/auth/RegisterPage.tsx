import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type RegisterForm = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  function onSubmit(values: RegisterForm) {
    console.log("Register form submitted", values);
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-170px)] max-w-md items-center px-4 py-12">
      <Card className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-muted">Backend registration arrives in Phase 5.</p>
          <div className="mt-6 grid gap-4">
            <Input label="Name" error={errors.name?.message} {...register("name")} />
            <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
            <Input
              label="Password"
              type="password"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>
          <Button className="mt-6 w-full" type="submit">
            Register
          </Button>
        </form>
      </Card>
    </section>
  );
}

