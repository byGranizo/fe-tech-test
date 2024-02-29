import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { fetchAPIPosts, createPost, deletePost } from '@/services/blog'

const initialData: { posts: Post[]; loading: boolean } = {
  posts: [],
  loading: false,
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      posts: initialData.posts,
      loading: initialData.loading,

      fetchPosts: async () => {
        set({ loading: true })

        const postResponse = await fetchAPIPosts()
        set({ posts: postResponse })

        set({ loading: false })
      },

      addPost: async (postData) => {
        const newPost = await createPost(postData)

        set((state) => ({ posts: [...state.posts, newPost] }))
      },

      deletePost: async (id: number) => {
        await deletePost(id)

        set((state) => ({ posts: state.posts.filter((post) => post.id !== id) }))
      },

      getPostById: (id: number) => {
        const post = get().posts.find((post) => post.id === id)
        return post
      },

      reset: () => set({ ...initialData }),
    }),
    {
      name: 'blog-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
