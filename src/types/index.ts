/**
 * Represents a navigation link with an image URL, route, and label.
 */
export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

/**
 * Represents an update to user information, including userId, name, bio, imageId, imageUrl, and file.
 */
export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

/**
 * Represents a new post, including userId, caption, file, location, and tags.
 */
export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

/**
 * Represents an update to a post, including postId, caption, imageId, imageUrl, file, location, and tags.
 */
export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

/**
 * Represents user information, including id, name, username, email, imageUrl, and bio.
 */
export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

/**
 * Represents a new user, including name, email, username, and password.
 */
export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};
