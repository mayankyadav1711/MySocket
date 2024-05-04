import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

// Import the icon you want to use
import PersonIcon from '@mui/icons-material/Person';

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <div className="flex justify-center items-center h-screen">
      <Container
        component="main"
        maxWidth="lg"
        className="border-0 rounded-md overflow-hidden relative transform hover:scale-105 transition duration-300"
        sx={{
          height: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "50%",
          }}
          className="p-8 h-full flex flex-col justify-center"
        >
          <Typography variant="h5" className="mb-4 flex items-center">
            <PersonIcon fontSize="large" className="mr-2"/> Admin Login
          </Typography>
          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="Secret Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
              className="mb-4"
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              startIcon={<PersonIcon />} // Add the icon
            >
              Login
            </Button>
          </form>
        </Paper>

        
        <div
          className="w-1/2 bg-cover bg-center hidden md:block h-full"
          style={{
            backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/studymate-c44e8.appspot.com/o/13454492_5260430.svg?alt=media&token=722911d1-9511-4440-8c24-c374c19568e5')`, // Replace with your image URL
            // transform: 'scale(0.8)' // Removed the scale
          }}
        ></div>
      </Container>
    </div>
  );
};

export default AdminLogin;
