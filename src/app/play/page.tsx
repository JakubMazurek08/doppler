import { PreLobbyInput } from '@/features/preLobby/components/PreLobbyInput';
import { ProtectedRoute } from '@/shared/components/auth/ProtectedRoute';

export default function PlayPage() {
  return (
    <ProtectedRoute>
      <PreLobbyInput />
    </ProtectedRoute>
  );
}
