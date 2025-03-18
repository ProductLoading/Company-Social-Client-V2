// src/features/post/hooks.ts
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  fetchPosts,
  fetchPostById,
  createPost,
  updatePost,
  deletePost,
} from './postSlice';
import type { RootState } from '@/app/store';
import type { CreatePostDto, UpdatePostDto } from './types';

export const usePosts = () => {
  const dispatch = useAppDispatch();

  // Redux store'da post slice'a erişiyoruz
  const { posts, selectedPost, loading, error } = useAppSelector(
    (state: RootState) => state.post
  );

  // Postları yüklemek
  const loadPosts = () => dispatch(fetchPosts());

  // Tek post detayını yüklemek
  const loadPostById = (postId: string) => dispatch(fetchPostById(postId));

  // Yeni post eklemek
  const addPost = (dto: CreatePostDto) => dispatch(createPost(dto));

  // Post güncellemek
  const modifyPost = (dto: UpdatePostDto) => dispatch(updatePost(dto));

  // Post silmek
  const removePost = (postId: string) => dispatch(deletePost(postId));

  return {
    posts,
    selectedPost,
    loading,
    error,
    loadPosts,
    loadPostById,
    addPost,
    modifyPost,
    removePost,
  };
};
