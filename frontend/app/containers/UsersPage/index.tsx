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
import { usersReducerActions, usersSelectors } from "./slice";
import { Button, Chip, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { UserEditModal, UserNewModal } from "./UserModal";
import { usersSagaActionCreator } from "./saga";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", minWidth: 300 },
  {
    field: "firstName",
    headerName: "First name",
    flex: 1,
  },
  {
    field: "lastName",
    headerName: "Last name",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
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
  },
].map((v) => ({ ...v, sortable: false }));

const Table = styled(DataGrid)({
  "& .MuiDataGrid-main": { backgroundColor: "#fff" },
  "& .MuiDataGrid-overlay": { height: "100px !important" }, // "no rows" position
  "& .MuiDataGrid-footerContainer": { backgroundColor: "#fff" },
});

const UsersPage = () => {
  const { users, openModal, selectedUser } = useSelector(
    (state: RootState) => ({
      users: usersSelectors.selectAll(state),
      openModal: state.users.openModal,
      selectedUser: state.users.selectedId
        ? usersSelectors.selectById(state, state.users.selectedId)
        : undefined,
    })
  );

  const dispatch = useDispatch();
  const handleClose = () => dispatch(usersReducerActions.closeModal());

  return (
    <Panel
      title={"Users"}
      actions={[
        <Button
          key={0}
          startIcon={<AddIcon />}
          onClick={() => dispatch(usersSagaActionCreator.onOpenNewModal())}
        >
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
        onRowClick={({ id }, ..._) =>
          dispatch(
            usersSagaActionCreator.onOpenEditModal({ userId: id.toString() })
          )
        }
      />
      {selectedUser ? (
        <UserEditModal
          open={openModal}
          user={selectedUser}
          handleClose={handleClose}
          onSubmit={(v) => dispatch(usersSagaActionCreator.onSaveEdit(v))}
        />
      ) : (
        <UserNewModal
          open={openModal}
          handleClose={handleClose}
          onSubmit={(v) => dispatch(usersSagaActionCreator.onSaveNew(v))}
        />
      )}
    </Panel>
  );
};

export default UsersPage;
