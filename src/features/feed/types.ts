
// export interface PostFile {
//     fileId: string;
//     filename: string;
//     mimetype: string;
//     url: string;
//   }

//   export interface Post {
//     postId: string;
//     title: string;
//     content: string;
//     postType: string;
//     visibilityScope: string;
//     createdAt?: string;
//     updatedAt?: string;
//     user?: {
//       userId: string;
//       firstName: string;
//       lastName: string;
//     };
//     files?: PostFile[];
//   }

//   export interface CreatePostInput {
//     title: string;
//     content: string;
//     postType: string;
//     visibilityScope: string;
//     fileIds?: string[];
//     departmentIds?: string[];
//     teamIds?: string[];
//     officeIds?: string[];
//   }
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

  // Yeni eklenen sahte/dummy alanlar:
  images?: { url: string }[]; // örnek resim array
  audioUrl?: string; // ses dosyası varsa
  commentCount?: number;
  likeCount?: number;
  shareCount?: number;

  user?: {
    userId: string;
    firstName: string;
    lastName: string;
    username?: string;
    avatar?: string; // opsiyonel avatar url
  };
  files?: PostFile[];
}
