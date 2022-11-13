import React from "react";
import { Link } from "react-router-dom";
import classes from "./index.module.css";

const index = () => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.message}>All your contacts in one place</div>
        <Link className={classes.actionButton} to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default index;
