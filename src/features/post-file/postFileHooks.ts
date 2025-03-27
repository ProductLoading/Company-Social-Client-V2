// src/features/post-file/postFileHooks.ts
import { useMutation, useQuery } from '@apollo/client';
import { UPLOAD_FILE_TO_POST } from './postFileMutations';
import { GET_FILES_BY_POST } from './postFileQueries';
import type { PostFile } from './types';

export function usePostFile(postId?: string) {
  // 1) Dosyaları sorgulamak istersen
  const { data, loading, error, refetch } = useQuery<{ filesByPost: PostFile[] }>(
    GET_FILES_BY_POST,
    {
      variables: { postId },
      skip: !postId, // postId yoksa sorgu atlama
    }
  );

  // 2) Dosya yüklemek için mutation
  const [uploadFileMutation] = useMutation(UPLOAD_FILE_TO_POST);

  // Tek dosya yükleme fonksiyonu
  async function uploadFileToPost(selectedPostId: string, file: File) {
    const response = await uploadFileMutation({
      variables: {
        postId: selectedPostId,
        file, // JS File nesnesi
      },
    });
    // Yükledikten sonra listeyi güncel veriyle refetch et
    if (postId) await refetch();
    return response.data?.uploadPostFile;
  }

  return {
    files: data?.filesByPost || [],
    loading,
    error: error?.message || null,
    uploadFileToPost,
    refetchFiles: refetch,
  };
}
