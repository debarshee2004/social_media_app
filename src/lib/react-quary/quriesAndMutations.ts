import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from "@tanstack/react-query"
import { createUserAccount, signInAccount } from "../appwrite/api"
import { INewUser } from "@/types"

/**
 * The function `useCreateUserAccount` is a custom hook that returns a mutation function for creating a
 * user account.
 * @returns The `useCreateUserAccount` function is returning the result of the `useMutation` hook.
 */
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

/**
 * The `useSignInAccount` function is a custom hook that returns a mutation function for signing in a
 * user account.
 * @returns The `useSignInAccount` function is returning the result of calling the `useMutation` hook.
 */
export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {email:string, password: string}) => signInAccount(user)
    })
}