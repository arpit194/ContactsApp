import React, { useState } from "react";
import classes from "./AddContact.module.css";
import { BiLoaderAlt } from "react-icons/bi";
import { useRequest } from "../hooks/requestHook";
import { addContactRoute } from "../utils/APIRoutes";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { contactsActions } from "../store/contactsSlice";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const [values, setValues] = useState({
    name: "",
    number: "",
  });
  const { loading, sendPostRequest } = useRequest();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (handleValidation() && !loading) {
      const { firstName, lastName, number } = values;
      const data = await sendPostRequest(addContactRoute, {
        firstName,
        lastName,
        number,
      });

      if (!data.status) {
        toast.error(data.message, toastOptions);
      }
      if (data.status) {
        toast.success(firstName + " added as contact.", toastOptions);
        setValues({ firstName: "", lastName: "", number: "" });
        dispatch(contactsActions.addContact(data.contact));
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
    const { firstName, lastName, number } = values;
    if (firstName.length < 1 || lastName.length < 1) {
      toast.error("Name should have atleast 1 character", toastOptions);
      return false;
    } else if (number.length < 10) {
      toast.error("Number should have 10 digits", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <div className={classes.container}>
      <div className={classes.loginForm}>
        <div className={classes.header}>Add Contact</div>
        <div className={classes.form}>
          <input
            className={classes.input}
            name="firstName"
            type="firstName"
            value={values.firstName}
            placeholder="Enter contact's first name"
            onChange={(ev) => handleChange(ev)}
          />
          <input
            className={classes.input}
            name="lastName"
            type="lastName"
            value={values.lastName}
            placeholder="Enter contact's last name"
            onChange={(ev) => handleChange(ev)}
          />
          <input
            className={classes.input}
            name="number"
            type="number"
            value={values.number}
            placeholder="Enter contact's number"
            onChange={(ev) => handleChange(ev)}
          />
          <div className={classes.button} onClick={handleSubmit}>
            {loading ? <BiLoaderAlt className={classes.rotate} /> : "Add"}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddContact;
