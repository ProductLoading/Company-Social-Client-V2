// 🪝 useCreatePost: create mutation'u kolay kullanmak için
import { useCreatePostMutation } from '../api/postApi';
import { CreatePostDto } from '../types/post.types';

export const useCreatePost = () => {
    const [createPostFn, { data, isLoading, error }] = useCreatePostMutation();

    const createPost = async (input: CreatePostDto) => {
        await createPostFn(input);
    };

    return {
        createPost,
        createdPost: data,
        isLoading,
        error,
    };
};
