import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  MuiEvent,
} from "@mui/x-data-grid";
import { Panel } from "../../../lib/components/Panel";
import { RootState } from "../../store";
import { usersSelectors } from "./slice";
import { Button, Chip, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NameEditCell, RowActionCell, StatusEditCell } from "./Cells";
import { UserModal } from "./UserModal";
import { usersSagaActionCreator } from "./saga";

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
  "& .MuiDataGrid-overlay": { height: "100px !important" }, // "no rows" position
  "& .MuiDataGrid-footerContainer": { backgroundColor: "#fff" },
});

const UsersPage = () => {
  const { users, openUserModal } = useSelector((state: RootState) => ({
    users: usersSelectors.selectAll(state),
    openUserModal: state.users.openUserModal,
  }));

  const dispatch = useDispatch();
  const handleOpen = () => dispatch(usersSagaActionCreator.onOpenUserModal());
  const handleClose = () => dispatch(usersSagaActionCreator.onOpenUserModal());

  return (
    <Panel
      title={"Users"}
      actions={[
        <Button key={0} startIcon={<AddIcon />} onClick={handleOpen}>
          Add
        </Button>,
      ]}
    >
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
        onRowClick={() => console.log("click row")}
      />
      <UserModal
        open={openUserModal}
        handleClose={handleClose}
        onSubmit={(v) => dispatch(usersSagaActionCreator.onClickSubmit(v))}
      />
    </Panel>
  );
};

export default UsersPage;
