import { ID } from "appwrite";

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