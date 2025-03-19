// src/features/post/types.ts

export interface PostFile {
  fileId: string;
  filename: string;
  mimetype: string;
  url: string;
}

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
}

export interface Post {
  postId: string;
  title: string;
  content: string;
  postType: string;
  visibilityScope: string;
  createdAt: string;
  updatedAt: string;
  // user: User;
  files?: PostFile[];
}

// Create & Update Input (Front-end usage)
export interface CreatePostInput {
  title: string;
  content: string;
  postType: string;
  visibilityScope: string;
  userId: string;
  files?: File[];  // opsiyonel dosyalar
}

export interface UpdatePostInput {
  postId: string;
  title?: string;
  content?: string;
  postType?: string;
  visibilityScope?: string;
}
