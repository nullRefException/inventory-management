"use client";
import { UserRoundIcon } from "lucide-react";
import { useGetUsersQuery } from "../state/api";
import Header from "../(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Props = {};

const Users = (props: Props) => {
  const columns: GridColDef[] = [
    { field: "userId", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
  ];
  const { data: users, isError, isLoading } = useGetUsersQuery();
  return (
    <div>
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-500"
      />
    </div>
  );
};

export default Users;
