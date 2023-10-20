// import { useEffect, useState } from "react";
import { useContext } from "react";
// import jwt_decode from "jwt-decode";
import { UserContext } from "../../contexts/user.context";

const SignUpGoogle = () => {
  // import context UserContext and state currentUser
  const { currentUser } = useContext(UserContext);
  // const [user, setUser] = useState([]);

  // const handleCallbackResponse = (r) => {
  //   console.log("Encoded JWT ID token: " + r.credential);
  //   // to decode google user object from token to readable json
  //   const userObject = jwt_decode(r.credential);
  //   console.log(userObject);
  //   // once logged in, set user to logged in user
  //   setUser(userObject);
  //   document.getElementById("sign-up-google").hidden = true;
  // };

  // const handleSignOut = (e) => {
  //   setUser({});
  //   document.getElementById("sign-up-google").hidden = false;
  // };

  // useEffect(() => {
  //   /* global google */
  //   // google object from script CDN
  //   google.accounts.id.initialize({
  //     client_id:
  //       "39650006073-2krmk3vkmevjck8chahmgr0q01hobnd2.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });

  //   google.accounts.id.renderButton(document.getElementById("sign-up-google"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  // }, []);

  return (
    <div>
      <div id="sign-up-google"></div>

      {/* {
        // isnt empty meaning we want to show sign out button, we have full user attributes = user is logged in
        Object.keys(user).length != 0 && (
          <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
        )
      }

      {user && (
        <div>
          <img src={user.picture} />
          <h3>{user.name}</h3>
        </div>
      )} */}
    </div>
  );
};

export default SignUpGoogle;
