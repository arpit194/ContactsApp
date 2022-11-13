import React, { useRef, useState } from "react";
import { useRequest } from "../hooks/requestHook";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendMessageRoute } from "../utils/APIRoutes";
import classes from "./SendMessage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "../store/messageSlice";

const SendMessage = ({ window, contact, selectWindow }) => {
  const [otp, setOtp] = useState(Math.floor(100000 + Math.random() * 900000));
  const sender = useSelector((state) => state.auth.user.name);
  const { loading, sendPostRequest } = useRequest();
  const messageRef = useRef();
  const dispatch = useDispatch();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async () => {
    if (!loading) {
      const data = await sendPostRequest(sendMessageRoute, {
        message: messageRef.current.value,
        sender: sender,
        toId: contact?._id,
        number: contact?.number,
        otp: otp,
      });

      if (!data.status) {
        toast.error(data.message, toastOptions);
      }
      if (data.status) {
        toast.success(data.message, toastOptions);
        dispatch(messageActions.addMessage(data.newMessage));
        selectWindow("send");
      }
    }
  };

  return (
    <>
      <div
        className={`${classes.container} ${
          window === "send" && classes.reveal
        }`}
      >
        <textarea
          className={classes.message}
          ref={messageRef}
          value={`Hi ${contact?.firstName}, Your OTP is: ${otp}`}
          onChange={() => {}}
        ></textarea>
        <div className={classes.buttons}>
          <div className={classes.button} onClick={handleSubmit}>
            {loading ? "Sending..." : "Send"}
          </div>
          <div
            className={classes.button}
            onClick={() => {
              if (!loading) {
                setOtp(Math.floor(100000 + Math.random() * 900000));
              }
            }}
          >
            New OTP
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SendMessage;
