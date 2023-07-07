import React, { createContext, ReactNode, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase/firebase-config";
import { sendEmailVerification } from "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

type AuthContextProviderProps = {
  children: ReactNode;
};

type UserCredential = any;

export const AuthContext = createContext<any>(null);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [newUserCredential, setNewUserCredential] =
    useState<UserCredential | null>(null);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const register = async (auth: any, email: any, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setNewUserCredential(user);
      sendSignInLinkToEmail(user);
    } catch (error: FirebaseError) {
      setRegistrationError(error.message);
    }
  };
  const sendSignInLinkToEmail = async (userCredentials: any) => {
    if (userCredentials) {
      try {
        await sendEmailVerification(userCredentials);
      } catch (error: any) {
        console.log("Error sending email verification:", error);
      }
    }
  };
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        newUserCredential,
        googleSignIn,
        registrationError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
