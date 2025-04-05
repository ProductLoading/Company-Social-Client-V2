// src/features/comment/comment.hooks.ts
import {
    useGetCommentsByPostQuery,
    useCreateCommentMutation,
} from './comment.api';

export function useComments(postId: string) {
    // Post'a göre yorumları çek
    const { data, isLoading, isError, refetch } = useGetCommentsByPostQuery({ postId, limit: 5 });
    return {
        comments: data ?? [],
        isLoading,
        isError,
        refetch,
    };
}

export function useAddComment() {
    const [createComment, { isLoading, isError }] = useCreateCommentMutation();

    const addComment = async (dto: any) => {
        await createComment(dto);
        // ek mantık: alert, analytics, vs...
    };

    return { addComment, isLoading, isError };
}
