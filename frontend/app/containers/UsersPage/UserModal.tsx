import React, { ReactNode } from "react";
import {
  Box,
  Button,
  Container,
  Modal,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "../../schema";

const Wrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 600,
  backgroundColor: "#fff",
  border: "0",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
}));

const schema = yup.object({
  email: yup
    .string()
    .required("Required.")
    .email("Invalid email. Please check email format."),
  firstName: yup.string().required("Required."),
  lastName: yup.string().required("Required."),
});

type CommonProps = {
  open: boolean;
  handleClose: () => void;
};

const ModalInternal = ({
  open,
  handleClose,
  title,
  children,
}: CommonProps & {
  title: string;
  children: ReactNode;
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Wrapper>
        <Container>
          <Stack spacing={2}>
            <Typography component="h2" variant="h6">
              {title}
            </Typography>
            {children}
          </Stack>
        </Container>
      </Wrapper>
    </Modal>
  );
};

const SaveButton = ({ onClick }: { onClick: () => void }) => (
  <Button color="primary" variant="contained" size="large" onClick={onClick}>
    Save
  </Button>
);

type Inputs = Omit<User, "id" | "isActive"> & { id?: string };
export const UserNewModal = ({
  onSubmit,
  ...modalProps
}: CommonProps & {
  onSubmit: (v: Inputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  return (
    <ModalInternal {...modalProps} title="Create New User">
      <TextField label="ID" {...register("id")} />
      <TextField
        required
        label="Email"
        type="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
      />
      <TextField
        required
        label="First Name"
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        {...register("firstName")}
      />
      <TextField
        required
        label="Last Name"
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        {...register("lastName")}
      />
      <SaveButton onClick={handleSubmit(onSubmit)} />
    </ModalInternal>
  );
};

type EditModalInputs = Omit<User, "id" | "isActive">;
export const UserEditModal = ({
  user,
  onSubmit,
  ...modalProps
}: CommonProps & {
  user: User;
  onSubmit: (v: EditModalInputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditModalInputs>({ resolver: yupResolver(schema) });

  return (
    <ModalInternal {...modalProps} title="Edit User">
      <TextField defaultValue={user.id} disabled={true} label="ID" />
      <TextField
        defaultValue={user.email}
        required
        label="Email"
        type="email"
        {...register("email")}
      />
      <TextField
        defaultValue={user.firstName}
        required
        label="First Name"
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        {...register("firstName")}
      />
      <TextField
        defaultValue={user.lastName}
        required
        label="Last Name"
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        {...register("lastName")}
      />
      <SaveButton onClick={handleSubmit(onSubmit)} />
    </ModalInternal>
  );
};
