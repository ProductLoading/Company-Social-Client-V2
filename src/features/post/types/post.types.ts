// 🧩 Post entity tipi, enumlar ve input DTO'lar
export enum PostVisibilityScope {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
    CUSTOM = 'CUSTOM',
  }
  
  export interface CreatePostDto {
    title: string;
    content: string;
    postType: string;
    visibilityScope: PostVisibilityScope;
    files?: File[];
    officeIds?: string[];
    departmentIds?: string[];
    teamIds?: string[];
  }
  
  export interface PostEntity {
    postId: string;
    title: string;
    content: string;
    postType: string;
    visibilityScope: PostVisibilityScope;
    user?: {
      userId: string;
      fullName?: string;
    };
    files?: {
      fileId: string;
      filename: string;
      url: string;
    }[];
    createdAt: string;
    updatedAt: string;
  }
  