import React, { useState } from "react";
import classes from "./Login.module.css";
import { registerRoute } from "../utils/APIRoutes";
import { useSelector } from "react-redux";
import { useRequest } from "../hooks/requestHook";
import { ToastContainer, toast } from "react-toastify";
import { BiLoaderAlt } from "react-icons/bi";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const token = useSelector((state) => state.auth.token);
  const { loading, sendPostRequest } = useRequest();

  const [values, setValues] = useState({
    userName: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // Handle Input change
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (handleValidation() && !loading) {
      const { password, email, name, userName } = values;
      const data = await sendPostRequest(registerRoute, {
        userName,
        name,
        email,
        password,
      });

      if (!data.status) {
        toast.error(data.message, toastOptions);
      }
      if (data.status) {
        toast.success("Account created for " + data.user.userName, {
          ...toastOptions,
          autoClose: 2000,
        });
        localStorage.setItem("contacts-user", JSON.stringify(data.user));
        localStorage.setItem("contacts-token", JSON.stringify(data.token));
      }
    }
  };

  // Validation of inputs
  const handleValidation = () => {
    const { password, confirmPassword, email, name, userName } = values;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", toastOptions);
      return false;
    } else if (userName.length < 4 || userName.length > 10) {
      toast.error(
        "User name should be greater than 4 characters and less than 10 characters.",
        toastOptions
      );
      return false;
    } else if (!userName.match(/^[A-Za-z0-9]+$/)) {
      toast.error(
        "User name can only contain letters and numbers",
        toastOptions
      );
      return false;
    } else if (name.length < 5) {
      toast.error("Name should be greater than 4 characters.", toastOptions);
      return false;
    } else if (password.length < 7) {
      toast.error(
        "Password should be greater than 6 characters.",
        toastOptions
      );
      return false;
    } else if (!email.includes("@") || !email.includes(".")) {
      toast.error("Enter email in correct format.", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <div className={classes.container}>
      <div className={classes.loginForm}>
        <div className={classes.header}>SIGN UP</div>
        <div className={classes.form}>
          <input
            className={classes.input}
            name="userName"
            type="text"
            placeholder="Enter User Name"
            onChange={(ev) => handleChange(ev)}
          />
          <input
            className={classes.input}
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={(ev) => handleChange(ev)}
          />
          <input
            className={classes.input}
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={(ev) => handleChange(ev)}
          />
          <input
            className={classes.input}
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={(ev) => handleChange(ev)}
          />
          <input
            className={classes.input}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={(ev) => handleChange(ev)}
          />
          <div className={classes.buttons}>
            <div className={classes.button} onClick={handleSubmit}>
              {loading ? <BiLoaderAlt className={classes.rotate} /> : "Sign Up"}
            </div>
            <div
              className={classes.button}
              title="Use this to test the application using the test user credentials"
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

export default Register;
