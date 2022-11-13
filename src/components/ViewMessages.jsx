import React, { useEffect } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useRequest } from "../hooks/requestHook";
import { messageActions } from "../store/messageSlice";
import { getMessagesRoute } from "../utils/APIRoutes";
import Message from "./Message";
import classes from "./ViewMessages.module.css";

const ViewMessages = ({ window, contact }) => {
  const { messages, toId: currId } = useSelector((state) => state.message);
  const { loading, sendPostRequest } = useRequest();
  const dispatch = useDispatch();
  useEffect(() => {
    const getMessages = async () => {
      const messages = await sendPostRequest(getMessagesRoute, {
        toId: contact?._id,
      });
      dispatch(messageActions.setMessages(messages.messages));
    };
    if (messages.length === 0) {
      getMessages();
    } else if (contact?._id !== currId) {
      getMessages();
    }
  }, [contact]);
  return (
    <div
      className={`${classes.container} ${window === "view" && classes.reveal}`}
    >
      {loading && <BiLoaderAlt className={classes.loader} />}
      {!loading && (
        <div className={classes.messages}>
          <div className={classes.header}>Messages</div>
          {messages.map((message) => (
            <Message
              key={message._id}
              message={message}
              name={`${contact?.firstName} ${contact?.lastName}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewMessages;
