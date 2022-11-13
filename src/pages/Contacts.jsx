import React, { useEffect, useMemo, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "../components/Contact";
import ContactInfo from "../components/ContactInfo";
import { useRequest } from "../hooks/requestHook";
import { contactsActions } from "../store/contactsSlice";
import { deleteContactRoute, getContactsRoute } from "../utils/APIRoutes";
import classes from "./Contacts.module.css";

const Contacts = () => {
  const [section, setSection] = useState("contacts");
  const { loading, sendPostRequest, sendGetRequest } = useRequest();
  const contacts = useSelector((state) => state.contacts.contacts);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();

  const selectedContact = contacts.find(
    (contact) => contact._id === selectedId
  );

  useEffect(() => {
    const getContacts = async () => {
      const contacts = await sendGetRequest(getContactsRoute);
      dispatch(contactsActions.setContacts(contacts.contacts));
    };
    if (contacts.length === 0) {
      getContacts();
    }
  }, []);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const selectSection = (section, data) => {
    if (section === "contactInfo") {
      setSection(section);
      setSelectedId(data);
    } else if (section === "contacts") {
      setSection(section);
      setSelectedId(null);
    }
  };

  const deleteContact = async (id) => {
    const data = await sendPostRequest(deleteContactRoute, { id: id });
    if (data.status) {
      dispatch(contactsActions.removeContact(id));
    } else {
      toast.error(
        "Password should be greater than 6 characters.",
        toastOptions
      );
    }
  };

  return (
    <div className={classes.container}>
      {loading && <BiLoaderAlt className={classes.loader} />}
      {!loading && (
        <div
          className={`${classes.contacts} ${
            section !== "contacts" && classes.hide
          }`}
        >
          <div className={classes.header}>Contacts</div>
          {contacts.map((contact) => (
            <Contact contact={contact} selectSection={selectSection} />
          ))}
        </div>
      )}
      {!loading && (
        <ContactInfo
          contact={selectedContact}
          selectSection={selectSection}
          section={section}
          deleteContact={deleteContact}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Contacts;
