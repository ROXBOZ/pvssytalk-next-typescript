import React, { createContext, ReactNode, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../config/firebase/firebase-config";
import { sendEmailVerification } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/router";

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

  const [existingUserCredential, setExistingUserCredential] =
    useState<UserCredential | null>(null);

  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

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
    } catch (error: any) {
      setRegistrationError(error.message);
    }
  };
  const sendSignInLinkToEmail = async (userCredentials: any) => {
    if (userCredentials) {
      try {
        await sendEmailVerification(userCredentials);
      } catch (error: any) {}
    }
  };
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  const login = async (email: any, password: any) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setExistingUserCredential(user);
    } catch (error: any) {
      setLoginError(error.message);
    }
  };
  const logout = () => {
    setExistingUserCredential(null);
    setTimeout(() => {
      router.push("/se-connecter");
    }, 1500);
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        newUserCredential,
        googleSignIn,
        registrationError,
        login,
        loginError,
        existingUserCredential,
        setExistingUserCredential,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
