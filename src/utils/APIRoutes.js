export const host = "http://localhost:5000/";
// export const host = "https://ping-it-chat.herokuapp.com/";
export const registerRoute = host + "api/auth/register";
export const loginRoute = host + "api/auth/login";

export const addContactRoute = host + "api/contacts/addContact";
export const deleteContactRoute = host + "api/contacts/deleteContact";
export const getContactsRoute = host + "api/contacts/getContacts";
export const sendMessageRoute = host + "api/contacts/sendMessage";
export const getMessagesRoute = host + "api/contacts/getMessages";
