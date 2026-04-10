import { create } from 'zustand';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
  address: {
    city: string;
  };
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const baseUrl = import.meta.env.VITE_JSON_PLACEHOLDER_URL;

export const useStore = create((set: any) => ({
  users: [] as User[],
  posts: [] as Post[],
  apiIsLoading: false,
  error: null as string | null,

  async fetchUsers() {
    set({ apiIsLoading: true, error: null });
    try {
      const res = await axios.get(`${baseUrl}/users`);
      set({ users: res.data });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch users' });
    } finally {
      set({ apiIsLoading: false });
    }
  },

  async fetchUserWithPosts(userId: string) {
    set({ apiIsLoading: true, error: null, posts: [] });
    try {
      const [userRes, postsRes] = await Promise.all([
        axios.get(`${baseUrl}/users/${userId}`),
        axios.get(`${baseUrl}/posts?userId=${userId}`)
      ]);

      const apiPosts = postsRes.data;
      const savedPostsJson = localStorage.getItem('custom_posts');
      const savedPosts = savedPostsJson ? JSON.parse(savedPostsJson) : [];
      const userSavedPosts = savedPosts.filter((p: any) => p.userId === Number(userId));

      set({ posts: [...userSavedPosts, ...apiPosts] });
      return userRes.data as User;
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch data' });
    } finally {
      set({ apiIsLoading: false });
    }
  },

  addPost(newPost: Post) {
    set((state: any) => ({ posts: [newPost, ...state.posts] }));

    const savedPostsJson = localStorage.getItem('custom_posts');
    const savedPosts = savedPostsJson ? JSON.parse(savedPostsJson) : [];
    localStorage.setItem('custom_posts', JSON.stringify([newPost, ...savedPosts]));
  }
}));
