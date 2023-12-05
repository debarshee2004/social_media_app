// Imports
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
//
import { INewUser } from "@/types";
//
import { createUserAccount, signInAccount, signOutAccount } from "../appwrite/api";

/**
 * Custom hook for creating a new user account using the `useMutation` hook from React Query.
 *
 * @returns {Object} - Returns an object with the mutation function and its status.
 */
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

/**
 * Custom hook for signing in a user using the `useMutation` hook from React Query.
 *
 * @returns {Object} - Returns an object with the mutation function and its status.
 */
export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

/**
 * Custom hook for signing out a user using the `useMutation` hook from React Query.
 *
 * @returns {Object} - Returns an object with the mutation function and its status.
 */
export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};