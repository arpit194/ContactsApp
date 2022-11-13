import React from "react";
import classes from "./Contact.module.css";
import { BsPersonFill } from "react-icons/bs";

const Contact = ({ contact, selectSection }) => {
  return (
    <div
      className={classes.contact}
      onClick={() => {
        selectSection("contactInfo", contact._id);
      }}
      key={contact._id}
    >
      <div className={classes.avatar}>
        <BsPersonFill />
      </div>
      <div className={classes.details}>
        <div
          className={classes.name}
        >{`${contact.firstName} ${contact.lastName}`}</div>
        <div className={classes.number}>{contact.number}</div>
      </div>
    </div>
  );
};

export default Contact;
