import React, { createContext, ReactNode, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  getAuth,
  Auth,
  User,
} from "firebase/auth";
import { firebaseApp } from "../config/firebase/firebase-config";
import { sendEmailVerification } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";

type AuthContextProviderProps = {
  children: ReactNode;
};

type UserCredential = any;

export const AuthContext = createContext<any>(null);
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const auth: Auth = getAuth(firebaseApp);
  const [newUserCredential, setNewUserCredential] =
    useState<UserCredential | null>(null);

  const [existingUserCredential, setExistingUserCredential] =
    useState<User | null>(null);

  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userCredential");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setExistingUserCredential(user);
    }
  }, []);

  const register = async (email: string, password: string) => {
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

  const login = async (email: string, password: string) => {
    try {
      await setPersistence(auth, browserLocalPersistence); // Set persistence option
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setExistingUserCredential(user);
      sessionStorage.setItem("userCredential", JSON.stringify(user)); // Store user credentials
    } catch (error: any) {
      setLoginError(error.message);
    }
  };

  const logout = () => {
    setExistingUserCredential(null);
    sessionStorage.removeItem("userCredential"); // Remove stored user credentials
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
