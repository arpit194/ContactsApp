import React, { useState } from "react";
import classes from "./Login.module.css";
import { useRequest } from "../hooks/requestHook";
import { loginRoute } from "../utils/APIRoutes";
import { useSelector, useDispatch } from "react-redux";
import { BiLoaderAlt } from "react-icons/bi";
import { authActions } from "../store/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { loading, sendPostRequest } = useRequest();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (handleValidation() && !loading) {
      const { password, email } = values;
      const data = await sendPostRequest(loginRoute, {
        email,
        password,
      });

      if (!data.status) {
        toast.error(data.message, toastOptions);
      }
      if (data.status) {
        dispatch(authActions.login({ user: data.user, token: data.token }));
        navigate("/");
      }
    }
  };

  const testLogin = async () => {
    if (!loading) {
      const { password, email } = values;
      const data = await sendPostRequest(loginRoute, {
        email: "tester",
        password: "testing",
      });

      if (!data.status) {
        toast.error(data.message, toastOptions);
      }
      if (data.status) {
        dispatch(authActions.login({ user: data.user, token: data.token }));
        navigate("/");
      }
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // Handle input validation
  const handleValidation = () => {
    const { password, email } = values;
    if (email.length === 0) {
      toast.error("Email or username is required", toastOptions);
      return false;
    } else if (password.length < 7) {
      toast.error(
        "Password should be greater than 6 characters.",
        toastOptions
      );
      return false;
    }
    return true;
  };

  return (
    <div className={classes.container}>
      <div className={classes.loginForm}>
        <div className={classes.header}>LOGIN</div>
        <div className={classes.form}>
          <input
            className={classes.input}
            name="email"
            type="email"
            placeholder="Enter email or username"
            onChange={(ev) => handleChange(ev)}
          />
          <input
            className={classes.input}
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={(ev) => handleChange(ev)}
          />
          <div className={classes.buttons}>
            <div className={classes.button} onClick={handleSubmit}>
              {loading ? <BiLoaderAlt className={classes.rotate} /> : "Login"}
            </div>
            <div
              className={classes.button}
              title="Use this to test the application using the test user credentials"
              onClick={testLogin}
            >
              {loading ? <BiLoaderAlt className={classes.rotate} /> : "Test"}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
