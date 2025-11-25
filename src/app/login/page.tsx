'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FirebaseError } from 'firebase/app';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/shared/hooks/useAuth';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();

  const [error, setError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  React.useEffect(() => {
    if (user) {
      // Already logged in; send to home.
      router.replace('/');
    }
  }, [user, router]);

  const onSubmit = async (values: LoginFormValues) => {
    setError(null);

    try {
      await login(values.email, values.password);
      router.replace('/');
    } catch (err) {
      console.error(err);

      let message = 'Something went wrong while signing in. Please try again.';

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/invalid-credential':
          case 'auth/wrong-password':
          case 'auth/user-not-found':
            message = 'Invalid email or password. Please check your credentials and try again.';
            break;
          case 'auth/too-many-requests':
            message = 'Too many failed attempts. Please wait a moment and try again.';
            break;
          default:
            // Keep the generic message for other errors.
            break;
        }
      }

      setError(message);
    }
  };

  return (
    <div className="flex min-h-svh items-center justify-center px-4 w-full">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <Image className="h-40 w-fit" src="/logo/logoText.png" alt="Doppler" height={500} width={500} priority />
        <div className="w-full rounded-xl border bg-bg-dark p-6 shadow-sm">
          <h1 className="mb-1 font-semibold">Sign in</h1>
          <p className="mb-6">Use your email and password to access your Doppler account.</p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={errors.email ? 'true' : undefined}
                {...register('email', {
                  required: 'Email is required.',
                })}
              />
              {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={errors.password ? 'true' : undefined}
                {...register('password', {
                  required: 'Password is required.',
                })}
              />
              {errors.password ? <p className="text-xs text-destructive">{errors.password.message}</p> : null}
            </div>

            {error ? <p className=" text-destructive">{error}</p> : null}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <p className="mt-4 text-center">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline-offset-4 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
