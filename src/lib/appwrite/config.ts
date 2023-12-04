// Imports
import { Client, Account, Databases, Storage, Avatars } from "appwrite";

/**
 * The `appwriteConfig` object contains configuration details for the Appwrite backend service.
 * It includes project, database, storage, and collection IDs obtained from environment variables.
 *
 * @constant
 * @type {Object}
 */
export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
  };
  
  /**
   * The `client` object represents the Appwrite client used for communication with the Appwrite API.
   *
   * @constant
   * @type {Client}
   */
  export const client = new Client();
  
  // Set the project ID and endpoint for the Appwrite client
  client.setProject(appwriteConfig.projectId);
  client.setEndpoint(appwriteConfig.url);
  
  /**
   * The `account` object provides functionality related to the Appwrite account management.
   *
   * @constant
   * @type {Account}
   */
  export const account = new Account(client);
  
  /**
   * The `databases` object provides functionality related to Appwrite database operations.
   *
   * @constant
   * @type {Databases}
   */
  export const databases = new Databases(client);
  
  /**
   * The `storage` object provides functionality related to Appwrite storage operations.
   *
   * @constant
   * @type {Storage}
   */
  export const storage = new Storage(client);
  
  /**
   * The `avatars` object provides functionality related to Appwrite avatars.
   *
   * @constant
   * @type {Avatars}
   */
  export const avatars = new Avatars(client);
  