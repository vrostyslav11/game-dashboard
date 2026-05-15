import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AuthForm } from '@/features/auth/components/AuthForm/AuthForm';
import { useLoginMutation } from '@/features/auth/hooks';
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas';
import { getApiErrorMessage } from '@/shared/api/apiError';
import { Input } from '@/shared/ui/Input/Input';

export default function LoginPage() {
  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const isLoading = isSubmitting || loginMutation.isPending;

  return (
    <AuthForm
      title="Log in"
      errorMessage={
        loginMutation.error ? getApiErrorMessage(loginMutation.error) : undefined
      }
      isLoading={isLoading}
      submitLabel="Log in"
      loadingLabel="Logging in…"
      onSubmit={handleSubmit((values) => loginMutation.mutate(values))}
      footerText="No account?"
      footerLinkText="Register"
      footerLinkTo="/register"
    >
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        disabled={isLoading}
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        disabled={isLoading}
        error={errors.password?.message}
        {...register('password')}
      />
    </AuthForm>
  );
}
