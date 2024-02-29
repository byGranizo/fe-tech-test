import { useBlogStore } from '@/store/blogStore'

export const useBlog = () => {
  const posts = useBlogStore((state) => state.posts)
  const loading = useBlogStore((state) => state.loading)
  const fetchPosts = useBlogStore((state) => state.fetchPosts)
  const addPost = useBlogStore((state) => state.addPost)
  const deletePost = useBlogStore((state) => state.deletePost)
  const getPostById = useBlogStore((state) => state.getPostById)

  return {
    posts,
    loading,
    fetchPosts,
    addPost,
    deletePost,
    getPostById,
  }
}
