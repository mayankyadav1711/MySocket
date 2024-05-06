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
    <div style={{ 
      backgroundImage: 'url("https://i.ibb.co/7GK6Gnr/gi-Dck-OUM5a.png")',
      backgroundColor: "rgb(240, 235, 228)"
    }}>
      <Container
        component={"main"}
        maxWidth="lg"
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
              width: "100%",
              marginBottom: 4,
            }}
          >
            <Box
              sx={{ width: { xs: "100%", sm: "50%" }, paddingRight: "10px" }}
            >
              {isLogin ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                      textAlign:"center",
                
                    }}
                  >
                    <img
                      src="https://i.ibb.co/3v9LyRM/bgicon-voicecall-2x-d973443.png"
                      alt="Logo"
                      width="75px"
                      style={{ marginRight: "10px" }}
                    />
                    <Typography variant="h4" fontWeight="bold">
                      Login
                    </Typography>
                  </Box>
                  <form
                    style={{
                      width: "100%",
                      marginTop: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    onSubmit={handleLogin}
                  >
                    <Stack
                      position={"relative"}
                      width={"8rem"}
                      height={"8rem"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      marginBottom={"1rem"}
                    >
                      <Avatar
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        src="https://res.cloudinary.com/dzxhn37ae/image/upload/v1714806657/3f23b586-6630-4042-a810-52877b406d0f.jpg"
                      />
                    </Stack>
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
                    {/* <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={2}
                    >
                      <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label="Remember me"
                      />
                      <Link href="/forgot" variant="body2">
                        Forgot password?
                      </Link>
                    </Box> */}
                    <div className="mb-4"></div>
                    <button
                      className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-blue-700 hover:bg-blue-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                      type="submit"
                      disabled={isLoading}
                    >
                      <svg
                        class="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3 text-white">Login</span>
                    </button>
                    <Typography textAlign="center" m={"1rem"}>
                    <span className="font-bold">OR</span>
                    </Typography>
                    <button
                      disabled={isLoading}
                      fullWidth
                      variant="text"
                      onClick={toggleLogin}
                      class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                    >
                      <span class="ml-4">Don't have an account? Sign Up</span>
                    </button>
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
                    <img
                      src="https://i.ibb.co/3v9LyRM/bgicon-voicecall-2x-d973443.png"
                      alt="Logo"
                      width="75px"
                      style={{ marginRight: "10px" }}
                    />
                    <Typography variant="h4" fontWeight="bold">
                      Sign Up
                    </Typography>
                  </Box>
                  <form
                    style={{
                      width: "100%",
                      marginTop: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    onSubmit={handleSignUp}
                  >
                    <Stack
                      position={"relative"}
                      width={"8rem"}
                      height={"8rem"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      marginBottom={"1rem"}
                    >
                      <Avatar
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        src={avatar.preview}
                      />
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
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ marginBottom: "1rem" }}
                    >
                      <TextField
                        required
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
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ marginBottom: "1rem" }}
                    >
                      <TextField
                        required
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

                    <button
                      className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-blue-700 hover:bg-blue-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                      type="submit"
                      disabled={isLoading}
                    >
                      <svg
                        class="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3 text-white">Sign up</span>
                    </button>
                    <Typography textAlign="center" m={"1rem"} >
                     <span className="font-bold">OR</span>
                    </Typography>
                    {/* <Button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                      Login Instead
                    </Button> */}

                    <button
                      disabled={isLoading}
                      fullWidth
                      variant="text"
                      onClick={toggleLogin}
                      class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                    >
                      <span class="ml-4">Login Instead</span>
                    </button>
                  </form>
                </>
              )}
            </Box>
            <Box
              sx={{
                width: { xs: "0%", sm: "50%" },
                paddingLeft: "10px",
                display: { xs: "none", sm: "block" },
              }}
            >
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
