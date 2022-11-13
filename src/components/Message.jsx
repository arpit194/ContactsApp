import React from "react";
import classes from "./Message.module.css";

const Message = ({ message, name, key }) => {
  return (
    <div className={classes.message} key={key}>
      <div className={classes.details}>
        <div className={classes.name}>To: {name}</div>
        <div className={classes.date}>{message.date}</div>
      </div>
      <div className={classes.controls}>
        <div>OTP: {message.otp}</div>
      </div>
    </div>
  );
};

export default Message;
