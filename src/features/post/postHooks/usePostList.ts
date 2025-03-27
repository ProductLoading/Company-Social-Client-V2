// 🪝 usePostList: feed sorgusunu saran custom hook
import { useGetPostsQuery } from '../api/postApi';

export const usePostList = () => {
    const { data, isLoading, error, refetch } = useGetPostsQuery();
    1
    return {
        posts: data ?? [],
        isLoading,
        error,
        refetch,
    };
};
