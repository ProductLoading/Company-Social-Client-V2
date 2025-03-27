
export interface PostFile {
    fileId: string;
    filename: string;
    mimetype: string;
    url: string;
  }
  
  export interface Post {
    postId: string;
    title: string;
    content: string;
    postType: string;
    visibilityScope: string;
    createdAt?: string;
    updatedAt?: string;
    user?: {
      userId: string;
      firstName: string;
      lastName: string;
    };
    files?: PostFile[];
  }
  
  export interface CreatePostInput {
    title: string;
    content: string;
    postType: string;
    visibilityScope: string;
    fileIds?: string[];
    departmentIds?: string[];
    teamIds?: string[];
    officeIds?: string[];
  }
  