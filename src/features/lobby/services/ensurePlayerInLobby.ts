import { child, get, ref, update } from 'firebase/database';

import { rtdb } from '@/shared/lib/firebase';

export type EnsurePlayerInLobbyParams = {
  gameId: string;
  playerId: string;
  nick: string;
};

export type EnsurePlayerInLobbyResult =
  | {
      success: true;
      alreadyJoined: boolean;
      nick: string;
    }
  | {
      success: false;
      error: string;
    };

export async function ensurePlayerInLobby({
  gameId,
  playerId,
  nick,
}: EnsurePlayerInLobbyParams): Promise<EnsurePlayerInLobbyResult> {
  const trimmedNick = nick.trim();

  if (!trimmedNick) {
    return {
      success: false,
      error: 'Nickname cannot be empty.',
    };
  }

  try {
    const playersRef = child(ref(rtdb), `lobbies/${gameId}/players`);
    const snapshot = await get(playersRef);
    const players = (snapshot.exists() ? snapshot.val() : {}) as Record<string, string>;

    const existingNick = players[playerId];

    if (existingNick) {
      return {
        success: true,
        alreadyJoined: true,
        nick: existingNick,
      };
    }

    await update(playersRef, {
      [playerId]: trimmedNick,
    });

    return {
      success: true,
      alreadyJoined: false,
      nick: trimmedNick,
    };
  } catch (error) {
    console.error('Error ensuring player in lobby:', error);
    return {
      success: false,
      error: 'Unable to join lobby. Please try again.',
    };
  }
}
