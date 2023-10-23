import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

// initiate actual context storage for the state, set state default value
// name state currentUser instead of user because user is a common reserved word so avoid using it
export const UserContext = createContext({
  currentUser: [],
  setCurrentUser: () => null,
});

// provider = component = wrap around app.js
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);
  const value = { currentUser, setCurrentUser };

  // define useEffect callback function:
  const handleCallbackResponse = (r) => {
    // view access token provided by google
    console.log("Encoded JWT ID token: " + r.credential);
    // to decode google user object from token to readable json
    const currentUserObject = jwt_decode(r.credential);
    console.log(currentUserObject);
    // once logged in, set currentUser to logged in currentUser
    setCurrentUser(currentUserObject);
    // document.getElementById("sign-up-google").hidden = true;
  };

  // to get user object from google access token
  useEffect(() => {
    /* global google */
    // google is an object from google script CDN in index.html
    // initialize api client
    google.accounts.id.initialize({
      client_id:
        "39650006073-2krmk3vkmevjck8chahmgr0q01hobnd2.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    // show sign in button
    google.accounts.id.renderButton(document.getElementById("sign-up-google"), {
      theme: "outline",
      type: "icon",
      shape: "pill",
      size: "large",
    });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
