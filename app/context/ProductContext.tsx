"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import productsData from "../products/product.json";

export interface Product {
  id: number;
  code: string;
  name: string;
  category?: string;
  price: number;
  stock?: number;
  image: string
  description?: string;
  createdAt?: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    
  const [products, setProducts] = useState<Product[]>(productsData as Product[]);

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}
