// src/features/post-file/types.ts

// Backend'deki PostFile entity'sine paralel tip
export interface PostFile {
    fileId: string;
    filename: string;
    mimetype: string;
    url: string;
    // post?: { ... } // Gerekirse post ilişkisini de ekleyebilirsin
}

// Backend'deki input'a paralel
export interface CreatePostFileDto {
    filename: string;
    mimetype: string;
    url: string;
    postId: string;
}
