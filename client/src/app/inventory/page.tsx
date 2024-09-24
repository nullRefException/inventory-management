"use client";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

import React from "react";
import { Product, useGetProductsQuery } from "../state/api";
import Header from "../(components)/Header";

type Props = {};

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery(); //redux toolkit query prodvides isError, isLoading

  const columns: GridColDef[] = [
    { field: "productId", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      valueGetter: (value, row: Product) => `$${row.price}`,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 150,
      valueGetter: (value, row: Product) => (row.rating ? row.rating : "N/A"),
    },
    { field: "stockQuantity", headerName: "Quantity", width: 150 },
  ];

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-500"
      />
    </div>
  );
};

export default Inventory;
