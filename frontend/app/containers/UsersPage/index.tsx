import React from "react";
import { useSelector } from "react-redux";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  MuiEvent,
} from "@mui/x-data-grid";
import { Panel } from "../../../lib/components/Panel";
import { RootState } from "../../store";
import { usersSelectors } from "./reducer";
import { Chip, styled } from "@mui/material";
import { NameEditCell, RowActionCell, StatusEditCell } from "./Cells";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", minWidth: 300 },
  {
    field: "firstName",
    headerName: "First name",
    editable: true,
    renderEditCell: NameEditCell,
    flex: 1,
  },
  {
    field: "lastName",
    headerName: "Last name",
    editable: true,
    renderEditCell: NameEditCell,
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 200,
  },
  {
    field: "isActive",
    headerName: "Status",
    renderCell: (params: GridRenderCellParams) =>
      params.getValue(params.id, "isActive") ? (
        <Chip size="small" label="Active" color="primary" />
      ) : (
        <Chip size="small" label="Inactive" />
      ),
    editable: true,
    renderEditCell: StatusEditCell,
  },
  {
    field: "",
    disableClickEventBubbling: true,
    renderCell: RowActionCell,
  },
].map((v) => ({ ...v, sortable: false }));

const Table = styled(DataGrid)({
  "& .MuiDataGrid-main": { backgroundColor: "#fff" },
  "& .MuiDataGrid-footerContainer": { backgroundColor: "#fff" },
});

const UsersPage = () => {
  const { users } = useSelector((state: RootState) => ({
    users: usersSelectors.selectAll(state),
  }));
  return (
    <Panel title={"Users"}>
      <Table
        rows={users}
        columns={columns}
        autoHeight={true}
        editMode="row"
        disableColumnMenu={true}
        disableSelectionOnClick={true}
        onCellClick={(_: GridCellParams, event: MuiEvent<React.MouseEvent>) => {
          event.defaultMuiPrevented = true;
        }}
      />
    </Panel>
  );
};

export default UsersPage;
