import { Product } from '../models/product.types';
import { getProducts } from '../services/getProducts';

export const ProductList = async () => {
  const products = await getProducts();
  // Pobieramy dane w sposob SSR

  return (
    <div>
      <h1 className="text-2xl font-semibold">Products</h1>

      <ul className="space-y-2">
        {products.map((p: Product) => (
          <li key={p.id} className="border rounded p-4">
            <strong>{p.name}</strong> {p.price}$
          </li>
        ))}
      </ul>
    </div>
  );
};
