import React from "react";
import {
  GridRenderCellParams,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import { FormControlLabel, IconButton, Switch, TextField } from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

export const RowActionCell = (props: GridRenderCellParams) => {
  const { api, id } = props;
  const isEditMode = api.getRowMode(id) === "edit";

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    api.setRowMode(id, "edit");
  };

  const handleSaveClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    api.commitRowChange(id);
    api.setRowMode(id, "view");

    const row = api.getRow(id);
    api.updateRows([{ ...row, isNew: false }]);
  };

  const handleCancelClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    api.setRowMode(id, "view");

    const row = api.getRow(id);
    if (row.isNew) {
      api.updateRows([{ id, _action: "delete" }]);
    }
  };

  if (isEditMode) {
    return (
      <>
        <IconButton
          color="primary"
          size="small"
          aria-label="save"
          onClick={handleSaveClick}
        >
          <SaveIcon fontSize="small" />
        </IconButton>
        <IconButton
          color="inherit"
          size="small"
          aria-label="cancel"
          onClick={handleCancelClick}
        >
          <CancelIcon fontSize="small" />
        </IconButton>
      </>
    );
  }

  return (
    <IconButton
      color="inherit"
      size="small"
      aria-label="edit"
      onClick={handleEditClick}
    >
      <EditIcon fontSize="small" />
    </IconButton>
  );
};

export const StatusEditCell = ({
  id,
  value,
  api,
  field,
}: GridRenderEditCellParams) => (
  <FormControlLabel
    control={<Switch defaultChecked={!!value} />}
    label={value ? "Active" : "Inactive"}
    onChange={(event: React.SyntheticEvent, checked: boolean) => {
      api.setEditCellValue({ id, field, value: checked }, event);
    }}
  />
);

export const NameEditCell = ({
  id,
  api,
  value,
  field,
}: GridRenderEditCellParams) => (
  <TextField
    sx={{ margin: "auto 0" }}
    variant="standard"
    value={value}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      api.setEditCellValue({ id, field, value: e.target.value }, e);
    }}
  />
);
