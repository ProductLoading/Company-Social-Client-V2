// 📁 src/features/feed/hooks.ts
import { useQuery, useMutation } from '@apollo/client';
import { GET_FEED } from './feedQueries';
import { CREATE_POST, UPLOAD_FILE_TO_POST } from './feedMutations';
import { Post, CreatePostInput } from './types';

export function useFeed() {
  const {
    data,
    loading,
    error,
    refetch: refetchFeed,
  } = useQuery<{ feed: Post[] }>(GET_FEED);

  const [createPostMutation] = useMutation(CREATE_POST);
  const [uploadFileMutation] = useMutation(UPLOAD_FILE_TO_POST);

  async function addPost(input: CreatePostInput) {
    const response = await createPostMutation({
      variables: { input },
    });
    await refetchFeed();
    return response.data?.createPost;
  }

  async function addFileToPost(postId: string, file: File) {
    const response = await uploadFileMutation({
      variables: {
        postId,
        file,
      },
    });
    await refetchFeed();
    return response.data?.uploadPostFile;
  }

  return {
    posts: data?.feed ?? [],
    loading,
    error: error?.message || null,
    refetchFeed,
    addPost,
    addFileToPost,
  };
}
