import { useEffect } from "react";
import { auth } from "@/app/firebase/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

useEffect(() => {
 if (isSignInWithEmailLink(auth, window.location.href)) {
  let email = window.localStorage.getItem("emailForSignIn");
  if (!email) {
   email = window.prompt("Please provide your email for confirmation");
  }

  signInWithEmailLink(auth, email, window.location.href)
   .then((result) => {
    console.log("Successfully signed in with email link!");
    window.localStorage.removeItem("emailForSignIn");
   })
   .catch((error) => {
    console.error("Error signing in with email link:", error);
   });
 }
}, []);
