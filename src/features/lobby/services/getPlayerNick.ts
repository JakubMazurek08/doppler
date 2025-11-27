import { child, get, ref } from 'firebase/database';

import { rtdb } from '@/shared/lib/firebase';

export type GetPlayerNickResult =
  | {
      success: true;
      nick: string | null;
    }
  | {
      success: false;
      error: string;
    };

export async function getPlayerNick(gameId: string, playerId: string): Promise<GetPlayerNickResult> {
  try {
    const playerRef = child(ref(rtdb), `lobbies/${gameId}/players/${playerId}`);
    const snapshot = await get(playerRef);

    if (!snapshot.exists()) {
      return { success: true, nick: null };
    }

    const nick = snapshot.val();

    return { success: true, nick: typeof nick === 'string' ? nick : String(nick) };
  } catch (error) {
    console.error('Error reading player nick from lobby:', error);
    return {
      success: false,
      error: 'Unable to read player info. Please try again.',
    };
  }
}
