import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AuthForm } from '@/features/auth/components/AuthForm/AuthForm';
import { useRegisterMutation } from '@/features/auth/hooks';
import { registerSchema, type RegisterFormValues } from '@/features/auth/schemas';
import { getApiErrorMessage } from '@/shared/api/apiError';
import { Input } from '@/shared/ui/Input/Input';

export default function RegisterPage() {
  const registerMutation = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', username: '', password: '' },
  });

  const isLoading = isSubmitting || registerMutation.isPending;

  return (
    <AuthForm
      title="Create account"
      errorMessage={
        registerMutation.error
          ? getApiErrorMessage(registerMutation.error)
          : undefined
      }
      isLoading={isLoading}
      submitLabel="Register"
      loadingLabel="Creating account…"
      onSubmit={handleSubmit((values) => registerMutation.mutate(values))}
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkTo="/login"
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
        label="Username"
        type="text"
        autoComplete="username"
        disabled={isLoading}
        error={errors.username?.message}
        {...register('username')}
      />

      <Input
        label="Password"
        type="password"
        autoComplete="new-password"
        disabled={isLoading}
        error={errors.password?.message}
        {...register('password')}
      />
    </AuthForm>
  );
}
