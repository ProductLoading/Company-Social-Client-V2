// src/features/comment/comment.types.ts

/** Backend'den gelen veya gidecek yorum verisi */
export interface IComment {
    id: string;              // id
    postId: string;          
    userId: string;
    content: string;
    createdAt?: string;
    files?: ICommentFile[];
  }
  
  /** Yorum dosyası */
  export interface ICommentFile {
    id: string;
    fileUrl: string;
    fileName?: string;
    fileType?: string;
  }
  
  /** Yorum ekleme Input */
  export interface CreateCommentDto {
    userId: string;
    postId: string;
    content: string;
    files?: File[];
    parentCommentId?: string;
  }
  
  /** Yorum silme Input (örnek) */
  export interface DeleteCommentDto {
    commentId: string;
    userId: string; // kim siliyor?
  }
  