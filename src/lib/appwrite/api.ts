import { ID, Query } from "appwrite";

import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";

/**
 * The above function creates a new user account, generates an avatar URL, saves the user to the
 * database, and returns the newly created user.
 * @param {INewUser} user - The "user" parameter is an object of type INewUser, which contains the
 * following properties:
 * @returns the `newUser` object if the account creation and saving to the database are successful. If
 * there is an error, it will log the error to the console and return the error object.
 */
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name,
    );

    if(!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    })

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 * The function saves a user object to a database using the Appwrite API.
 * @param user - The `user` parameter is an object that contains the following properties:
 * @returns the newly created user object.
 */
export async function saveUserToDB(user:{
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user,
    )

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

/**
 * The function `signInAccount` is an asynchronous function that takes in a user object with email and
 * password properties, and attempts to create a session using the provided email and password.
 * @param user - The `user` parameter is an object that contains two properties: `email` and
 * `password`. The `email` property is a string that represents the user's email address, and the
 * `password` property is a string that represents the user's password.
 * @returns the session object.
 */
export async function signInAccount(user: {email:string, password: string}) {
  try {
    const session = await account.createEmailSession(
      user.email,
      user.password,
    );

    return session;
  } catch (error) {
    console.log(error);
  }
}

/**
 * The function `getCurrentUser` retrieves the current user's information from a database based on
 * their account ID.
 * @returns the current user document if it exists, otherwise it returns null.
 */
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}