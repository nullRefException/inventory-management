import { ShoppingBag } from "lucide-react";
import React from "react";

type StockProp = {
  quantity: number;
};
const Sold = ({ quantity }: StockProp) => {
  return (
    <>
      <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
        <ShoppingBag className="w-4 h-4" />
      </button>
      {Math.round(quantity / 1000)}k Sold
    </>
  );
};

export default Sold;
