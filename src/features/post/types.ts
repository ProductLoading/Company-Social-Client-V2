// src/features/post/types.ts

export interface PostFile {
    id: string;
    url: string;
    fileType: string;
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
    updatedAt?: string;
    files?: PostFile[];
    user: User;
  }
  
  // createPostDto, updatePostDto
  export interface CreatePostDto {
    userId: string;
    title: string;
    content: string;
    postType: string;
    visibilityScope: string;
  }
  
  export interface UpdatePostDto {
    postId: string;
    title: string;
    content: string;
    postType: string;
    visibilityScope: string;
  }
  