import React from "react";
import { useGetDashboardMetricsQuery } from "../state/api";
import { ShoppingBag } from "lucide-react";
import Rating from "../(components)/Rating";
import Sold from "../(components)/Sold";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Popular Products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {dashboardMetrics?.popularProducts.map((products) => (
              <div
                key={products.productId}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                <div className="flex items-center gap-3">
                  <div>Image</div>
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">
                      {products.name}
                    </div>
                    <div className="flex text-sm items-center">
                      <span className="font-bold text-blue-500 text-xs">
                        ${products.price}
                      </span>
                      <span className="mx-2">|</span>
                      <Rating rating={products.rating || 0} />
                    </div>
                  </div>
                </div>

                <div className="flex text-xs items-center">
                  <Sold quantity={products.stockQuantity} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
