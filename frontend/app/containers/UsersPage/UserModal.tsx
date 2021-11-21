import React from "react";
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
import {
  // SubmitHandler,
  useForm,
} from "react-hook-form";
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

type Inputs = {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
};

type Props = {
  open: boolean;
  handleClose: () => void;
  onSubmit: (v: Omit<User, "id" | "isActive"> & { id?: string }) => void;
};
export const UserModal = ({ open, handleClose, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  // const onSubmitInternal: SubmitHandler<Inputs> = (data) => {
  //   console.log(data);
  //   onSubmit(data);
  // };

  return (
    <Modal open={open} onClose={handleClose}>
      <Wrapper>
        <Container>
          <Stack spacing={2}>
            <Typography component="h2" variant="h6">
              Create New User
            </Typography>
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
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </Stack>
        </Container>
      </Wrapper>
    </Modal>
  );
};
