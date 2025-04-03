
export interface PostFile {
  fileId: string;
  filename: string;
  mimetype: string;
  url: string;
}
export interface CommentFile {
  _id: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
}

export interface Comment {
  _id: string;
  content: string;
  createdAt?: string;
  files?: CommentFile[];
  user?: {
    userId: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

export interface Post {
  postId: string;
  title: string;
  content: string;
  postType: string;
  visibilityScope: string;
  createdAt?: string;
  updatedAt?: string;
  images?: { url: string }[];
  audioUrl?: string;
  commentCount?: number;
  likeCount?: number;
  shareCount?: number;
  user?: {
    userId: string;
    firstName: string;
    lastName: string;
    username?: string;
    avatar?: string;
  };
  files?: PostFile[];
  comments?: Comment[]; // ← Bunu eklemeyi unutma
}
