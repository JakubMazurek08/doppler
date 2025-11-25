import { AddProductForm } from '@/features/exampleProduct/components/AddProductForm';
import { ProductList } from '@/features/exampleProduct/components/ProductList';
import { ProtectedRoute } from '@/shared/components/auth/ProtectedRoute';

export default async function ProductsPage() {
  return (
    // Owijacie w ta strone ktora blokuje dostep do niej niezalogowanym uzytkownikom
    <ProtectedRoute>
      <main className="p-6 space-y-4">
        <AddProductForm />
        <ProductList />
      </main>
    </ProtectedRoute>
  );
}
