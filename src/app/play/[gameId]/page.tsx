'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { Lobby } from '@/features/lobby/components/Lobby';
import { checkGameExists } from '@/features/preLobby/services/checkGameExists';
import { ProtectedRoute } from '@/shared/components/auth/ProtectedRoute';

type Status = 'checking' | 'not-found' | 'ok';

export default function PlayGamePage() {
  const params = useParams();
  const gameIdParam = params?.gameId;
  const gameId = typeof gameIdParam === 'string' ? gameIdParam : Array.isArray(gameIdParam) ? gameIdParam[0] : '';

  const [status, setStatus] = useState<Status>('checking');

  useEffect(() => {
    const run = async () => {
      if (!gameId || gameId.length !== 6) {
        setStatus('not-found');
        return;
      }

      const exists = await checkGameExists(gameId);
      setStatus(exists ? 'ok' : 'not-found');
    };

    void run();
  }, [gameId]);

  let content: React.ReactNode;

  if (status === 'checking') {
    content = (
      <div className="flex min-h-[70vh] w-full items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">Checking game...</p>
      </div>
    );
  } else if (status === 'not-found') {
    content = (
      <div className="flex min-h-[70vh] w-full items-center justify-center px-4">
        <p>Game not found or you cannot join this lobby.</p>
      </div>
    );
  } else {
    content = <Lobby gameId={gameId} />;
  }

  return <ProtectedRoute>{content}</ProtectedRoute>;
}
