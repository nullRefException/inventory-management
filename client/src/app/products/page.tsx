"use client";
import { useState } from "react";
import { useCreateProductMutation, useGetProductsQuery } from "../state/api";
import Header from "../(components)/Header";
import { BoxIcon, PlusCircle, SearchIcon } from "lucide-react";
import RatingProps from "../(components)/Rating";
import CreateProductModal from "./CreateProductModal";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};
const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }
  if (isError || !products) {
    return <div>Failed to fetch Products</div>;
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH*/}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
          />
        </div>
      </div>
      {/*HEADER*/}

      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex item-center bg-blue-500 hover:bg-blue-700 !text-gray-200 font-bold py-2 px-2"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle className="h-5 w-5 mr-2" /> Create Product
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-col-2 lg:grid-cols-3 gap-10 justify-between">
        {products.map((item) => {
          return (
            <div
              key={item.productId}
              className="border shadow p-4 rounded-md mx-auto max-w-f w-full"
            >
              <div className="flex flex-col items-center">
                Img
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p> ${item.price.toFixed(2)}</p>
                <div>Stock: {item.stockQuantity}</div>
                {item.rating && (
                  <div className="flex items-center mt-2">
                    <RatingProps rating={item.rating} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/*MODAL*/}

      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
