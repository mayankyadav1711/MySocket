import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "white",
      }}
    >
      <Container
        component={"main"}
        maxWidth="lg" // Increase max width for better spacing
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%", // Ensure full width of container
              marginBottom: 4, // Add margin bottom for spacing
            }}
          >
            {/* Left half for form */}
            <Box sx={{ width: "50%", paddingRight: "10px" }}>
              {" "}
              {/* Added padding to the right */}
              {isLogin ? (
                <>
                  {/* Logo */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    {/* Logo */}
                    <img
                      src="https://i.ibb.co/r6TN6P0/removal-ai-45fccdd3-b23f-4238-8626-0cfb29c09e6b-png-clipart-computer-icons-graphics-whatsapp-whatsap.png"
                      alt="Logo"
                      width="75px" // Adjust width as needed
                      style={{ marginRight: "10px" }} // Add margin to the right for spacing
                    />

                    {/* Website Name */}
                    <Typography variant="h4" fontWeight="bold">
               Login
                    </Typography>
                  </Box>

                
                  <form
                    style={{
                      width: "100%",
                      marginTop: "1rem",
                    }}
                    onSubmit={handleLogin}
                  >
                    <Stack spacing={2}>
                      <TextField
                        required
                        fullWidth
                        label="Username"
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircleIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={username.value}
                        onChange={username.changeHandler}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={password.value}
                        onChange={password.changeHandler}
                      />
                    </Stack>

                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={2}
                    >
                      {" "}
                      {/* Add margin top */}
                      <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label="Remember me"
                      />
                      <Link href="/forgot" variant="body2">
                        Forgot password?
                      </Link>
                    </Box>

                    <Button
  sx={{
    marginTop: "1rem",
    padding: '10px 20px', // Adjust padding as needed
    backgroundColor: "#075bd9",
    color: '#fff', // Text color
    fontWeight: 'bold', // Bold font
    borderRadius: '8px', // Border radius
    transition: 'background-color 0.3s ease', // Smooth transition on hover
    "&:hover": {
      backgroundColor: "#064dbd",
    },
  }}
  variant="contained"
  type="submit"
  fullWidth
  disabled={isLoading}
>
  Log In
</Button>


                    <Typography textAlign="center" mt={2}>
                      OR
                    </Typography>

                    <Button
                      disabled={isLoading}
                      fullWidth
                      variant="text"
                      onClick={toggleLogin}
                    >
                      Don't have an account? Sign up
                    </Button>
                  </form>
                </>
              ) : (
                <>
                <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    {/* Logo */}
                    <img
                      src="https://i.ibb.co/r6TN6P0/removal-ai-45fccdd3-b23f-4238-8626-0cfb29c09e6b-png-clipart-computer-icons-graphics-whatsapp-whatsap.png"
                      alt="Logo"
                      width="75px" // Adjust width as needed
                      style={{ marginRight: "10px" }} // Add margin to the right for spacing
                    />

                    {/* Website Name */}
                    <Typography variant="h4" fontWeight="bold">
               Sign Up
                    </Typography>
                  </Box>

                  <form
                    style={{ width: "100%", marginTop: "1rem" }}
                    onSubmit={handleSignUp}
                  >
                    <Stack spacing={2}>
                      {/* Avatar input */}
                      <Stack
                        position={"relative"}
                        width={"8rem"} // Decreased size
                        height={"8rem"} // Decreased size
                        margin={"auto"}
                        display={"flex"} // Use flexbox
                        alignItems={"center"} // Align items vertically
                        justifyContent={"center"} // Center content horizontally
                      >
                        <Avatar
                          sx={{
                            width: "100%", // Take up full width of stack
                            height: "100%", // Take up full height of stack
                            objectFit: "contain",
                          }}
                          src={avatar.preview}
                        />

                        {/* Avatar upload button */}
                        <IconButton
                          sx={{
                            position: "absolute",
                            bottom: "0",
                            right: "0",
                            color: "white",
                            bgcolor: "rgba(0,0,0,0.5)",
                            ":hover": {
                              bgcolor: "rgba(0,0,0,0.7)",
                            },
                          }}
                          component="label"
                        >
                          <>
                            <CameraAltIcon />
                            <VisuallyHiddenInput
                              type="file"
                              onChange={avatar.changeHandler}
                            />
                          </>
                        </IconButton>
                      </Stack>

                      {avatar.error && (
                        <Typography
                          m={"1rem auto"}
                          width={"fit-content"}
                          display={"block"}
                          color="error"
                          variant="caption"
                        >
                          {avatar.error}
                        </Typography>
                      )}
                      {/* Other text fields with icons */}
                      <TextField
                        required
                        fullWidth
                        label="Name"
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={name.value}
                        onChange={name.changeHandler}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Bio"
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <DescriptionIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={bio.value}
                        onChange={bio.changeHandler}
                      />
                      <TextField
                        required
                        fullWidth
                        label="Username"
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircleIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={username.value}
                        onChange={username.changeHandler}
                      />
                      {username.error && (
                        <Typography color="error" variant="caption">
                          {username.error}
                        </Typography>
                      )}
                      <TextField
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={password.value}
                        onChange={password.changeHandler}
                      />
                    </Stack>

                    {/* Submit button and other options */}
                    <Button
                      sx={{ marginTop: "1rem" }}
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      disabled={isLoading}
                    >
                      Sign Up
                    </Button>
                    <Typography textAlign={"center"} m={"1rem"}>
                      OR
                    </Typography>
                    <Button
                      disabled={isLoading}
                      fullWidth
                      variant="text"
                      onClick={toggleLogin}
                    >
                      Login Instead
                    </Button>
                  </form>
                </>
              )}
            </Box>

            {/* Right half for image */}
            <Box
              sx={{
                width: "50%", // Right half width
                paddingLeft: "10px", // Added padding to the left
                display: { xs: "none", sm: "block" }, // Hide on small devices
              }}
            >
              {/* Image */}
              <img
                src="https://img.freepik.com/free-vector/conversation-concept-illustration_114360-1305.jpg?t=st=1714817710~exp=1714821310~hmac=812f093dd2dd96253d4b67f329c7b68de3ea93d36a7c13ffc47cb55f231c0bd9&w=740"
                alt="Login Image"
                width="100%"
              />
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
