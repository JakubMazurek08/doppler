'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/components/ui/input-otp';
import { Label } from '@/shared/components/ui/label';
import { checkGameExists } from '../services/checkGameExists';

type PreLobbyFormValues = {
  gameId: string;
};

export const PreLobbyInput = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PreLobbyFormValues>({
    defaultValues: {
      gameId: '',
    },
  });

  const onSubmit = async (values: PreLobbyFormValues) => {
    setServerError(null);

    // Frontend validation already guarantees length, but we can be defensive.
    const trimmed = values.gameId.trim();

    const exists = await checkGameExists(trimmed);
    if (!exists) {
      setServerError('Game not found. Check the ID and try again.');
      return;
    }

    router.push(`/play/${trimmed}`);
  };

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl p-6 shadow-sm"
      >
        <Image src="/logo/logoText.png" alt="Doppler" className="h-24 w-auto" height={500} width={500} />
        <div className="m-auto space-y-4">
          <Label htmlFor="gameId">Game ID</Label>
          <Controller
            control={control}
            name="gameId"
            rules={{
              required: 'Please enter the Game ID.',
              minLength: { value: 6, message: 'Game ID must be 6 characters.' },
              maxLength: { value: 6, message: 'Game ID must be 6 characters.' },
            }}
            render={({ field }) => (
              <InputOTP value={field.value} onChange={field.onChange} maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {errors.gameId ? <p className="mt-1 text-xs text-destructive">{errors.gameId.message}</p> : null}
        </div>
        {serverError ? <p className="text-sm text-destructive">{serverError}</p> : null}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Checking…' : 'Join Game'}
        </Button>
      </form>
    </div>
  );
};
