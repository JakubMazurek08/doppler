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

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, user } = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  React.useEffect(() => {
    if (user) {
      // Already logged in; send to home.
      router.replace('/');
    }
  }, [user, router]);

  const onSubmit = async (values: RegisterFormValues) => {
    setError(null);

    try {
      await registerUser(values.email, values.password);
      router.replace('/');
    } catch (err) {
      console.error(err);

      let message = 'Something went wrong while creating your account. Please try again.';

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            message = 'An account with this email already exists. Try signing in instead.';
            break;
          case 'auth/weak-password':
            message = 'Password is too weak. Try using at least 6–8 characters.';
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
        <Image
          className="h-40 w-fit mx-auto"
          src="/logo/logoText.png"
          alt="Doppler"
          height={500}
          width={500}
          priority
        />
        <div className="w-full rounded-xl bg-bg-dark p-6 shadow-sm">
          <h1 className="mb-1font-semibold">Create account</h1>
          <p className="mb-6">Sign up with your email and password to start using Doppler.</p>

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
                autoComplete="new-password"
                aria-invalid={errors.password ? 'true' : undefined}
                {...register('password', {
                  required: 'Password is required.',
                })}
              />
              {errors.password ? <p className="text-xs text-destructive">{errors.password.message}</p> : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                aria-invalid={errors.confirmPassword ? 'true' : undefined}
                {...register('confirmPassword', {
                  required: 'Please confirm your password.',
                  validate: (value: string, formValues: RegisterFormValues) =>
                    value === formValues.password || 'Passwords do not match.',
                })}
              />
              {errors.confirmPassword ? (
                <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
              ) : null}
            </div>

            {error ? <p className=" text-destructive">{error}</p> : null}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <p className="mt-4 text-center">
            Already have an account?{' '}
            <Link href="/login" className="underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
