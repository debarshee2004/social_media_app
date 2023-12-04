// Imports
import { ID, Query } from "appwrite";
// 
import { INewUser } from "@/types";
// 
import { account, appwriteConfig, avatars, databases } from "./config";

/**
 * Creates a new user account by invoking the Appwrite `account.create` method and saving
 * the user details to the Appwrite database.
 *
 * @async
 * @function
 * @param {INewUser} user - The user details required for account creation.
 * @returns {Object | Error} - Returns the newly created user object or an error object.
 */
export async function createUserAccount(user: INewUser) {
  try {
    // Create a new account using the Appwrite `account.create` method
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    );

    // Throw an error if the account creation fails
    if (!newAccount) throw new Error("Account creation failed");

    // Generate an avatar URL using the Appwrite `avatars.getInitials` method
    const avatarUrl = avatars.getInitials(user.name);

    // Save the user details to the Appwrite database
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * Saves user details to the Appwrite database using the `databases.createDocument` method.
 *
 * @async
 * @function
 * @param {Object} user - The user details to be saved to the database.
 * @returns {Object | undefined} - Returns the newly created user object or undefined on failure.
 */
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    // Save the user details to the Appwrite database
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user,
    );

    return newUser;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Signs in a user by creating an email session using the Appwrite `account.createEmailSession` method.
 *
 * @async
 * @function
 * @param {Object} user - The user's email and password for authentication.
 * @returns {Object | undefined} - Returns the session object on success or undefined on failure.
 */
export async function signInAccount(user: { email: string; password: string }) {
  try {
    // Create an email session using the Appwrite `account.createEmailSession` method
    const session = await account.createEmailSession(
      user.email,
      user.password,
    );

    return session;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Retrieves the current user's details using the Appwrite `account.get` method
 * and fetches additional user information from the Appwrite database.
 *
 * @async
 * @function
 * @returns {Object | null} - Returns the current user object or null on failure.
 */
export async function getCurrentUser() {
  try {
    // Get the current account details using the Appwrite `account.get` method
    const currentAccount = await account.get();

    // Throw an error if the account retrieval fails
    if (!currentAccount) throw new Error("Unable to retrieve current account");

    // Retrieve additional user information from the Appwrite database
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    // Throw an error if the user information retrieval fails
    if (!currentUser) throw new Error("Unable to retrieve current user");

    // Return the first document (user) from the result
    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}
