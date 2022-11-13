import React, { useState } from "react";
import { BiMessageAdd } from "react-icons/bi";
import { BsFillXCircleFill, BsTrashFill, BsPersonFill } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";
import classes from "./ContactInfo.module.css";
import SendMessage from "./SendMessage";
import ViewMessages from "./ViewMessages";

const ContactInfo = ({ contact, selectSection, deleteContact, section }) => {
  const [window, setWindow] = useState("send");

  const selectWindow = (wind) => {
    if (wind === "send") {
      if (window === "send") {
        setWindow(null);
      } else {
        setWindow(wind);
      }
    } else if (wind === "view") {
      if (window === "view") {
        setWindow(null);
      } else {
        setWindow(wind);
      }
    }
  };

  return (
    <div
      className={`${classes.container} ${
        section === "contactInfo" && classes.show
      }`}
    >
      <div
        className={classes.close}
        onClick={() => {
          selectSection("contacts");
        }}
      >
        <BsFillXCircleFill />
      </div>
      <div className={classes.avatar}>
        <BsPersonFill />
      </div>
      <div className={classes.details}>
        <div
          className={classes.name}
        >{`${contact?.firstName} ${contact?.lastName}`}</div>
        <div className={classes.number}>{contact?.number}</div>
      </div>
      <div className={classes.actions}>
        <div className={classes.action}>
          <BiMessageAdd
            className={classes.button}
            onClick={() => {
              selectWindow("send");
            }}
          />
          New Message
        </div>
        <div className={classes.action}>
          <FaEnvelope
            className={classes.button}
            onClick={() => {
              selectWindow("view");
            }}
          />
          View Messages
        </div>
        <div
          className={classes.action}
          onClick={() => {
            deleteContact(contact?._id);
            selectSection("contacts");
          }}
        >
          <BsTrashFill className={classes.button} />
          Delete Contact
        </div>
      </div>
      <SendMessage
        window={window}
        selectWindow={selectWindow}
        contact={contact}
      />
      <ViewMessages window={window} contact={contact} />
    </div>
  );
};

export default ContactInfo;
