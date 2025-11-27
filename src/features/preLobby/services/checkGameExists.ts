import { child, get, ref } from 'firebase/database';

import { auth, rtdb } from '@/shared/lib/firebase';

export async function checkGameExists(gameId: string): Promise<boolean> {
  try {
    const rootRef = ref(rtdb);
    const snapshot = await get(child(rootRef, `lobbies/${gameId}`));

    if (!snapshot.exists()) {
      return false;
    }

    const data = snapshot.val() as { hostId?: string } | null;
    const hostId = data?.hostId;
    const currentUserId = auth.currentUser?.uid;

    if (!currentUserId || !hostId) {
      return false;
    }

    // Only allow joining if the current user is not the lobby host
    if (currentUserId === hostId) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking game in lobby:', error);
    return false;
  }
}
