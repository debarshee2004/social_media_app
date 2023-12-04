/**
 * The `AuthContext` module manages the user authentication state and provides a context for
 * components to access and update authentication-related information.
 *
 * @module AuthContext
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/appwrite/api";
import { IUser } from "@/types";

/**
 * The initial user object with default values.
 *
 * @constant
 * @type {IUser}
 */
export const INITIAL_USER: IUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

/**
 * The initial state of the authentication context.
 *
 * @constant
 * @type {IContextType}
 */
const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

/**
 * The authentication context created using the `createContext` function from React.
 *
 * @constant
 * @type {React.Context<IContextType>}
 */
const AuthContext = createContext<IContextType>(INITIAL_STATE);

/**
 * The `AuthProvider` component is responsible for managing the authentication state.
 * It provides the authentication context to its children components.
 *
 * @component
 * @param {Object} children - The child components that will have access to the authentication context.
 * @returns {JSX.Element} - Returns JSX representing the component.
 */
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // State variables for user, loading state, and authentication status
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Function to check if the user is authenticated by fetching the current user from the server.
   *
   * @async
   * @function
   * @returns {Promise<boolean>} - Returns a promise indicating whether the user is authenticated or not.
   */
  const checkAuthUser = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Attempt to fetch the current user from the server
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        // If a user is returned, update the state with user details
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);

        return true;
      }

      // If no user is returned, indicate that the user is not authenticated
      return false;
    } catch (error) {
      // Handle errors, log to the console, and indicate that the user is not authenticated
      console.error(error);
      return false;
    } finally {
      // Set loading state to false after the operation is complete
      setIsLoading(false);
    }
  };

  // Access the navigation function from the react-router-dom
  const navigate = useNavigate();

  /**
   * The `useEffect` hook to run initial checks when the component mounts.
   */
  useEffect(() => {
    // Check for a cookie fallback and redirect to sign-in if not present
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/sign-in");
    }

    // Check authentication status on component mount
    checkAuthUser();
  }, []);

  /**
   * An object with values and functions to be provided to consumers of the context.
   *
   * @constant
   * @type {IContextType}
   */
  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  // Provide the context value to the children components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * The `AuthContext` provider component as the default export.
 */
export default AuthProvider;

/**
 * A custom hook for consuming the `AuthContext` in functional components.
 *
 * @function
 * @returns {IContextType} - Returns the authentication context values and functions.
 */
export const useUserContext = () => useContext(AuthContext);
