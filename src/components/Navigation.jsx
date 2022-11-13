import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";
import classes from "./Navigation.module.css";

const Navigation = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <nav className={classes.container}>
      <div className={classes.brand}>
        <div className={classes.logo}>C</div>
      </div>
      <div className={classes.navLinks}>
        {!token && (
          <>
            <Link className={classes.navLink} to="/">
              Home
            </Link>
            <Link className={classes.navLink} to="/login">
              Login
            </Link>
            <Link className={classes.navLink} to="/register">
              Register
            </Link>
          </>
        )}
        {token && (
          <>
            <Link className={classes.navLink} to="/">
              Contacts
            </Link>
            <Link className={classes.navLink} to="/addContact">
              Add Contact
            </Link>
            <div className={classes.navLink} onClick={logout}>
              Logout
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
